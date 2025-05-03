export const listOfMongoDBCollections = [
  "council",
  "counselor",
  "events",
  "thirdparty",
] as const;

export type MongoDBCollection = (typeof listOfMongoDBCollections)[number];
