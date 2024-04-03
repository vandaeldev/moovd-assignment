import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService, SnackbarService } from '@core/services';
import { ESnackbarType } from '../enums';

export const authGuard: CanActivateFn = (_, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const snackbar = inject(SnackbarService);
  if (authService.isLoggedIn()) return true;
  authService.requestedURL.set(state.url);
  snackbar.open(ESnackbarType.Info, 'You need to be logged in to view this page');
  router.navigate(['/login']);
  return false;
};
