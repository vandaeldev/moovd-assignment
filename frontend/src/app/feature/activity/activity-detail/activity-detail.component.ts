import { ChangeDetectionStrategy, Component, input, signal, type OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { IActivity } from '@core/models';
import { ActivityService } from '@core/services';

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

  constructor(private readonly activityService: ActivityService) {}

  public ngOnInit() {
    this.activityService.fetchActivityByID(this.id()).subscribe(this.activity.set);
  }
}
