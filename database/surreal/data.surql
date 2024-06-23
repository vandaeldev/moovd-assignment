BEGIN TRANSACTION;

-- location
INSERT INTO location [
    {id: location:1, name: 'L1'},
    {id: location:2, name: 'L2'},
    {id: location:3, name: 'L3'},
    {id: location:4, name: 'L4'},
    {id: location:5, name: 'L5'},
    {id: location:6, name: 'L6'}
];

-- device_type
INSERT INTO device_type [
    {id: device_type:aircraft, name: 'Aircraft'},
    {id: device_type:personal, name: 'Personal'},
    {id: device_type:asset, name: 'Asset'}
];

-- device
INSERT INTO device [
    {id: device:1567, name: 'D-1567', type: device_type:aircraft},
    {id: device:1568, name: 'D-1568', type: device_type:personal},
    {id: device:1569, name: 'D-1569', type: device_type:asset},
    {id: device:1570, name: 'D-1570', type: device_type:personal},
    {id: device:1571, name: 'D-1571', type: device_type:asset}
];

-- activity
INSERT INTO activity [
  {
    device: device:1567,
    device_type: device_type:aircraft,
    timestamp: <datetime>"2022-08-31T10:05:00+02:00",
    location: location:1
  },
  {
    device: device:1567,
    device_type: device_type:aircraft,
    timestamp: <datetime>"2022-08-31T10:10:00+02:00",
    location: location:1
  },
  {
    device: device:1567,
    device_type: device_type:aircraft,
    timestamp: <datetime>"2022-08-31T10:15:00+02:00",
    location: location:1
  },
  {
    device: device:1567,
    device_type: device_type:aircraft,
    timestamp: <datetime>"2022-08-31T10:20:00+02:00",
    location: location:1
  },
  {
    device: device:1567,
    device_type: device_type:aircraft,
    timestamp: <datetime>"2022-08-31T10:25:00+02:00",
    location: location:2
  },
  {
    device: device:1568,
    device_type: device_type:personal,
    timestamp: <datetime>"2022-08-31T10:05:00+02:00",
    location: location:3
  },
  {
    device: device:1568,
    device_type: device_type:personal,
    timestamp: <datetime>"2022-08-31T10:10:00+02:00",
    location: location:3
  },
  {
    device: device:1568,
    device_type: device_type:personal,
    timestamp: <datetime>"2022-08-31T10:15:00+02:00",
    location: location:3
  },
  {
    device: device:1568,
    device_type: device_type:personal,
    timestamp: <datetime>"2022-08-31T10:20:00+02:00",
    location: location:3
  },
  {
    device: device:1568,
    device_type: device_type:personal,
    timestamp: <datetime>"2022-08-31T10:25:00+02:00",
    location: location:3
  },
  {
    device: device:1569,
    device_type: device_type:asset,
    timestamp: <datetime>"2022-08-31T10:15:00+02:00",
    location: location:4
  },
  {
    device: device:1569,
    device_type: device_type:asset,
    timestamp: <datetime>"2022-08-31T10:20:00+02:00",
    location: location:4
  },
  {
    device: device:1569,
    device_type: device_type:asset,
    timestamp: <datetime>"2022-08-31T10:30:00+02:00",
    location: location:1
  },
  {
    device: device:1569,
    device_type: device_type:asset,
    timestamp: <datetime>"2022-08-31T10:35:00+02:00",
    location: location:1
  },
  {
    device: device:1570,
    device_type: device_type:personal,
    timestamp: <datetime>"2022-08-31T10:35:00+02:00",
    location: location:5
  },
  {
    device: device:1571,
    device_type: device_type:asset,
    timestamp: <datetime>"2022-08-31T10:35:00+02:00",
    location: location:6
  }
];

COMMIT TRANSACTION;