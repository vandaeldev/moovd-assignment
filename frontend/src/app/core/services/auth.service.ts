import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import type { IAuthFormValue } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = computed(() => this._isLoggedIn() || window.sessionStorage.getItem('isLoggedIn') === 'true');
  private _isLoggedIn = signal(false);
  private users = computed<IAuthFormValue[]>(() => {
    const storageUsers = JSON.parse(window.sessionStorage.getItem('users') || 'null');
    return !!storageUsers ? storageUsers : this._users();
  });
  private _users = signal<IAuthFormValue[]>([]);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  public login({ email, password }: IAuthFormValue) {
    if (!this.users().find(user => user.email === email && user.password === password)) return alert('Wrong credentials');
    this._isLoggedIn.set(true);
    window.sessionStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/activity']);
  }

  public signup({ email, password }: IAuthFormValue) {
    if (this.users().find(user => user.email === email)) return alert('User already exists');
    this._users.update(users => [...users, {email, password}]);
    window.sessionStorage.setItem('users', JSON.stringify(this._users()));
    this._isLoggedIn.set(true);
    window.sessionStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/activity']);
  }
}
