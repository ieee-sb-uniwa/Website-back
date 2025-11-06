import { Elysia } from "elysia";

import { findAll, findOne } from "../common/database/service";
import { notFound } from "../common/model";

import { ThirdParty } from "./schema";
import { FilterQuery, Types } from "mongoose";
import {
  ThirdPartyByIdParams,
  ThirdPartyByIdQuery,
  ThirdPartyQuery,
} from "./models";

export const thirdParty = new Elysia({ prefix: "/thirdparty" })
  .get(
    "/",
    async ({ query, status }) => {
      try {
        const { lang = "gr", limitAmount, keywords } = query;

        const mongoQuery: FilterQuery<Record<string, RegExp>> = {};
        if (keywords) {
          const keywordArray = keywords
            .split(",")
            .map((k) => new RegExp(k.trim(), "i"));
          mongoQuery[`info.${lang}.keywords`] = { $in: keywordArray };
        }

        const result = await findAll(ThirdParty, {
          lang,
          query: mongoQuery,
          limit: limitAmount ? Number(limitAmount) : undefined,
        });

        return result;
      } catch (error) {
        console.error(`Error | GET (/thirdparty):`, error);
        return status(404, "Not found");
      }
    },
    {
      query: ThirdPartyQuery,
      response: {
        404: notFound,
      },
      detail: {
        tags: ["Third Party"],
      },
    }
  )
  .get(
    "/:id",
    async ({ query, params, status }) => {
      try {
        const { lang = "gr" } = query;
        const { id } = params;

        const result = await findOne(
          ThirdParty,
          { _id: new Types.ObjectId(id) },
          { lang }
        );

        if (!result) {
          return status(404, "Thirdparty not found");
        }

        return result;
      } catch (error) {
        console.error(`Error | GET (/thirdparty/${params.id}):`, error);
      }
    },
    {
      params: ThirdPartyByIdParams,
      query: ThirdPartyByIdQuery,
      response: {
        404: notFound,
      },
      detail: {
        tags: ["Third Party"],
      },
    }
  );
