import { ChangeDetectionStrategy, Component, type OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '@core/services';
import type { ILoginFormValue, ISignupFormValue } from '@core/models';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  public signup = signal(false);
  public visible = signal(false);
  public loading = signal(false);
  public loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  public signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  public ngOnInit() {
    if (this.authService.isLoggedIn()) this.authService.logout();
  }

  public onLogin() {
    if (this.loading()) return;
    this.loading.set(true);
    const formValue = this.loginForm.value as ILoginFormValue;
    this.authService.login(formValue)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(() => {
        const url = this.authService.requestedURL() || '/activity';
        this.router.navigate([url]);
        this.authService.requestedURL.set(null);
      });
  }

  public onSignup() {
    if (this.loading()) return;
    this.loading.set(true);
    const formValue = this.signupForm.value as ISignupFormValue;
    this.authService.signup(formValue)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(() => void this.router.navigate(['/activity']));
  }

  public toggleSignup() {
    this.signup.update(v => !v);
  }

  public toggleVisibility() {
    this.visible.update(v => !v);
  }
}
