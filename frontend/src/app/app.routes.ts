import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/Auth.guard';
import { AppComponent } from './app.component';
import MainLayoutComponent from '../layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./../pages/home/home.component'),
        canActivate: [AuthGuard],
      },
    ]
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./../pages/dashboard/dashboard.component'),
        canActivate: [AuthGuard],
      },

      {
        path: 'clientlist',
        loadComponent: () => import('./../pages/dashboard/dashboard.component'),
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
