import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import type { IAuthFormValue } from '../../core/models/form.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  public authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private readonly authService: AuthService) {}

  public onLogin() {
    const formValue = this.authForm.value as IAuthFormValue;
    this.authService.login(formValue);
  }

  public onSignup() {
    const formValue = this.authForm.value as IAuthFormValue;
    this.authService.signup(formValue);
  }
}
