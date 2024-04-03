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

export interface IActivityDetail {
  deviceID: string;
  deviceType: string;
  timeAt: Record<string, number>;
  totalTime: number;
}
