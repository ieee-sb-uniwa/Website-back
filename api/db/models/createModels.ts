import mongoose from "mongoose";
import type { MongooseModelsMap } from "../../types/dynamic-endpoints/model-types";

export const createMongooseModels = (
  jsonContents: { name: string; content: object }[]
) => {
  const models: MongooseModelsMap = {};

  for (const { name, content } of jsonContents) {
    console.log(`\nCreating model: ${name}`);
    // console.log("Content: ", content);
    const schema = createSchema(content, name);
    models[name] = mongoose.model(name, schema);
  }
  return models;
};

const createSchema = (content: object, name?: string) => {
  // If content is an array, use the first element to generate the schema
  if (Array.isArray(content) && content.length > 0) {
    content = content[0];
  }

  const schemaDefinition = Object.entries(content).reduce(
    (schema, [key, value]) => {
      if (Array.isArray(value)) {
        // Handle arrays as arrays of mixed types
        schema[key] = [mongoose.Schema.Types.Mixed];
      } else if (typeof value === "object" && value !== null) {
        // Handle nested objects recursively
        schema[key] = createSchema(value);
      } else if (typeof value === "string") {
        schema[key] = String;
      } else if (typeof value === "number") {
        schema[key] = Number;
      } else if (typeof value === "boolean") {
        schema[key] = Boolean;
      } else {
        // Default to Mixed for unknown types
        schema[key] = mongoose.Schema.Types.Mixed;
      }
      return schema;
    },
    {} as any
  );

  console.log("\nSchema Definition: ", schemaDefinition);

  return new mongoose.Schema(schemaDefinition, {
    collection: name,
  });
};
