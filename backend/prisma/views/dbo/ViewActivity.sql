SELECT
  a.id,
  d.name AS deviceID,
  dt.name AS deviceType,
  timestamp,
  l.name AS location
FROM
  [dbo].[Activity] AS a
  LEFT JOIN [dbo].[Device] AS d ON a.deviceID = d.id
  LEFT JOIN [dbo].[DeviceType] AS dt ON a.deviceTypeID = dt.id
  LEFT JOIN [dbo].[Location] AS l ON a.locationID = l.id;