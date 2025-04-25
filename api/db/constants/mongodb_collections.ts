export const listOfMongoDBCollections = [
  "council",
  "counselor",
  "events",
  "third_party",
] as const;

export type MongoDBCollection = (typeof listOfMongoDBCollections)[number];
