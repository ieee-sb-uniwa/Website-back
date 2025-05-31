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
  PeopleDocument,
  PeopleModel,
  ScientificGroupDocument,
  ScientificGroupModel,
  ProjectDocument,
  ProjectModel
} from "../db/mongoose_schemas/models_and_schemas";

export type MongoDocumentsTypesMap = {
  council: CouncilDocument;
  counselor: CounselorDocument;
  events: EventDocument;
  third_party: ThirdPartyDocument;
  people: PeopleDocument;
  scientific_groups: ScientificGroupDocument;
  projects: ProjectDocument
};
export type MongoModelsMap = {
  [K in keyof MongoDocumentsTypesMap]: Model<MongoDocumentsTypesMap[K]>;
};

export const modelsMap: MongoModelsMap = {
  council: Council,
  counselor: Counselor,
  events: Event,
  third_party: ThirdParty,
  people: PeopleModel,
  scientific_groups: ScientificGroupModel,
  projects: ProjectModel
};

export const endpoint_mongoModels_map = new Map<
  keyof MongoModelsMap,
  MongoModelsMap[keyof MongoModelsMap]
>();

endpoint_mongoModels_map.set("council", Council);
endpoint_mongoModels_map.set("counselor", Counselor);
endpoint_mongoModels_map.set("events", Event);
endpoint_mongoModels_map.set("third_party", ThirdParty);
endpoint_mongoModels_map.set("people", PeopleModel);
endpoint_mongoModels_map.set("scientific_groups", ScientificGroupModel);
endpoint_mongoModels_map.set("projects", ProjectModel);
