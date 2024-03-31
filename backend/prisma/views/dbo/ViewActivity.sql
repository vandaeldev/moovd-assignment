SELECT
  a.id,
  d.name AS deviceID,
  dt.name AS deviceType,
  timestamp,
  l.name AS location
FROM
  Activity AS a
  LEFT JOIN Device AS d ON d.id = a.deviceID
  LEFT JOIN DeviceType AS dt ON dt.id = a.deviceTypeID
  LEFT JOIN Location AS l ON l.id = a.locationID;