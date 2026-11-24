# Getting started

This guide gets the whole site running on your machine.

## 1. Install the tools

- **Git**
- **Docker** with Docker Compose v2 (check with `docker compose version`)
- An SSH key added to your GitHub account ([how to set one up](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)). Both repositories are cloned over SSH.

You do not need Node or Bun installed. Everything runs inside containers.

## 2. Clone the repository

```bash
git clone --recurse-submodules git@github.com:ieee-sb-uniwa/Website-back.git
cd Website-back
```

`--recurse-submodules` also downloads the frontend into `web/`. If you forgot it, run:

```bash
git submodule update --init
```

Then switch both repositories to the `develop` branch:

```bash
git switch develop
git -C web switch develop
```

> The submodule starts in "detached HEAD" mode. Always switch `web` to a branch before you change anything there, or your commits will be lost.

## 3. Create your `.env`

```bash
cp .env.example .env
```

The defaults work for local development. You don't need to change anything.

| Variable | Default | What it does |
| --- | --- | --- |
| `NODE_ENV` | `development` | `development` enables hot reload. Use `production` only on the server. |
| `SERVER_NAME` | `localhost` | The host name you open in the browser. |
| `TRAEFIK_PORT` | `80` | The port you open in the browser. Change it if port 80 is taken. |
| `API_URL` | `http://traefik/api` | How the web container reaches the API. Leave it as is. |
| `PUBLIC_FILES_URL` | `/files` | Where images are served from. |
| `MONGO_INITDB_*` | — | Database name and credentials. |
| `MINIO_ROOT_*` | — | MinIO credentials (at least 8 characters). |

## 4. Start everything

```bash
docker compose watch
```

The first run builds all images and takes a few minutes. Keep this terminal open. It shows the logs and syncs your code changes into the containers.

## 5. Check that it works

| Open | You should see |
| --- | --- |
| http://localhost | The website |
| http://localhost/api/ping | `{"test":"ok"}` |
| http://localhost/files/SG/logos/AI.png | An image |
| http://localhost/minio-console | MinIO console (log in with `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD`) |

If you changed `TRAEFIK_PORT`, add the port to these addresses, for example `http://localhost:8080`.

## 6. Make changes

With `docker compose watch` running:

| You change | What happens |
| --- | --- |
| Code in `web/` | The page reloads automatically. |
| Code in `api/` | The API restarts automatically. |
| `api/package.json` or `web/package.json` | The container is rebuilt automatically. |
| Files in `minio/files/` | The files are uploaded again automatically. |
| JSON in `db-container/data/` | **Nothing.** See below. |

### Reloading the database

MongoDB loads the JSON files only when its volume is empty. To load your changes, delete the volume and start again:

```bash
docker compose down -v
docker compose watch
```

`-v` also deletes the MinIO volume. The files are uploaded again on start, so nothing is lost.

## 7. Stop everything

Press `Ctrl+C` in the terminal running `watch`, then:

```bash
docker compose down
```

## Common problems

| Problem | Fix |
| --- | --- |
| `port is already allocated` | Something else uses port 80. Set `TRAEFIK_PORT=8080` in `.env`. |
| `404 page not found` from Traefik | You opened a host other than `SERVER_NAME`. Use `localhost`, not `127.0.0.1`. |
| The site loads but shows no data | The API is still starting. Check the logs with `docker compose logs api`. |
| `web/` is empty | You cloned without the submodule. Run `git submodule update --init`. |
| My JSON changes don't show up | Reload the database (see above). |

