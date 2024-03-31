import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, WITH_AUTH } from '@core/constants';
import type { IActivity } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private readonly endpoint = 'activity';
  private readonly defHttpOpts = { context: new HttpContext().set(WITH_AUTH, true) };

  constructor(private readonly httpClient: HttpClient) {}

  public fetchActivity() {
    return this.httpClient.get<IActivity[]>(`${API_URL}/${this.endpoint}`, this.defHttpOpts);
  }

  public fetchActivityByID(id: number) {
    return this.httpClient.get<IActivity>(`${API_URL}/${this.endpoint}/${id}`, this.defHttpOpts);
  }
}
