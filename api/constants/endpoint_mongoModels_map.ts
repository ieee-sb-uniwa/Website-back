import type { Document, Model } from "mongoose";
import {
  CouncilDocument,
  CouncilEn,
  CouncilGr,
  CounselorDocument,
  CounselorEn,
  CounselorGr,
  DepartmentDocument,
  DepartmentEn,
  DepartmentGr,
  EventDocument,
  EventEn,
  EventGr,
  NewsDocument,
  NewsEn,
  NewsGr,
  SG_En,
  SG_Gr,
  SGDocument,
  ThirdPartyDocument,
  ThirdPartyEn,
  ThirdPartyGr,
} from "../db/mongoose_schemas/models_and_schemas";

export type MongoDocumentsTypesMap = {
  council_en: CouncilDocument;
  council_gr: CouncilDocument;
  counselor_en: CounselorDocument;
  counselor_gr: CounselorDocument;
  sg_en: SGDocument;
  sg_gr: SGDocument;
  dep_en: DepartmentDocument;
  dep_gr: DepartmentDocument;
  news_en: NewsDocument;
  news_gr: NewsDocument;
  events_en: EventDocument;
  events_gr: EventDocument;
  third_party_en: ThirdPartyDocument;
  third_part_gr: ThirdPartyDocument;
};
export type MongoModelsMap = {
  [K in keyof MongoDocumentsTypesMap]: Model<MongoDocumentsTypesMap[K]>;
};
// - The above type is the same as the type below type
//
// export type MongoModelsMap2 = {
//   council_en: typeof CouncilEn;
//   council_gr: typeof CouncilGr;
//   counselor_en: typeof CounselorEn;
//   counselor_gr: typeof CounselorGr;
//   sg_en: typeof SG_En;
//   sg_gr: typeof SG_Gr;
//   dep_en: typeof DepartmentEn;
//   dep_gr: typeof DepartmentGr;
//   news_en: typeof NewsEn;
//   news_gr: typeof NewsGr;
//   events_en: typeof EventEn;
//   events_gr: typeof EventGr;
//   third_party_en: typeof ThirdPartyEn;
//   third_part_gr: typeof ThirdPartyGr;
// };

export const modelsMap: MongoModelsMap = {
  council_en: CouncilEn,
  council_gr: CouncilGr,
  counselor_en: CounselorEn,
  counselor_gr: CounselorGr,
  sg_en: SG_En,
  sg_gr: SG_Gr,
  dep_en: DepartmentEn,
  dep_gr: DepartmentGr,
  news_en: NewsEn,
  news_gr: NewsGr,
  events_en: EventEn,
  events_gr: EventGr,
  third_party_en: ThirdPartyEn,
  third_part_gr: ThirdPartyGr,
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
