import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';
import { contactRoutes } from './pages/contact/contact.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full',
  },
  {
    path: 'contacts',
    children: contactRoutes,
  },
  // Catch all - 404 not found
  {
    path: '**',
    component: NotFound,
    title: 'Contact Manager | Page Not Found',
  },
];
