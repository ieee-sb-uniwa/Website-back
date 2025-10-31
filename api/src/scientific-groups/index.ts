import { Elysia, error as elysiaError, t } from "elysia";

import { findAll, findOne } from "../common/database/service";
import { baseQuery, notFound } from "../common/model";

import ScientificGroups from "./schema";
import { FilterQuery, Types } from "mongoose";

export const scientificGroups = new Elysia({ prefix: "/scientific_groups" })
  .get(
    "/",
    async ({ query }) => {
      try {
        const { lang = "gr", limitAmount, keywords, sortBy } = query;

        const mongoQuery: FilterQuery<any> = {};
        if (keywords) {
          const keywordArray = keywords
            .split(",")
            .map((k) => new RegExp(k.trim(), "i"));
          mongoQuery[`info.${lang}.keywords`] = { $in: keywordArray };
        }

        const result = await findAll(ScientificGroups, {
          lang,
          sortBy,
          query: mongoQuery,
          limit: limitAmount ? Number(limitAmount) : undefined,
        });

        return result;
      } catch (error) {
        console.error(`Error | GET (/scientific_groups):`, error);
        return elysiaError(404, "Not found");
      }
    },
    {
      query: baseQuery,
      response: {
        400: notFound,
      },
    }
  )
  .get(
    "/:name",
    async ({ query, params }) => {
      try {
        const { lang = "gr" } = query;
        const { name } = params;

        const result = await findOne(ScientificGroups, { name }, { lang });

        if (!result) {
          return elysiaError(404, "Scientific group not found");
        }

        return result;
      } catch (error) {
        console.error(
          `Error | GET (/scientific_groups/${params.name}):`,
          error
        );
      }
    },
    {
      params: t.Object({ name: t.String() }),
      query: t.Object({ lang: t.Optional(t.String()) }),
      response: {
        400: notFound,
      },
      detail: {
        tags: ["Scientific Groups - Scientific Group"],
      },
    }
  );
