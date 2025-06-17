import { Routes } from '@angular/router';
import { ContactList } from './contact-list/contact-list';
import { ContactDetail } from './contact-detail/contact-detail';
import { ContactCreate } from './contact-create/contact-create';

export const contactRoutes: Routes = [
  {
    path: '',
    component: ContactList,
    title: 'Contact Manager | Contacts',
  },
  {
    path: 'create',
    component: ContactCreate,
    title: 'Contact Manager | Add Contact',
  },
  {
    path: 'view/:id',
    component: ContactDetail,
    title: 'Contact Manager | View/Edit Contact',
  },
];
