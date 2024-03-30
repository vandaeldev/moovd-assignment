import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {path: 'auth', loadComponent: () => import('./feature/auth/auth.component').then(m => m.AuthComponent)},
  {path: 'activity', canActivate: [authGuard], children: [
    {path: '', pathMatch: 'full', loadComponent: () => import('./feature/activity/activity-overview/activity-overview.component').then(m => m.ActivityOverviewComponent)},
    {path: ':id', loadComponent: () => import('./feature/activity/activity-detail/activity-detail.component').then(m => m.ActivityDetailComponent)}
  ]},
  {path: '**', redirectTo: '/auth'}
];
