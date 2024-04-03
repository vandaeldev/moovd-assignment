# Running the code

## Package manager

This project is managed and build with `PNPM` as the package manager. For installation of `PNPM`, see the [installation instructions](https://pnpm.io/installation).

## Pre-requisites

Some scripts of this project expect the `prisma` and `tsx` packages to be globally installed on your machine. To achieve that, run:
```sh
  pnpm add -g prisma tsx
```

## Database setup

### Docker

For cross-platform compatibility it is recommended to run the `SQL Server 22` database server containerized with Docker Desktop. For installation of Docker Desktop, see the [installation instructions](https://www.docker.com/get-started).
<br>Once installed, follow these steps:

- Open a terminal of your choice or within your IDE;
- Navigate to the `backend` folder of this project;
- Run the following command:

  ```sh
    docker run --name mssql -p 1433:1433 -d -v mssql-data:/var/opt/mssql \
      -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<yourPassword>' -e 'MSSQL_PID=Express' \
      -e 'MSSQL_MEMORY_LIMIT_MB=2048' -e 'TZ=Europe/Amsterdam' \
      mcr.microsoft.com/mssql/server:2022-latest
  ```
  > The SQL Server container expects a strong password of at least 8 characters including uppercase, lowercase letters, base-10 digits and/or non-alphanumeric symbols.

This will create a SQL Server container, reachable at `localhost:1433`.

### Prisma

The following steps will prepare for and fill your database with the required data:

- Open a terminal of your choice or within your IDE;
- Navigate to the `backend` folder of this project;
- Run `prisma migrate deploy` to initialize the database;
- Run `prisma generate` to generate the prisma client for this project;
- Run `prisma db seed` to seed the database.

After these steps, your database will be ready for use.

## Serving the application

- Copy the `example.env` file to a `.env` file in the same directory;
- Fill the `KEY_PHRASE` variable of your `.env` file and replace the `<yourPassword>` section of both the database urls with the password for the database server you created in the [Database setup](#database-setup) section.
- Open a terminal of your choice or within your IDE;
- Navigate to the `backend` folder of this project;
- Run `pnpm install` to install the dependencies of this project;
- Run `pnpm start` to build and run the API server.

The REST API will be reachable at `http://localhost:3000`.
