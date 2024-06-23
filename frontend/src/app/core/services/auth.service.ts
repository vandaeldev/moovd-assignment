import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs';
import { SurrealService } from 'ngx-surreal';
import { SURREAL_SCOPE } from '@core/constants';
import type { ILoginFormValue, ISignupFormValue } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = computed(() => this._isLoggedIn() || window.sessionStorage.getItem('isLoggedIn') === 'true');
  public requestedURL = signal<string | null>(null);

  private _isLoggedIn = signal(false);

  private readonly router = inject(Router);
  private readonly surrealService = inject(SurrealService);

  public login(creds: ILoginFormValue) {
    return this.surrealService
      .signin({ ...creds, email: creds.username, scope: SURREAL_SCOPE })
      .pipe(map(() => {
        this._isLoggedIn.set(true);
        window.sessionStorage.setItem('isLoggedIn', 'true');
      }));
  }

  public signup(creds: ISignupFormValue) {
    return this.surrealService
      .signup({ ...creds, scope: SURREAL_SCOPE })
      .pipe(concatMap(() => this.login(creds)));
  }

  public logout() {
    this.surrealService.invalidate().subscribe(() => {
      window.sessionStorage.removeItem('isLoggedIn');
      this._isLoggedIn.set(false);
      this.router.navigate(['/login']);
    });
  }
}
