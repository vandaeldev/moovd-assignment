import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import type { ISnackbarData } from '@core/models';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './snackbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackbarComponent {
  public data = inject<ISnackbarData>(MAT_SNACK_BAR_DATA);
  public snackbarRef = inject(MatSnackBarRef);
}
