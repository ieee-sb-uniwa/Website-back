import type { Document, Model } from "mongoose";
import type { MongoDBCollection } from "../db/constants/mongodb_collections";
import {
  CouncilEn,
  CouncilGr,
  CounselorEn,
  CounselorGr,
  DepartmentEn,
  DepartmentGr,
  EventEn,
  EventGr,
  NewsEn,
  NewsGr,
  SG_En,
  SG_Gr,
  ThirdPartyEn,
  ThirdPartyGr,
} from "../db/mongoose_schemas/models_and_schemas";

export type MongoModelsMap = {
  council_en: typeof CouncilEn;
  council_gr: typeof CouncilGr;
  counselor_en: typeof CounselorEn;
  counselor_gr: typeof CounselorGr;
  sg_en: typeof SG_En;
  sg_gr: typeof SG_Gr;
  dep_en: typeof DepartmentEn;
  dep_gr: typeof DepartmentGr;
  news_en: typeof NewsEn;
  news_gr: typeof NewsGr;
  events_en: typeof EventEn;
  events_gr: typeof EventGr;
  third_party_en: typeof ThirdPartyEn;
  third_part_gr: typeof ThirdPartyGr;
};

export const endpoint_mongoModels_map = new Map<
  keyof MongoModelsMap,
  MongoModelsMap[keyof MongoModelsMap]
>();

endpoint_mongoModels_map.set("council_en", CouncilEn);
endpoint_mongoModels_map.set("council_gr", CouncilGr);
endpoint_mongoModels_map.set("counselor_en", CounselorEn);
endpoint_mongoModels_map.set("counselor_gr", CounselorGr);
endpoint_mongoModels_map.set("sg_en", SG_En);
endpoint_mongoModels_map.set("sg_gr", SG_Gr);
endpoint_mongoModels_map.set("dep_en", DepartmentEn);
endpoint_mongoModels_map.set("dep_gr", DepartmentGr);
endpoint_mongoModels_map.set("news_en", NewsEn);
endpoint_mongoModels_map.set("news_gr", NewsGr);
endpoint_mongoModels_map.set("events_en", EventEn);
endpoint_mongoModels_map.set("events_gr", EventGr);
endpoint_mongoModels_map.set("third_party_en", ThirdPartyEn);
endpoint_mongoModels_map.set("third_part_gr", ThirdPartyGr);
