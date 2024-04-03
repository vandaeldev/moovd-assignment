export interface IActivity {
  id: number;
  deviceID: string;
  deviceType: string;
  timestamp: Date;
  location: string;
}

export interface IActivityResponse {
  columns: (keyof IActivity)[];
  data: IActivity[];
}
