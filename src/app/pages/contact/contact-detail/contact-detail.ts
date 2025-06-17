import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../../models/contact';
import { ContactService } from '../../../services/contact.service';
import { ContactForm } from '../../../components/contact-form/contact-form';

@Component({
  selector: 'app-contact-detail',
  imports: [ContactForm],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css',
})
export class ContactDetail implements OnInit {
  // Signals
  contactItem = signal<Contact | null>(null);

  // Services
  private activatedRoute = inject(ActivatedRoute);
  private contactService = inject(ContactService);

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.contactItem.set(this.contactService.getContactById(params['id']));
    });
  }
}
