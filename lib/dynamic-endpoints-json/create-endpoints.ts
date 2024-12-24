import Elysia, { t } from "elysia";
import { MongooseModelsMap } from "../../types/dynamic-endpoints/model-types";
import MongoCrudService from "../../db/services/CRUD_Service_class";
import { error as elysiaError } from "elysia";

interface HandlerParams {
  mongo_crud: MongoCrudService;
  params?: { id: number };
  body?: any;
}

export const setupDyanmicEndpoints = (
  app: Elysia,
  models: MongooseModelsMap
) => {
  console.log("Models: ", models);
  // Iterate over the models and create the endpoints
  Object.entries(models).forEach(([name, model]) => {
    // GET all records (documents)
    app.get(`/api/${name}`, async ({ mongo_crud }: HandlerParams) => {
      try {
        const result = await mongo_crud.findAll<any>(model);
        console.log("Result: ", result);
        return result;
      } catch (error) {
        console.error(`Error | GET (/${name}) : `, error);
        return elysiaError(404, "Not found");
      }
    });

    // GET one record (document)
    app.get(
      `/api/${name}/:id`,
      async ({ mongo_crud, params }: HandlerParams) => {
        // Check if the parameters are present
        if (!params || !params.id) {
          return elysiaError(400, "Bad Request: Missing parameters");
        }
        const { id } = params;
        try {
          const result = await mongo_crud.findOne<any>(model, {
            id,
          });
          return result;
        } catch (error) {
          console.error(`Error | GET (/${name}/:id) : `, error);
          return elysiaError(404, "Not found");
        }
      },
      {
        params: t.Object({
          id: t.Number(),
        }),
      }
    );

    // POST a new record (document)
    app.post(`/api/${name}`, async ({ mongo_crud, body }: HandlerParams) => {
      if (!body) {
        return elysiaError(400, `POST (/${name}) | Bad Request: Missing body`);
      }

      try {
        const result = await mongo_crud.create<any>(model, body);
        return result;
      } catch (error) {
        console.error(`Error | POST (/${name}) : `, error);
        return elysiaError(400, "Bad Request");
      }
    });

    // PUT (update) a record (document)
    app.put(
      `/api/${name}/:id`,
      async ({ mongo_crud, params, body }: HandlerParams) => {
        if (!params || !params.id) {
          return elysiaError(
            400,
            `PUT (/${name}/:id) | Bad Request: Missing parameters`
          );
        }
        const { id } = params;

        try {
          const result = await mongo_crud.update<any>(model, { id }, body);
          return result;
        } catch (error) {
          console.error(`Error | PUT (/${name}/${id}) : `, error);
          return elysiaError(404, "Not found");
        }
      },
      {
        params: t.Object({
          id: t.Number(),
        }),
      }
    );

    // DELETE a record (document)
    app.delete(
      `/api/${name}/:id`,
      async ({ mongo_crud, params }: HandlerParams) => {
        if (!params || !params.id) {
          return elysiaError(
            400,
            `DELETE (/${name}/:id) | Bad Request: Missing parameters`
          );
        }
        const { id } = params;

        try {
          const result = await mongo_crud.delete<any>(model, { id });
          return result;
        } catch (error) {
          console.error(`Error | DELETE (/${name}/${id}) : `, error);
          return elysiaError(404, "Not found");
        }
      },
      {
        params: t.Object({
          id: t.Number(),
        }),
      }
    );
  });
};
