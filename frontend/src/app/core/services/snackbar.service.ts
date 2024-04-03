import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@shared/components';
import { ESnackbarType } from '@core/enums';
import { SNACKBAR_CLASS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private readonly snackbar = inject(MatSnackBar);

  public open(type: ESnackbarType, message: string, duration = 3000) {
    const bgClass = SNACKBAR_CLASS.get(type) || '';
    return this.snackbar.openFromComponent(SnackbarComponent, {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration,
      panelClass: 'snackbar',
      data: { message, bgClass }
    });
  }
}
