import type { Document, Model } from "mongoose";
import type { MongoDBCollection } from "../db/constants/mongodb_collections";
import {
  Council,
  Counselor,
  Department,
  Event,
  News,
  SG,
  ThirdParty,
} from "../db/mongoose_schemas/models_and_schemas";

export type MongoModelsMap = {
  council_en: typeof Council;
  council_gr: typeof Council;
  counselor_en: typeof Counselor;
  counselor_gr: typeof Counselor;
  sg_en: typeof SG;
  sg_gr: typeof SG;
  dep_en: typeof Department;
  dep_gr: typeof Department;
  news_en: typeof News;
  news_gr: typeof News;
  events_en: typeof Event;
  events_gr: typeof Event;
  third_party_en: typeof ThirdParty;
  third_part_gr: typeof ThirdParty;
};

export const endpoint_mongoModels_map = new Map<
  keyof MongoModelsMap,
  MongoModelsMap[keyof MongoModelsMap]
>();

endpoint_mongoModels_map.set("council_en", Council);
endpoint_mongoModels_map.set("council_gr", Council);
endpoint_mongoModels_map.set("counselor_en", Counselor);
endpoint_mongoModels_map.set("counselor_gr", Counselor);
endpoint_mongoModels_map.set("sg_en", SG);
endpoint_mongoModels_map.set("sg_gr", SG);
endpoint_mongoModels_map.set("dep_en", Department);
endpoint_mongoModels_map.set("dep_gr", Department);
endpoint_mongoModels_map.set("news_en", News);
endpoint_mongoModels_map.set("news_gr", News);
endpoint_mongoModels_map.set("events_en", Event);
endpoint_mongoModels_map.set("events_gr", Event);
endpoint_mongoModels_map.set("third_party_en", ThirdParty);
endpoint_mongoModels_map.set("third_part_gr", ThirdParty);
