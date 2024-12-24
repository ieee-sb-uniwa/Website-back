# Backend for SB IEEE Website

## Tech Stack

- Runtime: Bun.js
- Database: MongoDB
- API: Elysia.js
- Containerization: Docker
- CI/CD: Github Actions
- Reverse Proxy: Traefik

## Architecture

1. Traefik is used for TLS termniation and for routing requests to the appropriate service
2. Bun.js & Elysia.js are used for the Backend API
3. MongoDB is used as the database

## Lead Branch

- `dynamic-endpoints-basedon-json`

## How to run

1. Clone the repository
2. Make sure you have Docker & Docker Compose installed,
   - to check run: `docker -v` and `docker compose`
3. Make sure Docker is running,
   - by executing `docker ps`
4. Using the terminal (bash or whatever supports .sh), `./run-docker.sh`
   - Depending on the **NODE_ENV environment variable** (located at .env file), the application will run in either development or production mode
   - In **Dev Mode**, Docker's watch functionality will be enabled, and the application will restart on SPECIFIC file changes
   - In **Production Mode**, watch mode is disabled and the application will run in the background.
5. To stop the application, use `./stop-docker.sh`

## When making changes to JSON files

1. Stop the application: `./stop-docker.sh`
2. Delete the `website-back-mongo` image: Run: `./db/cleanup-mongo-image.sh`
3. In case you want to **add a new JSON file** to the database, follow the steps below:

   - Add the JSON file to the `./db/data` directory
   - Go to the `./db/init-mongo.sh`
   - Then add the JSON file you want to import to the end, like so:

   ```bash
   import_collection "test_2" "/my-data/test_2.json" // replace test_2 with the file's name
   ```

4. Run the application: `./run-docker.sh`

If you simply made some changes to some **existing JSON file(s)**, you can _skip step 3_.

## How to access the API and Traefik Dashboard

- API (Root): [http://local.api.test](http://local.api.test)
- API (ex. Council info in English): [http://local.api.test/api/council_en](http://local.api.test/api/council_en)
- Traefik Dashboard: [http://localhost:8080](http://localhost:8080)

## Using Bruno Client API Tool to test the API

1. Install Bruno [(Official Website)](https://www.usebruno.com/downloads)
2. Open Bruno
3. At the 2nd Bruno Logo, you will find three dots, click on them
4. Click on "Import Collection"
5. Find/Click the `IEEE-WEB-API` folder/directory
6. Select the `bruno.json` file
