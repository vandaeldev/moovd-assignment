import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs';
import { API_URL } from '@core/constants';
import type { ILoginFormValue, ISignupFormValue } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = computed(() => this._isLoggedIn() || window.sessionStorage.getItem('isLoggedIn') === 'true');
  public token = computed(() => this._token() || window.sessionStorage.getItem('token'));

  private _isLoggedIn = signal(false);
  private _token = signal<string | null>(null);

  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  public login(creds: ILoginFormValue) {
    return this.httpClient.post<{token: string}>(`${API_URL}/login`, creds).pipe(
      map(({ token }) => {
        this._token.set(token);
        this._isLoggedIn.set(true);
        window.sessionStorage.setItem('isLoggedIn', 'true');
        window.sessionStorage.setItem('token', token);
      })
    );
  }

  public signup(creds: ISignupFormValue) {
    return this.httpClient.post(`${API_URL}/signup`, creds).pipe(
      concatMap(() => this.login(creds))
    );
  }

  public logout() {
    this.httpClient.get(`${API_URL}/logout`).subscribe(() => {
      this._token.set(null);
      this._isLoggedIn.set(false);
      window.sessionStorage.removeItem('isLoggedIn');
      window.sessionStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
