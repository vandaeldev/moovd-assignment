WITH ActivityGrouped AS (
  SELECT
    *,
    row_number() OVER (
      PARTITION BY deviceID
      ORDER BY
        timestamp DESC
    ) AS row_num
  FROM
    Activity
)
SELECT
  ag.id,
  d.name AS device,
  dt.name AS deviceType,
  timestamp,
  l.name AS location
FROM
  ActivityGrouped AS ag
  JOIN Device AS d ON d.id = ag.deviceID
  JOIN DeviceType AS dt ON dt.id = ag.deviceTypeID
  JOIN Location AS l ON l.id = ag.locationID
WHERE
  ag.row_num = 1;