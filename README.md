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
