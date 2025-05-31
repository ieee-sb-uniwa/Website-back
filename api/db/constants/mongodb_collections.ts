export const listOfMongoDBCollections = [
  "council",
  "counselor",
  "events",
  "thirdparty",
  "people",
  "scientific_groups",
  "projects"
] as const;

export type MongoDBCollection = (typeof listOfMongoDBCollections)[number];
