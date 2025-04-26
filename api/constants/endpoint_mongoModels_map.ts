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
