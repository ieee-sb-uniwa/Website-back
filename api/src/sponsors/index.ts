import { Elysia, t } from "elysia";
import { findAll } from "../common/database/service";
import Sponsors from "./schema";
import { responseSponsor } from "./model";
import { baseQuery } from "../common/model";

export const sponsors = new Elysia({ prefix: "/sponsors" })
  .get(
    "/",
    async ({ status, query }) => {
      try {
        const { lang = "gr", sortBy = "id" } = query;

        const result = await findAll(Sponsors, {
          lang,
          sortBy,
        });

        return result;
      } catch (error) {
        console.error(`Error | GET (/sponsors):`, error);

        return status(500, "Internal Server Error");
      }
    },
    {
      query: baseQuery,
      response: {
        200: t.Array(responseSponsor),
        500: t.String(),
      },
      detail: {
        tags: ["Sponsors"],
      },
    }
  );
