import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/Auth.guard';

export const routes: Routes = [
  {
    path: 'home', loadComponent: () => import('./../pages/home/home.component'), canActivate: [AuthGuard],
  },
  {
    path: 'dashboard', loadComponent: () => import('./../pages/dashboard/dashboard.component'), canActivate: [AuthGuard],
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  }
];
