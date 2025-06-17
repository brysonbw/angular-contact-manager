import { Component, inject } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import {
  faBuilding,
  faEdit,
  faEllipsis,
  faEnvelope,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  imports: [FontAwesomeModule, UpperCasePipe],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList {
  // Variables
  faEdit = faEdit;
  faDelete = faTrash;
  faUser = faUser;
  faEllipsis = faEllipsis;
  faCompany = faBuilding;
  faEmail = faEnvelope;
  faPhone = faPhone;

  // Services
  private contactService = inject(ContactService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  // Signals
  contactList = this.contactService.contacts;

  public onEdit(id: string): void {
    this.router.navigate(['contacts/view', id]);
  }

  public onDelete(contact: { firstName: string; id: string }): void {
    if (
      confirm(`Are you sure you want to delete contact [${contact.firstName}]?`)
    ) {
      this.contactService.deleteContact(contact.id);
      this.toastService.add(`Contact deleted successfully!`);
    } else {
      this.toastService.add(`Unable to delete contact. Please try again.`);
    }
  }

  public viewContactDetail(id: string): void {
    this.router.navigate(['contacts/view', id]);
  }
}
