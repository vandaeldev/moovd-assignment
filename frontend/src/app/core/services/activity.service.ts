import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment.development';
import { WITH_AUTH } from '@core/constants';
import type { IActivityDetail, IActivityResponse } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private readonly endpoint = `${environment.apiUrl}/activity`;
  private readonly defHttpOpts = { context: new HttpContext().set(WITH_AUTH, true) };
  private readonly httpClient = inject(HttpClient);

  public fetchActivity() {
    return this.httpClient.get<IActivityResponse>(`${this.endpoint}`, this.defHttpOpts);
  }

  public fetchActivityLatest() {
    return this.httpClient.get<IActivityResponse>(`${this.endpoint}-latest`, this.defHttpOpts);
  }

  public fetchActivityByID(id: string) {
    return this.httpClient.get<IActivityDetail>(`${this.endpoint}/${id}`, this.defHttpOpts);
  }
}
