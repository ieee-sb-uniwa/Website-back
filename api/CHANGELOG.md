# Changes for IEEE UNIWA SB Website Backend

<hr />

## VERSION: 1.1.1

### Changed

The `query` parameter `sortedBy` to `sortBy` in the `create-endpoints.ts` file.

### Fixed

- At `create-endpoints.ts` the `query` params were not being parsed correctly. The issue was that `Elysia` requires the use (as I believe at least) of type validation object that is passed the 3rd argument of the `get` method. For example:

```ts
app.get(
  `/api/${name}`,
  async ({ mongo_crud, query }: HandlerParams) => {
    const { limit, sortBy } = query || {};
    try {
      // If both the "limit" AND "sortBy" params have been provided.
      // It will use them in the DB query
      // Else it will fetch all documents/records of the requested resource.
      if (isNaN(Number(limit))) throw new Error('Limit must be a number');
      const result =
        limit !== undefined && sortBy !== undefined
          ? await mongo_crud.findHead<any>(model, sortBy, Number(limit))
          : await mongo_crud.findAll<any>(model);

      return result;
    } catch (error) {
      console.error(`Error | GET (/${name}) : `, error);
      return elysiaError(404, 'Not found');
    }
  },
  -------------------------------------
  // The type validation object
  {
    query: t.Object({
      limit: t.Optional(t.String()),
      sortBy: t.Optional(t.String()),
    }),
  }
);
```

<hr />

## VERSION: 1.1.0

### Added

- The `CHANGELOG.md` file was added to keep track of changes in the project.
- The ability to use the query params "?limit" and "?sortedBy" in the all the GET requests of this url: "http://local.api.test\/\<endpoint\>/".
  <b>IMPORTANT</b>: `sortedBy` should only be used with the `date` field.
  For example, this url:
  `http://local.api.test/api/events_en?limit=1&sortedBy=date`
  returns:

```json
[
  {
    "_id": "67ade2ba81f09df3e5cda156",
    "id": "1",
    "date": "2024-10-26T03:00:00",
    "location": "UniWA - Campus 2 - ZB001",
    "title": "IEEEXtreme 18.0",
    "images": ["/assets/thumbnails/IEEEXtreme_18.0.png"],
    "keywords": ["Hackathon"],
    "description": "✨ We invite you to IEEE SB UniWA's first on-site workshop on version control with Git and GitHub! Git and GitHub are two related tools widely used for code tracking and management. 🖥️👨‍💻 Git is a version control system that allows developers to track changes in their code, keep a history of these changes, and collaborate with others on shared projects. 💾 GitHub is a Git repository hosting platform that offers an environment for code sharing and collaboration, combining Git’s features with an online platform. 🌐✅ This workshop will be conducted by Spyros Saridakis and will cover all the essential knowledge needed to effectively work on team projects involving code and more! 👥📅 Date: Saturday, October 12 - 12:00 p.m. 📍 Location: University of West Attica 🔷 To register, please fill out the form below. 🚀 Don’t miss the chance to boost your productivity and collaborate effectively with others! 😎",
    "links": [
      {
        "title": "Participation Form",
        "url": "https://forms.gle/jhdutWgsPr9rqXXq8"
      }
    ]
  }
]
```

### Updated

- Traefik updated from version 2.X.X to 3.3.3

### Fixed

- Made sure Traefik and the Elysia API App play well together. Health checks were added in both Elysia and Traefik to ensure that the API App is discovered by Traefik.
