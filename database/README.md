# Running the code

## Package manager

This project is managed and build with `PNPM` as the package manager, however, `NPM` is also supported. For installation of `PNPM`, see the [installation instructions](https://pnpm.io/installation).

## Database setup

### Docker

For cross-platform compatibility it is recommended to run the `SurrealDB v1.5.3` database server containerized with Docker Desktop. For installation of Docker Desktop, see the [installation instructions](https://www.docker.com/get-started).
<br>Once installed, follow these steps:

- Open a terminal of your choice or within your IDE;
- Navigate to the `database` folder of this project;
- Run the following command:

  ```sh
    docker run --name surreal -d -p 8000:8000 -v surreal-data:/data \
      -e "SURREAL_AUTH=true" -e "SURREAL_STRICT=true" -e "SURREAL_USER=<yourUsername>" \
      -e "SURREAL_PASS=<yourPassword>" -e "SURREAL_PATH=file://data" \
      vandaeldev/surrealdb:1.5.3
  ```

This will create a SurrealDB container, reachable at `localhost:8000`.

### Seeding

The following steps will prepare for and fill your database with the required data:

- Open a terminal of your choice or within your IDE;
- Navigate to the `database` folder of this project;
- Copy the `.env.example` file to a `.env` file in the same directory;
- Fill the missing variables of your `.env` file with the user and password for the database server you created in the [Database setup](#database-setup) section;
  - Optionally, run `pnpm convert-env` to convert the plaintext values of your `.env` file to encrypted values;
- Run `pnpm seed` to initialize and seed the database.

After these steps, your database will be ready for use.
