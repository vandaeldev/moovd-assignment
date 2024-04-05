import { Injectable, PLATFORM_ID, afterRender, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs';
import { environment } from '@environments/environment.development';
import type { ILoginFormValue, ISignupFormValue } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = computed(() => this._isLoggedIn() || this.isBrowser && window.sessionStorage.getItem('isLoggedIn') === 'true');
  public token = computed(() => this._token() || this.isBrowser && window.sessionStorage.getItem('token'));
  public requestedURL = signal<string | null>(null);

  private isBrowser: boolean;
  private _isLoggedIn = signal(false);
  private _token = signal<string | null>(null);

  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public login(creds: ILoginFormValue) {
    return this.httpClient.post<{token: string}>(`${environment.apiUrl}/login`, creds).pipe(
      map(({ token }) => {
        this._token.set(token);
        this._isLoggedIn.set(true);
        if (!this.isBrowser) return;
        window.sessionStorage.setItem('isLoggedIn', 'true');
        window.sessionStorage.setItem('token', token);
      })
    );
  }

  public signup(creds: ISignupFormValue) {
    return this.httpClient.post(`${environment.apiUrl}/signup`, creds).pipe(
      concatMap(() => this.login(creds))
    );
  }

  public logout() {
    this.httpClient.get(`${environment.apiUrl}/logout`).subscribe(() => {
      if (this.isBrowser) {
        window.sessionStorage.removeItem('isLoggedIn');
        window.sessionStorage.removeItem('token');
      }
      this._token.set(null);
      this._isLoggedIn.set(false);
      this.router.navigate(['/login']);
    });
  }
}
