# LMS Exercise

## Requirements

- Java 20
- PostgreSQL 16
- Node.js v21.1.0
- Latest Yarn Classic

## Local setup

### Server

To set up the server application locally you'll need a PostgreSQL database. You can configure the connection using a [12 Factor Config](https://12factor.net/config) `.env` file:

- Go to `lms-server/` folder
- Create a new `.env` file
- Copy the contents of `.env.example` file in your `.env` file
- Replace the example values with your database connection. For example, you can use `DB_URL` to set the port where PostgreSQL is running and the name of the database.

You can start the server locally running the following command:

```shell
./gradlew bootRun
```

### Web

To set up the web application locally you'll need to have Node.js and the latest version of Yarn Classic. The project uses Yarn Berry, so you don't have to worry about matching the Yarn version. First, go to the `lms-web/` folder and install dependencies by running:

```shell
yarn install
```

The Web application also uses [12 Factor Config](https://12factor.net/config) `.env` to configure the API connection. If the `.env` file is not present, or if a required variable is empty, it'll fall back to the `.env.defaults` values, so it's not necessaty to have this file unless you need to change the default configuration. Finally, to start the web application locally you can run:

```shell
yarn start
```
