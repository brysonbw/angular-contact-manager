import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormControl,
  FormArray,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  faUser,
  faPlusCircle,
  faCircleMinus,
} from '@fortawesome/free-solid-svg-icons';
import { randomUUID } from '../../../utils/generateUUID';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Types
type ContactFormGroup = {
  id: FormControl<string | null>;
  firstName: FormControl<string>;
  lastName: FormControl<string | null>;
  company: FormControl<string | null>;
  phoneNumbers: FormArray<FormControl<string>>;
  emails: FormArray<FormControl<string>>;
};

type FieldError = boolean | string;

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm implements OnInit {
  // Props
  isEditing = input<boolean>(false);
  formData = input<Contact | null>(null);

  // Variables
  formSubmitted = false;
  faUser = faUser;
  faAdd = faPlusCircle;
  faRemove = faCircleMinus;
  form!: FormGroup<ContactFormGroup>;
  private readonly phoneNumberRegex: RegExp = /^[0-9]{7,15}$/;

  // Services
  private contactService = inject(ContactService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  public ngOnInit(): void {
    this.createForm();

    if (this.isEditing()) {
      this.setFormData(this.formData()!);
    }
  }

  public get formTitle(): string {
    return this.isEditing() ? 'Edit Contact' : 'Add Contact';
  }

  public get formSubmitButtonText(): string {
    return this.isEditing() ? 'Edit' : 'Submit';
  }

  public get firstNameIsInvalid(): FieldError {
    if (this.formSubmitted && this.form.controls.firstName.invalid) {
      if (this.form.controls.firstName.hasError('maxlength')) {
        return 'Invalid - too long';
      } else if (!this.form.value.firstName?.length) {
        return 'Required';
      }
    }
    return false;
  }

  public get lastNameIsInvalid(): FieldError {
    if (this.formSubmitted && this.form.controls.lastName.invalid) {
      if (this.form.controls.lastName.hasError('maxlength')) {
        return 'Invalid - too long';
      }
    }
    return false;
  }

  public get companyIsInvalid(): FieldError {
    if (this.formSubmitted && this.form.controls.company.invalid) {
      if (this.form.controls.company.hasError('maxlength')) {
        return 'Invalid - too long';
      }
    }
    return false;
  }

  public get phoneNumbers(): FormArray {
    return this.form.get('phoneNumbers') as FormArray;
  }

  public get emails(): FormArray {
    return this.form.get('emails') as FormArray;
  }

  public addPhoneNumber(): void {
    if (this.phoneNumbers.controls.length < 5) {
      this.phoneNumbers.push(
        new FormControl('', Validators.pattern(this.phoneNumberRegex))
      );
    }
  }

  public removePhoneNumber(index: number): void {
    this.phoneNumbers.removeAt(index);
  }

  public addEmail(): void {
    if (this.emails.controls.length < 5) {
      this.emails.push(new FormControl('', Validators.email));
    }
  }

  public removeEmail(index: number): void {
    this.emails.removeAt(index);
  }

  public onSubmit(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let contact = {
        ...(this.form.getRawValue() as Contact),
      };

      this.trimFormValues(contact);

      if (contact.id && this.isEditing()) {
        this.contactService.updateContact(contact);
      } else {
        contact.id = randomUUID();
        this.contactService.addContact(contact);
      }

      this.onCancel();
      this.toastService.add(
        `Contact ${this.isEditing() ? 'updated' : 'added'} successfully!`
      );
    } else {
      this.toastService.add(
        `Form invalid. Please try again.`,
        undefined,
        'error'
      );
    }
  }

  public onCancel(): void {
    this.form.reset();
    this.router.navigate(['/']);
  }

  public onDelete(id: string): void {
    if (this.isEditing() && id) {
      this.confirmDelete(id);
    } else {
      this.toastService.add(`Unable to delete contact.`);
    }
  }

  private confirmDelete(id: string): void {
    if (confirm(`Are you sure you want to delete contact?`)) {
      this.contactService.deleteContact(id);
      this.toastService.add(`Contact deleted successfully!`);
      this.router.navigate(['/']);
    }
  }

  /**
   * Helper to trim string form values
   * @param formData
   */
  private trimFormValues(
    formData: Contact
  ): Record<string, string | string[] | null> {
    const trimmed: Contact | Record<string, string | null | string[]> = {};

    for (const key in formData) {
      const value = formData[key as keyof Contact];
      if (!value) {
        continue;
      }

      if (Array.isArray(value)) {
        trimmed[key] = value.map((v) => (typeof v === 'string' ? v.trim() : v));
      } else if (typeof value === 'string') {
        trimmed[key] = value.trim();
      } else {
        trimmed[key] = value;
      }
    }

    return trimmed;
  }

  private createForm(): void {
    this.form = new FormGroup<ContactFormGroup>({
      id: new FormControl(null),
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(155)],
        nonNullable: true,
      }),
      lastName: new FormControl(null, {
        validators: [Validators.maxLength(155)],
      }),
      company: new FormControl(null, {
        validators: [Validators.maxLength(155)],
      }),
      phoneNumbers: new FormArray<FormControl<string>>([]),
      emails: new FormArray<FormControl<string>>([]),
    });
  }

  private setFormData(formData: Contact): void {
    this.form.patchValue({
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
    });

    // Clear and set phoneNumber(s)
    this.phoneNumbers.clear();
    formData.phoneNumbers.forEach((phone) =>
      this.phoneNumbers.push(
        new FormControl(phone, Validators.pattern(this.phoneNumberRegex))
      )
    );

    // Clear and set email(s)
    this.emails.clear();
    formData.emails.forEach((email) =>
      this.emails.push(new FormControl(email, Validators.email))
    );
  }
}
