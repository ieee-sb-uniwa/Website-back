import {
  endpoint_mongoModels_map,
  MongoDocumentsTypesMap,
} from "../constants/endpoint_mongoModels_map";

export const isKeyOfMap = <K, V>(key: K, map: Map<K, V>): key is K => {
  return map.has(key);
};

export function isKeyOfMongoDocumentsTypesMap(
  key: string
): key is keyof MongoDocumentsTypesMap {
  return endpoint_mongoModels_map.has(key as keyof MongoDocumentsTypesMap);
}
