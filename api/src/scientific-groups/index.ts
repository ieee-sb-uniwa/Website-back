import { Elysia, t } from "elysia";

import { findAll, findOne } from "../common/database/service";

import ScientificGroups from "./schema";
import {
  responseScientificGroup,
  ScientificGroupsQuery,
  ScientificGroupsByName,
} from "./model";

export const scientificGroups = new Elysia({ prefix: "/scientific_groups" })
  // GET /scientific_groups
  .get(
    "/",
    async ({ status, query }) => {
      try {
        const { lang = "gr" } = query;

        const result = await findAll(ScientificGroups, {
          lang,
        });

        return result;
      } catch (error) {
        console.error(`Error | GET (/scientific_groups):`, error);

        return status(500, "Internal Server Error");
      }
    },
    {
      query: ScientificGroupsQuery,
      response: {
        200: t.Array(responseScientificGroup),
        500: t.String(),
      },
      detail: {
        tags: ["Scientific Groups"],
      },
    }
  )

  // GET /scientific_groups/:name
  .get(
    "/:name",
    async ({ status, query, params }) => {
      try {
        const { lang = "gr" } = query;
        const { name } = params;

        const result = await findOne(ScientificGroups, { name_short: name.toLocaleLowerCase() }, { lang });

        if (!result) {
          // Return 404 if the scientific group does not exist
          return status(404, "Scientific group not found");
        }

        return result;
      } catch (error) {
        console.error(
          `Error | GET (/scientific_groups/${params.name}):`,
          error
        );

        return status(500, "Internal Server Error");
      }
    },
    {
      params: ScientificGroupsByName,
      query: ScientificGroupsQuery,
      response: {
        200: responseScientificGroup,
        404: t.String(),
        500: t.String(),
      },
      detail: {
        tags: ["Scientific Groups"],
      },
    }
  );
