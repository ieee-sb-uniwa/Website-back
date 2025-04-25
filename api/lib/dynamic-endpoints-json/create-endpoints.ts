import Elysia, { t } from 'elysia';
import { MongooseModelsMap } from '../../types/dynamic-endpoints/model-types';
import MongoCrudService from '../../db/services/CRUD_Service_class';
import { error as elysiaError } from 'elysia';
import { QueryParamsTypes } from '../../types/dynamic-endpoints/query-params-types';
import { Types } from 'mongoose';

interface HandlerParams {
  mongo_crud: MongoCrudService;
  params?: { id: number };
  body?: any;
  query?: QueryParamsTypes;
}

export const setupDyanmicEndpoints = (
  app: Elysia,
  models: MongooseModelsMap
) => {
  console.log('Models: ', models);
  // Iterate over the models and create the endpoints
  Object.entries(models).forEach(([name, model]) => {
    // app.group('', (app) => {
    // GET all records (documents)
    app.get(
      `/${name}`,
      async ({ mongo_crud, query }: HandlerParams) => {
        const { lang, limitAmount, sortBy, keyword } = query || {};

        const mongoQuery = keyword ? { keywords: keyword } : {};

        try {
          const result = await mongo_crud.findAll<any>(
            model,
            mongoQuery,
            lang,
            sortBy,
            limitAmount ? Number(limitAmount) : undefined
          );
          return result;
        } catch (error) {
          console.error(`Error | GET (/${name}) : `, error);
          return elysiaError(404, 'Not found');
        }
      },
      {
        query: t.Object({
          lang: t.Optional(t.String()),
          limitAmount: t.Optional(t.Number()),
          sortBy: t.Optional(t.String()),
          keyword: t.Optional(t.String()),
        }),
      }
    );

    // GET one record (document)
    app.get(
      `/${name}/:id`,
      async ({ mongo_crud, params }: HandlerParams) => {
        if (!params?.id || !Types.ObjectId.isValid(params.id)) {
          return elysiaError(400, 'Bad Request: Invalid MongoDB ObjectId');
        }
            
        const { id } = params;
    
        try {
          const result = await mongo_crud.findOne<any>(
            model,
            { _id: new Types.ObjectId(id) }
          );
    
          if (!result) {
            return elysiaError(404, 'Not found');
          }
    
          return new Response(JSON.stringify(result), {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        } catch (error) {
          console.error(`Error | GET (/${name}/:id) : `, error);
          return elysiaError(500, 'Internal Server Error');
        }
      },
      {
        params: t.Object({
          id: t.String(),
        }),
        response: t.Object({}, { additionalProperties: true })
      }
    );
    
    
    
    // // POST a new record (document)
    // app.post(`/${name}`, async ({ mongo_crud, body }: HandlerParams) => {
    //   if (!body) {
    //     return elysiaError(400, `POST (/${name}) | Bad Request: Missing body`);
    //   }

    //   try {
    //     const result = await mongo_crud.create<any>(model, body);
    //     return result;
    //   } catch (error) {
    //     console.error(`Error | POST (/${name}) : `, error);
    //     return elysiaError(400, 'Bad Request');
    //   }
    // });

    // // PUT (update) a record (document)
    // app.put(
    //   `/${name}/:id`,
    //   async ({ mongo_crud, params, body }: HandlerParams) => {
    //     if (!params || isNaN(Number(params.id))) {
    //       return elysiaError(
    //         400,
    //         `PUT (/${name}/:id) | Bad Request: Missing parameters`
    //       );
    //     }
    //     const { id } = params;

    //     try {
    //       const result = await mongo_crud.update<any>(model, { id }, body);
    //       return result;
    //     } catch (error) {
    //       console.error(`Error | PUT (/${name}/${id}) : `, error);
    //       return elysiaError(404, 'Not found');
    //     }
    //   },
    //   {
    //     params: t.Object({
    //       id: t.Number(),
    //     }),
    //   }
    // );

    // // DELETE a record (document)
    // app.delete(
    //   `/${name}/:id`,
    //   async ({ mongo_crud, params }: HandlerParams) => {
    //     if (!params || isNaN(Number(params.id))) {
    //       return elysiaError(
    //         400,
    //         `DELETE (/${name}/:id) | Bad Request: Missing parameters`
    //       );
    //     }
    //     const { id } = params;

  //       try {
  //         const result = await mongo_crud.delete<any>(model, { id });
  //         return result;
  //       } catch (error) {
  //         console.error(`Error | DELETE (/${name}/${id}) : `, error);
  //         return elysiaError(404, 'Not found');
  //       }
  //     },
  //     {
  //       params: t.Object({
  //         id: t.Number(),
  //       }),
  //     }
  //   );

    return app;
  });
};
