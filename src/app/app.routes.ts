import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'vendors',
    loadComponent: () => import('./components/vendors/vendors-page.component').then(m => m.VendorsPageComponent)
  }
];
