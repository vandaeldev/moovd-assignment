import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import type { ILoginFormValue, ISignupFormValue } from '@core/models';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  public signup = signal(false);
  public loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  public signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  public onLogin() {
    const formValue = this.loginForm.value as ILoginFormValue;
    this.authService.login(formValue).subscribe(() => void this.router.navigate(['/activity']));
  }

  public onSignup() {
    const formValue = this.signupForm.value as ISignupFormValue;
    this.authService.signup(formValue).subscribe(() => void this.router.navigate(['/activity']));
  }

  public toggleSignup() {
    this.signup.update(v => !v);
  }
}
