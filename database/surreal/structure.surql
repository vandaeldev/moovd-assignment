BEGIN TRANSACTION;

-- user
DEFINE TABLE IF NOT EXISTS user SCHEMAFULL
	PERMISSIONS FOR select, update, delete
	WHERE $scope = 'user' AND id = $auth.id
;
DEFINE FIELD IF NOT EXISTS username ON user TYPE string;
DEFINE FIELD IF NOT EXISTS email ON user TYPE string ASSERT string::is::email($value);
DEFINE FIELD IF NOT EXISTS password ON user TYPE string;
DEFINE INDEX IF NOT EXISTS email_idx ON user FIELDS email UNIQUE;
DEFINE INDEX IF NOT EXISTS username_idx ON user FIELDS username UNIQUE;

-- scope
DEFINE SCOPE IF NOT EXISTS user SESSION 1d
	SIGNUP (
		CREATE user CONTENT {
			email: $email,
			password: crypto::argon2::generate($password),
			username: $username
		}
	)
	SIGNIN (
		SELECT * FROM user
		WHERE (username = $email || username = $username) && crypto::argon2::compare(password, $password)
	)
;

-- location
DEFINE TABLE IF NOT EXISTS location SCHEMAFULL
	PERMISSIONS FOR select
	WHERE $scope = 'user'
;
DEFINE FIELD IF NOT EXISTS name ON TABLE location TYPE string;
DEFINE INDEX IF NOT EXISTS name_idx ON TABLE location FIELDS name UNIQUE;

-- device_type
DEFINE TABLE IF NOT EXISTS device_type SCHEMAFULL
	PERMISSIONS FOR select
	WHERE $scope = 'user'
;
DEFINE FIELD IF NOT EXISTS name ON TABLE device_type TYPE string;
DEFINE INDEX IF NOT EXISTS name_idx ON TABLE device_type FIELDS name UNIQUE;

-- device
DEFINE TABLE IF NOT EXISTS device SCHEMAFULL
	PERMISSIONS FOR select
	WHERE $scope = 'user'
;
DEFINE FIELD IF NOT EXISTS name ON TABLE device TYPE string;
DEFINE FIELD IF NOT EXISTS type ON TABLE device TYPE record<device_type>;
DEFINE INDEX IF NOT EXISTS name_idx ON TABLE device FIELDS name UNIQUE;

-- activity
DEFINE TABLE IF NOT EXISTS activity SCHEMAFULL
	PERMISSIONS FOR select
	WHERE $scope = 'user'
;
DEFINE FIELD IF NOT EXISTS device ON TABLE activity TYPE record<device>;
DEFINE FIELD IF NOT EXISTS device_type ON TABLE activity TYPE record<device_type>;
DEFINE FIELD IF NOT EXISTS location ON TABLE activity TYPE record<location>;
DEFINE FIELD IF NOT EXISTS timestamp ON TABLE activity TYPE datetime;

-- activity_latest (future reference)
-- DEFINE TABLE IF NOT EXISTS activity_latest AS (
-- 	SELECT
-- 		device.name AS device,
-- 		device_type.name AS deviceType,
-- 		array::last(location.name) AS location,
-- 		array::last(timestamp) AS timestamp
-- 	FROM (
-- 		SELECT * FROM activity
-- 		ORDER BY device, timestamp
-- 	) GROUP BY device, deviceType
-- );

COMMIT TRANSACTION;