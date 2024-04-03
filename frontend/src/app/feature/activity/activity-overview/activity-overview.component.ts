import { type AfterViewInit, ChangeDetectionStrategy, Component, signal, type OnInit, viewChild, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { ActivityService } from '@core/services';
import { DecamelizePipe } from '@shared/pipes';
import type { IActivity } from '@core/models';

@Component({
  selector: 'app-activity-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatRippleModule,
    TitleCasePipe,
    MatProgressSpinnerModule,
    DecamelizePipe
  ],
  templateUrl: './activity-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityOverviewComponent implements OnInit, AfterViewInit {
  public displayedColumns = signal([] as (keyof IActivity)[]);
  public dataSource = new MatTableDataSource([] as IActivity[]);
  public loading = signal(true);

  private readonly router = inject(Router);
  private readonly activityService = inject(ActivityService);
  private readonly paginator = viewChild.required(MatPaginator);
  private readonly sort = viewChild.required(MatSort);

  public ngOnInit() {
    this.activityService.fetchActivityLatest().pipe(
      finalize(() => this.loading.set(false))
    ).subscribe(({ columns, data }) => {
      this.displayedColumns.set(columns.filter(c => c !== 'id'));
      this.dataSource.data = data;
    });
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
    this.dataSource.sort = this.sort();
  }

  public applyFilter(evt: Event) {
    const { value } = evt.target as HTMLInputElement;
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  public onClickRow(id: string) {
    this.router.navigate(['/activity', id]);
  }
}
