import { type AfterViewInit, ChangeDetectionStrategy, Component, signal, type OnInit, viewChild } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivityService } from '@core/services';
import type { IActivity } from '@core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-overview',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatSortModule, MatRippleModule, TitleCasePipe],
  templateUrl: './activity-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityOverviewComponent implements OnInit, AfterViewInit {
  public displayedColumns = signal([] as (keyof IActivity)[]);
  public dataSource = new MatTableDataSource([] as IActivity[]);

  private readonly paginator = viewChild.required(MatPaginator);
  private readonly sort = viewChild.required(MatSort);

  constructor(
    private readonly router: Router,
    private readonly activityService: ActivityService
  ) { }

  public ngOnInit() {
    this.activityService.fetchActivity().subscribe(activity => {
      const columns = Object.keys(activity[0]) as (keyof typeof activity[number])[];
      this.displayedColumns.set(columns);
      this.dataSource.data = activity;
    });
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
    this.dataSource.sort = this.sort();
  }

  public applyFilter(evt: Event) {
    const { value } = evt.target as HTMLInputElement;
    console.log(value);
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  public onClickRow(id: number) {
    this.router.navigate(['/activity', id]);
  }
}
