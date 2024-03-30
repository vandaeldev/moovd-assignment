import type { Prisma } from '@prisma/client';

export interface IActivity {
  deviceId: string;
  deviceType: string;
  timestamp: string;
  location: string;
}

export type TDelegate = Prisma.DeviceDelegate & Prisma.DeviceTypeDelegate & Prisma.LocationDelegate;