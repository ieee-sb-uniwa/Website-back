import type { Document, Model } from "mongoose";
import {
  CouncilDocument,
  Council,
  CounselorDocument,
  Counselor,
  EventDocument,
  Event,
  ThirdPartyDocument,
  ThirdParty,
} from "../db/mongoose_schemas/models_and_schemas";

export type MongoDocumentsTypesMap = {
  council: CouncilDocument;
  counselor: CounselorDocument;
  events: EventDocument;
  third_party: ThirdPartyDocument;
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
  council: Council,
  counselor: Counselor,
  events: Event,
  third_party: ThirdParty
};

export const endpoint_mongoModels_map = new Map<
  keyof MongoModelsMap,
  MongoModelsMap[keyof MongoModelsMap]
>();

endpoint_mongoModels_map.set("council", Council);
endpoint_mongoModels_map.set("counselor", Counselor);
endpoint_mongoModels_map.set("events", Event);
endpoint_mongoModels_map.set("third_party", ThirdParty);
