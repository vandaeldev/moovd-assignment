import { ChangeDetectionStrategy, Component, inject, input, signal, type OnInit } from '@angular/core';
import { KeyValuePipe, TitleCasePipe, formatPercent } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { AgChartsAngular } from 'ag-charts-angular';
import { ActivityService } from '@core/services';
import type { IActivityDetail } from '@core/models';

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [AgChartsAngular, MatListModule, KeyValuePipe, TitleCasePipe],
  templateUrl: './activity-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityDetailComponent implements OnInit {
  public id = input('');
  public activity = signal<IActivityDetail>({} as IActivityDetail);
  public options: Record<string, unknown>;

  private readonly activityService = inject(ActivityService);

  public ngOnInit() {
    this.activityService.fetchActivityByID(this.id()).subscribe(data => {
      this.activity.set(data);
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
