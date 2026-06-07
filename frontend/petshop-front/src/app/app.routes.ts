import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing';
import { CarritoComponent } from './components/carrito/carrito'; 

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: '**', redirectTo: '' }
];