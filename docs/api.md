# API guide

A map of the API: what it does, where things are, and what isn't obvious from the code.

**Stack:** [Bun](https://bun.sh) · [Elysia](https://elysiajs.com) · [Mongoose](https://mongoosejs.com)

## How data flows

```
db-container/data/*.json  →  MongoDB  →  API (/api/...)  →  web
minio/files/*             →  MinIO    →  /files/...      →  web
```

- The API is **read-only**. Every route is a `GET`.
- MongoDB imports the JSON files **only when its volume is empty**. After changing JSON, run `docker compose down -v` and start again.
- Each JSON file is registered in `db-container/init-mongo.sh`. A new file must be added there too.

## Things to know

**Every document has both languages under `info`.** The API keeps the language you ask for (`?lang=gr` or `en`, default `gr`) and moves its fields to the top level:

```
stored:   { "id": 0, "info": { "gr": { "name": "Σπύρος" }, "en": { "name": "Spyros" } } }
returned: { "id": 0, "name": "Spyros" }                                   (with ?lang=en)
```

**File paths become URLs.** Any value starting with `/` gets `PUBLIC_FILES_URL` added in front. So in the JSON, write `/people/photo.jpg` (relative to `minio/files/`), and the API returns `/files/people/photo.jpg`.

Both of these happen in `findAll` / `findOne` (`src/common/database/service.ts`). Always use them, never `Model.find()` directly.

## Where things are

```
api/
├── app.ts            # Entry point: registers every module
├── config.yml        # CORS allow list
├── src/
│   ├── common/       # Shared: database helpers, query types
│   └── <module>/     # One folder per resource (council, events, projects...)
│       ├── schema.ts #   Mongoose schema (shape in MongoDB)
│       ├── model.ts  #   Allowed query/params
│       └── index.ts  #   Routes
└── tests/
```

## Endpoints

All routes are under `/api`, for example http://localhost/api/council?lang=en.

| Route | Returns |
| --- | --- |
| `/ping` | Health check |
| `/council`, `/counselor` | Council members, branch counselor |
| `/events`, `/events/:id` | SB events |
| `/events/keywords`, `/events/search?query=` | Filtered events |
| `/thirdparty`, `/thirdparty/:id` | Third-party events |
| `/scientific_groups`, `/scientific_groups/:name` | Scientific groups |
| `/projects/:id`, `/projects/sg/:sgName` | Projects |

Most list routes also accept `keywords`, `limitAmount` and `sortBy`. A route's `model.ts` shows exactly what it accepts.
