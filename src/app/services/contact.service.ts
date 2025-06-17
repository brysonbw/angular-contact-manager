import { Injectable, signal } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // Variables
  private readonly CONTACTS_STORAGE_KEY = 'contacts';

  // Signals
  private _contacts = signal<Contact[]>([]);
  public readonly contacts = this._contacts.asReadonly();

  constructor() {
    this._contacts.set(
      JSON.parse(localStorage.getItem(this.CONTACTS_STORAGE_KEY) ?? '[]')
    );
  }

  /**
   * Get contact item by id
   * @param id
   */
  public getContactById(id: string): Contact | null {
    return this._contacts().find((item) => item.id === id) ?? null;
  }

  /**
   * Add new contact to contacts
   * @param contact
   */
  public addContact(contact: Contact): void {
    this._contacts.update((contacts: Contact[]) => {
      const updated = [...contacts, contact];
      localStorage.setItem(this.CONTACTS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  /**
   * Update contact within contacts
   * @param updatedContact
   */
  public updateContact(updatedContact: Contact): void {
    this._contacts.update((contacts: Contact[]) => {
      const updated = contacts.map((item) =>
        item.id === updatedContact.id ? updatedContact : item
      );
      localStorage.setItem(this.CONTACTS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  /**
   * Delete contact by id
   * @param id
   */
  public deleteContact(id: string): void {
    this._contacts.update((contacts: Contact[]) => {
      const updated = contacts.filter((item) => item.id !== id);
      localStorage.setItem(this.CONTACTS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }
}
