import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

const localizedRoutes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
];

export const routes: Routes = [
  // Backward compatibility for non-localized URLs.
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },

  // SEO-friendly language URLs.
  { path: 'nl', children: localizedRoutes },
  { path: 'fr', children: localizedRoutes },
  { path: 'en', children: localizedRoutes },

  { path: '**', redirectTo: '' },
];
