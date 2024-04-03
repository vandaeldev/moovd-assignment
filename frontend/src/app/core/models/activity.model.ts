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
  device: string;
  deviceType: string;
  timeAt: Record<string, number>;
  totalTime: number;
}

export type TActivityDetailMapped = Pick<IActivityDetail, 'device' | 'deviceType'> & {totalTime: string};
