import { ChangeDetectionStrategy, Component, inject, input, signal, type OnInit } from '@angular/core';
import { KeyValuePipe, formatPercent } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AgChartsAngular } from 'ag-charts-angular';
import { ActivityService } from '@core/services';
import { finalize } from 'rxjs';
import { DecamelizePipe } from '@shared/pipes';
import type { TActivityDetailMapped } from '@core/models';

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [AgChartsAngular, MatListModule, MatProgressSpinnerModule, KeyValuePipe, DecamelizePipe],
  templateUrl: './activity-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityDetailComponent implements OnInit {
  public id = input('');
  public activity = signal<TActivityDetailMapped>({} as TActivityDetailMapped);
  public loading = signal(true);
  public options: Record<string, unknown>;

  private readonly activityService = inject(ActivityService);

  public ngOnInit() {
    this.activityService.fetchActivityByID(this.id()).pipe(
      finalize(() => this.loading.set(false))
    ).subscribe(data => {
      const mappedData = { ...data, totalTime: `${data.totalTime} minutes`, timeAt: undefined };
      this.activity.set(mappedData);
      this.options = {
        data: data.timeAt,
        title: { text: 'Time spend at location (%)' },
        series: [{
          type: 'pie',
          angleKey: 'time',
          legendItemKey: 'location',
          angleName: 'time',
          sectorLabelKey: 'time',
          sectorLabel: {
            color: 'white',
            fontWeight: 'bold',
            formatter: ({ value }: Record<string, number>) => `${formatPercent(value / data.totalTime, 'en-US')}`
          }
        }],
      } as const;
    });
  }
}
