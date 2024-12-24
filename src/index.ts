import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import { readConfig } from "../utils/config_utils";
// import {
//   addEndpoint,
// } from "../lib/elysia-endpoint-management/adding_endpoints";
import { connectWithMongoDB } from "../db/connection";
import MongoCrudService from "../db/services/CRUD_Service_class";
import { CouncilGr } from "../db/mongoose_schemas/models_and_schemas";
import { processJsonFiles } from "../lib/dynamic-endpoints-json/process-json-files";
import { createMongooseModels } from "../db/models/createModels";
import { setupDyanmicEndpoints } from "../lib/dynamic-endpoints-json/create-endpoints";

// This does the following:
//  1. automatically searches for .yaml or .yml files in the /src directory
//  2. reads the file and parses the YAML content
const { corsAllowlist } = await readConfig();
const jsonContents = await processJsonFiles();

console.log("🚀 ~ corsAllowlist:", corsAllowlist);

// Create Mongoose models from the JSON Data
const models = createMongooseModels(jsonContents);

// 🧪 I use this for testing purposes, to control the connection to the database
if (process.env.ENABLE_MONGO_CONNECTION === "true") await connectWithMongoDB(); // Throws if connection fails

// Initialize the Elysia app
const app = new Elysia();
console.log("Environtment or Mode: ", process.env.NODE_ENV);

// (DEV) Go to http://localhost:<PORT>/swagger to see the Swagger UI
if (process.env.NODE_ENV === "development") app.use(swagger());

// CORS
// app.use(
//   cors({
//     // In DEV mode allow all origins
//     // In PROD mode allow only the origins in the allowlist ("corsAllowlist" comes from the config yaml file named: "endpoints-config.yaml")
//     origin: Bun.env.NODE_ENV === "development" ? true : corsAllowlist,
//   })
// );

app.use(
  cors({
    origin: (request) => {
      const origin = request.headers.get("Origin");
      if (process.env.NODE_ENV === "development") {
        console.log("Headers: ", request.headers);
        return true; // Allow all origins in development mode
      } else {
        if (origin && corsAllowlist.includes(origin)) {
          return true; // Allow the origin if it is in the allowlist
        } else {
          return false; // Disallow the origin if it is not in the allowlist
        }
      }
    },
  })
);

// Just a simple welcome message, useful for checking if the server is up
app.get(
  "/",
  () => "Hello and Welcome to Elysia JS App for IEEE SB Uniwa Website Backend!"
);

// Useful for checking if the server is up (less verbose than the previous one)
app.get("/ping", () => {
  return {
    ok: true,
  };
});

// Elysia Docs for "decorate": https://elysiajs.com/tutorial.html
// By decorating the app with "mongo_crud" we can access the MongoCrudService from any handler
// See the "addEndpoint" function in "adding_endpoints.ts" for an example
app.decorate("mongo_crud", new MongoCrudService());

// Programmatically registring the endpoints based on YAML config
setupDyanmicEndpoints(app, models);

app.listen(process.env.ELYSIA_API_PORT || 3000);

console.log(
  `🦊 Elysia is listening at PORT: ${app.server?.hostname}:${app.server?.port}`
);
