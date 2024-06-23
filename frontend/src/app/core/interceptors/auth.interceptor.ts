import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { SnackbarService } from '@core/services';
import { ESnackbarType } from '@core/enums';
import type { HttpInterceptorFn } from '@angular/common/http';

const authInterceptor: HttpInterceptorFn = (req, next) => next(req).pipe(
  tap({
    error: ({ error, message }) => {
      if (!!error.status && error.status >= 400) inject(Router).navigate(['/login']);
      inject(SnackbarService).open(ESnackbarType.Error, error?.detail || message, 5000);
    }
  })
);

export default authInterceptor;
