import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'vendors',
    loadComponent: () => import('./components/vendors/vendors-page.component').then(m => m.VendorsPageComponent)
  },
  {
    path: 'accounts',
    loadComponent: () => import('./components/accounts/accounts-page.component').then(m => m.AccountsPageComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('./components/categories/categories-page.component').then(m => m.CategoriesPageComponent)
  }
];
