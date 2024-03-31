import type { TActivityBody } from '../types.d.ts';

export const constructActivityData = ({ deviceID, deviceType, location, timestamp }: TActivityBody) => ({
  Device: {
    connectOrCreate: {
      create: {
        name: deviceID!,
        DeviceType: {
          connectOrCreate: {
            create: { name: deviceType! },
            where: { name: deviceType! }
          }
        }
      },
      where: { name: deviceID! }
    }
  },
  Location: {
    connectOrCreate: {
      create: { name: location! },
      where: { name: location! }
    }
  },
  timestamp: new Date(timestamp)
});