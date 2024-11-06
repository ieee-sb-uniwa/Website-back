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
4. Start Traefik by running: `docker compose -f docker-compose.traefik.yml up -d`
5. Start the MongoDB by running: `docker compose -f docker-compose.mongo.yml up -d`
6. Start the Backend API by running: `docker compose -f docker-compose.backend.dev.yml up -d`
