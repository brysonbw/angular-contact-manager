import { Component } from '@angular/core';
import { ContactForm } from '../../../components/contact-form/contact-form';

@Component({
  selector: 'app-contact-create',
  imports: [ContactForm],
  templateUrl: './contact-create.html',
  styleUrl: './contact-create.css',
})
export class ContactCreate {}
