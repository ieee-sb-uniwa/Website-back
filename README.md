# Server Side of the IEEE SB UniWA Website

This project combines various services and tools for the student branch's website.  
All services are built using Docker containers and are accessed through Traefik, which acts as a reverse proxy.

### Repository Branches
- **Main** → Stable version.
- **Develop** → Development version. Merged into Main when the frontend repository becomes compatible.

## How to Run
To run this repository, ensure that Docker is installed and running.

1. Create a `.env` file by copying and filling in your values based on the keys provided in [`env.sample`](./env.sample).
2. Execute the `run-docker.sh` script using a Linux or Bash terminal:
   ```bash
   source run-docker.sh
   ```

To stop the containers, run the `stop-docker.sh` script:
```bash
source stop-docker.sh
```

### Environment Variables
| Variable Name | Values | Description |
| --- | --- | --- |
| SERVER_NAME | DNS name or IP address of the server | Sets the hostname for website services. |
| MONGO_DB_NAME | Any string | Name of the database. |
| NODE_ENV | `development` or `production` | `development` enables live sync and auto-restart; `production` serves the final builds. |
| MINIO_ROOT_USER | Any string over 8 characters | Username for logging into the MinIO web console. |
| MINIO_ROOT_PASSWORD | Any string over 8 characters | Password for logging into the MinIO web console. |

### Development Features
When set to `development`, the API service automatically syncs and restarts upon any file change inside `./api`.  
Similarly, `minio-init` remains active and listens for changes in `./minio`, rebuilding and uploading updated files automatically.

> **Note:** This setup allows only file uploads. To delete images, either use the MinIO web console or run the `stop-docker.sh` script.

## Services Overview

### TRAEFIK
Traefik serves as the reverse proxy for accessing all internal services.  
It is critical that the internal and external ports match the `--entrypoints.web.address` configuration to avoid issues.  
The web service is the default entry point — any route not listed below is forwarded there.

**Default Port:** `80`

| Route | Service |
| --- | --- |
| `/` | Forwards to the web service (Next.js website). |
| `/api` | API service routes. |
| `/files` | Files served from the MinIO `files` bucket. |
| `/minio-console/login` | Access to the MinIO web console. |
| `None` | Direct access to the MongoDB database (internal only). |

### WEB
Serves the Next.js website from a separate Git repository.  
It tracks the `main` branch.

### API
Provides dynamic data access using an Elysia.js (Bun) application.  
Only HTTP `GET` requests are supported, with various URL parameters to filter the data.

All API routes are accessible via Traefik following the pattern `/api/{API Route}`.

| API Route | Action |
| --- | --- |
| `/ping` | Returns `{ok: true}` for health checks. |
| `/council` | Retrieves all SB council member data. |
| `/council/:id` | Retrieves one SB council member based on `_id`. |
| `/counselor` | Retrieves counselor information. |
| `/events` | Retrieves all SB event data. |
| `/events/:id` | Retrieves a single SB event based on `_id`. |
| `/thirdparty` | Retrieves all third-party event data. |
| `/thirdparty/:id` | Retrieves one third-party event based on `_id`. |

| URL Parameter | Available Values | Description |
| --- | --- | --- |
| `lang` | `gr` or `en` | Specifies the language. Defaults to `gr` if unset or invalid. |
| `keyword` | Any string | Filters entries containing the specified keyword in their `keywords` field. |
| `limitAmount` | Any number | Limits the number of entries returned. |
| `sortBy` | Any valid object key | Sorts entries in descending order based on the specified field. Defaults to `id`. |

**Note:** Corrected "limitAmount" duplication; the second was meant to be "sortBy".

### MONGO
MongoDB service stores all website data and is **not accessible externally**.  
Sample data structures can be found [here](./db-container/data/).

Each document contains an `info` field, holding both Greek and English versions of the content.  
The API selects the appropriate language and removes the `info` object from the final output.

### MINIO
MinIO acts as the file server for images and other assets.  
Only the `files` bucket is publicly accessible (read-only) via the API (through Traefik).

To upload files, log in to the MinIO web console using the credentials specified in the `.env` file.

### MINIO-INIT
This service initializes MinIO by uploading all files located in [`./minio/files/`](./minio/files/).

## To-Do List
1. Add support for `api/events?query=` — search for matching words in titles and descriptions.
2. Enhance `api/{API Route}?keyword=` to accept multiple keywords.
3. Add a CMS service.
4. Add missing database files.

<!-- # Backend for SB IEEE Website

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
6. Select the `bruno.json` file -->
