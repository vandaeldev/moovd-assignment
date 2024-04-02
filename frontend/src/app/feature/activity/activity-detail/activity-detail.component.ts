import { ChangeDetectionStrategy, Component, inject, input, signal, type OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ActivityService } from '@core/services';
import type { IActivity } from '@core/models';

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './activity-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityDetailComponent implements OnInit {
  public id = input(0);
  public activity = signal<IActivity>({} as IActivity);

  private readonly activityService = inject(ActivityService);

  public ngOnInit() {
    this.activityService.fetchActivityByID(this.id()).subscribe(this.activity.set);
  }
}
