import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { StatusCodes } from 'http-status-codes';
import { AuthService, SnackbarService } from '@core/services';
import { WITH_AUTH } from '@core/constants';
import { ESnackbarType } from '@core/enums';
import type { HttpInterceptorFn } from '@angular/common/http';

const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackbar = inject(SnackbarService);
  const withAuth = req.context.get(WITH_AUTH);
  if (withAuth) {
    const token = inject(AuthService).token();
    req = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }
  return next(req).pipe(
    tap({
      error: ({ error, message }) => {
        if ([StatusCodes.UNAUTHORIZED, StatusCodes.FORBIDDEN].includes(error.status)) router.navigate(['/login']);
        snackbar.open(ESnackbarType.Error, error?.detail || message, 5000);
      }
    })
  );
};

export default authInterceptor;
