import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL, WITH_AUTH } from '@core/constants';
import type { IActivityDetail, IActivityResponse } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private readonly endpoint = 'activity';
  private readonly defHttpOpts = { context: new HttpContext().set(WITH_AUTH, true) };
  private readonly httpClient = inject(HttpClient);

  public fetchActivity() {
    return this.httpClient.get<IActivityResponse>(`${API_URL}/${this.endpoint}`, this.defHttpOpts);
  }

  public fetchActivityLatest() {
    return this.httpClient.get<IActivityResponse>(`${API_URL}/${this.endpoint}-latest`, this.defHttpOpts);
  }

  public fetchActivityByID(id: string) {
    return this.httpClient.get<IActivityDetail>(`${API_URL}/${this.endpoint}/${id}`, this.defHttpOpts);
  }
}
