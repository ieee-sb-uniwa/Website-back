export const listOfMongoDBCollections = [
  "council_en",
  "council_gr",
  "counselor_en",
  "counselor_gr",
  "sg_en",
  "sg_gr",
  "dep_en",
  "dep_gr",
  "news_en",
  "news_gr",
  "events_en",
  "events_gr",
  "third_party_en",
  "third_part_gr",
] as const;

export type MongoDBCollection = (typeof listOfMongoDBCollections)[number];
