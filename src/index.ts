import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import { readConfig } from "../utils/config_utils";
import { addEndpoint } from "../lib/elysia-endpoint-management/adding_endpoints";
import { connectWithMongoDB } from "../db/connection";
import MongoCrudService from "../db/services/CRUD_Service_class";

const { endpoints, corsAllowlist } = await readConfig();
console.log("🚀 ~ endpoints:", endpoints);
console.log("🚀 ~ corsAllowlist:", corsAllowlist);

// For Configuartion see: .env.development or .env.production
await connectWithMongoDB(); // Throws if connection fails

// Initialize the Elysia app
const app = new Elysia();
console.log(process.env.NODE_ENV);
// (DEV) Go to http://localhost:<PORT>/swagger to see the Swagger UI
if (process.env.NODE_ENV === "development") app.use(swagger());

// CORS
app.use(
  cors({
    origin: Bun.env.NODE_ENV === "development" ? "*" : corsAllowlist,
  })
);

app.get(
  "/",
  () => "Hello and Welcome to Elysia JS App for IEEE SB Uniwa Website Backend!"
);

// Useful for checking if the server is up
app.get("/ping", () => {
  return {
    ok: true,
  };
});

app.decorate("mongo_crud", new MongoCrudService());

// Programmatically registring the endpoints based on YAML config
endpoints.forEach((endpoint) => {
  addEndpoint(endpoint, app);
});

app.listen(process.env.ELYSIA_API_PORT || 3000);

console.log(
  `🦊 Elysia is listening at PORT: ${app.server?.hostname}:${app.server?.port}`
);
