# IEEE SB UniWA Website

The website of the IEEE Student Branch of the University of West Attica.

This repository holds everything needed to run the site: the API, the database seed data, the image files, and the Docker setup. The frontend lives in a separate repository, included here as the `web` submodule.

## How it fits together
- **web** (`web/`): the Next.js site. Pages fetch their data from the API.
- **api** (`api/`): a read-only REST API (Bun + Elysia). It reads from MongoDB and returns content in Greek or English.
- **mongo** (`db-container/`): the database. It is filled from the JSON files in `db-container/data/` the first time it starts.
- **minio** (`minio/`): the file server. Everything in `minio/files/` is uploaded and served at `/files/...`.
- **traefik**: sends each request to the right service based on its path.

## Repositories

| Repository | Folder | What it contains |
| --- | --- | --- |
| [Website-back](https://github.com/ieee-sb-uniwa/Website-back) | `/` | API, data, files, Docker setup |
| [Website-front](https://github.com/ieee-sb-uniwa/Website-front) | `web/` | Next.js frontend |

You always clone this repository, even if you only work on the frontend.

## Documentation

Read them in this order:

1. [Getting started](docs/getting-started.md): run the site on your machine.
2. [Workflow](docs/workflow.md): branches, commits, pull requests, and the submodule.
3. [API guide](docs/api.md): how the API is built and how to add an endpoint.
4. [Frontend guide](web/docs/frontend.md): how the Next.js app is organized.
