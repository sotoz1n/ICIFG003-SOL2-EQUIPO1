import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: '**', redirectTo: '' }
];