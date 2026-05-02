import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Appointment } from './pages/appointment/appointment';
import { Disclaimer } from './pages/disclaimer/disclaimer';
import { Privacy } from './pages/privacy/privacy';
import { PraticalInfo } from './pages/pratical-info/pratical-info';

const localizedRoutes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'appointment', component: Appointment },
  { path: 'disclaimer', component: Disclaimer },
  { path: 'privacy', component: Privacy },
  { path: 'practical-info', component: PraticalInfo },
];

export const routes: Routes = [
  // Backward compatibility for non-localized URLs.
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'appointment', component: Appointment },
  { path: 'disclaimer', component: Disclaimer },
  { path: 'privacy', component: Privacy },
  { path: 'practical-info', component: PraticalInfo },

  // SEO-friendly language URLs.
  { path: 'nl', children: localizedRoutes },
  { path: 'fr', children: localizedRoutes },
  { path: 'en', children: localizedRoutes },

  { path: '**', redirectTo: '' },
];
