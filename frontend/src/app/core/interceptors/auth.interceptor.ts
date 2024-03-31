import type { HttpInterceptorFn } from '@angular/common/http';
import { WITH_AUTH } from '../constants';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

const authInterceptor: HttpInterceptorFn = (req, next) => {
  const withAuth = req.context.get(WITH_AUTH);
  if (withAuth) {
    const token = inject(AuthService).token();
    req = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }
  return next(req);
};

export default authInterceptor;
