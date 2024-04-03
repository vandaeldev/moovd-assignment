BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Activity] (
    [id] INT NOT NULL IDENTITY(1,1),
    [deviceID] INT NOT NULL,
    [deviceTypeID] INT NOT NULL,
    [locationID] INT NOT NULL,
    [timestamp] DATETIME2 NOT NULL CONSTRAINT [Activity_timestamp_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Activity_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Device] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(6) NOT NULL,
    [typeID] INT NOT NULL,
    CONSTRAINT [Device_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Device_name_key] UNIQUE NONCLUSTERED ([name]),
    CONSTRAINT [Device_id_typeID_key] UNIQUE NONCLUSTERED ([id],[typeID])
);

-- CreateTable
CREATE TABLE [dbo].[DeviceType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(8) NOT NULL,
    CONSTRAINT [DeviceType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [DeviceType_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Location] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(2) NOT NULL,
    CONSTRAINT [Location_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Location_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(255) NOT NULL,
    [username] NVARCHAR(255) NOT NULL,
    [password] NVARCHAR(60) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- AddForeignKey
ALTER TABLE [dbo].[Activity] ADD CONSTRAINT [Activity_deviceID_deviceTypeID_fkey] FOREIGN KEY ([deviceID], [deviceTypeID]) REFERENCES [dbo].[Device]([id],[typeID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Activity] ADD CONSTRAINT [Activity_locationID_fkey] FOREIGN KEY ([locationID]) REFERENCES [dbo].[Location]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Device] ADD CONSTRAINT [Device_typeID_fkey] FOREIGN KEY ([typeID]) REFERENCES [dbo].[DeviceType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
