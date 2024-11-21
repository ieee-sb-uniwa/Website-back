export const isKeyOfMap = <K, V>(key: K, map: Map<K, V>): key is K => {
  return map.has(key);
};
