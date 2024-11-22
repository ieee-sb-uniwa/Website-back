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

- `dev`

## How to run

1. Clone the repository
2. Make sure you have Docker & Docker Compose installed, by running `docker -v` and `docker compose`
3. Make sure Docker is running, by running `docker ps`
4. Using the terminal (bash or whatever supports .sh), `./run-docker.sh`
5. Depending on the _NODE_ENV_ environment variable (located at .env file), the application will run in either development or production mode
   - In Dev Mode, Docker's watch functionality will be enabled, and the application will restart on file changes
   - In Production Mode, the application will run in the background.
