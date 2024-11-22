import { Elysia, error, t } from "elysia";

import { EndpointFromConfig } from "../../types/config_types";
import MongoCrudService from "../../db/services/CRUD_Service_class";
import {
  endpoint_mongoModels_map,
  MongoModelsMap,
} from "../../constants/endpoint_mongoModels_map";
import { isKeyOfMap } from "../../types/type_guards";

type ElysiaHTTPMethods = "get" | "post" | "put" | "delete";
interface HandlerParams {
  mongo_crud: MongoCrudService;
  params: { id: number };
  body?: any;
}

export const addEndpoint = (endpoint: EndpointFromConfig, app: Elysia) => {
  const httpMethods = endpoint.httpMethods.map((method) =>
    method.toLowerCase()
  ) as ElysiaHTTPMethods[]; // Cast to ensure the array contains valid methods

  httpMethods.forEach((method) => {
    switch (method) {
      case "get":
        app.get(endpoint.path, async ({ mongo_crud }: HandlerParams) => {
          const pathSegment = endpoint.path.split("/")[2];
          const tsHappy = isKeyOfMap(pathSegment, endpoint_mongoModels_map);

          if (tsHappy) {
            const mongooseModel = endpoint_mongoModels_map.get(
              pathSegment as keyof MongoModelsMap
            );

            if (mongooseModel) {
              console.log("Using model:", mongooseModel.modelName);
              const result = await mongo_crud.findAll<any>(mongooseModel); // Use the model here
              // const result = await mongooseModel.find();
              if (result) return result;
              else return error(404, "Not found");
            } else {
              console.error("Model not found for the key:", pathSegment);
            }
          }
        });

        if (endpoint.hasManyRecords) {
          app.get(
            `${endpoint.path}/:id`,
            async ({ mongo_crud, params: { id } }: HandlerParams) => {
              const pathSegment = endpoint.path.split("/")[2];
              const tsHappy = isKeyOfMap(pathSegment, endpoint_mongoModels_map);

              if (tsHappy) {
                const mongooseModel = endpoint_mongoModels_map.get(
                  pathSegment as keyof MongoModelsMap
                );

                if (mongooseModel) {
                  const result = await mongo_crud.findOne<any>(mongooseModel, {
                    id,
                  });
                  console.log(
                    "AAAAAAAAAAAAAAAA - 1: ",
                    mongooseModel.modelName
                  );
                  console.log("AAAAAAAAAAAAAAAA - 2: ", result);
                  if (result) return result;
                  else return error(404, "Not found");
                } else {
                  console.error("Model not found for the key:", pathSegment);
                }
              }
            },
            {
              params: t.Object({
                id: t.Number(),
              }),
            }
          );
        }

        break;
      case "post":
        app.post(
          `${endpoint.path}`,
          async ({ mongo_crud, body }: HandlerParams) => {
            const pathSegment = endpoint.path.split("/")[2];
            const tsHappy = isKeyOfMap(pathSegment, endpoint_mongoModels_map);

            if (tsHappy) {
              const mongooseModel = endpoint_mongoModels_map.get(
                pathSegment as keyof MongoModelsMap
              );

              if (mongooseModel) {
                const result = await mongo_crud.create<any>(
                  mongooseModel,
                  body
                ); // Use the model here
                console.log("AAAAAAAAAAAAAAAA - 1: ", mongooseModel.modelName);
                console.log("AAAAAAAAAAAAAAAA - 2: ", result);
                return result;
              } else {
                console.error("Model not found for the key:", pathSegment);
              }
            }
          }
        );

        break;
      case "put":
        app.put(
          `${endpoint.path}/:id`,
          async ({ mongo_crud, params: { id }, body }: HandlerParams) => {
            const pathSegment = endpoint.path.split("/")[2];
            const tsHappy = isKeyOfMap(pathSegment, endpoint_mongoModels_map);

            if (tsHappy) {
              const mongooseModel = endpoint_mongoModels_map.get(
                pathSegment as keyof MongoModelsMap
              );

              if (mongooseModel) {
                const result = await mongo_crud.update<any>(
                  mongooseModel,
                  { id },
                  body
                ); // Use the model here
                console.log("AAAAAAAAAAAAAAAA - 1: ", mongooseModel.modelName);
                console.log("AAAAAAAAAAAAAAAA - 2: ", result);
                return result;
              } else {
                console.error("Model not found for the key:", pathSegment);
              }
            }
          },
          {
            params: t.Object({
              id: t.Number(),
            }),
          }
        );

        break;
      case "delete":
        app.delete(
          `${endpoint.path}/:id`,
          async ({ mongo_crud, params: { id } }: HandlerParams) => {
            const pathSegment = endpoint.path.split("/")[2];
            const tsHappy = isKeyOfMap(pathSegment, endpoint_mongoModels_map);

            if (tsHappy) {
              const mongooseModel = endpoint_mongoModels_map.get(
                pathSegment as keyof MongoModelsMap
              );

              if (mongooseModel) {
                const result = await mongo_crud.delete<any>(mongooseModel, {
                  id,
                }); // Use the model here
                console.log("AAAAAAAAAAAAAAAA - 1: ", mongooseModel.modelName);
                console.log("AAAAAAAAAAAAAAAA - 2: ", result);
                return result;
              } else {
                console.error("Model not found for the key:", pathSegment);
              }
            }
          },
          {
            params: t.Object({
              id: t.Number(),
            }),
          }
        );

        break;
      default:
        break;
    }
  });
};
