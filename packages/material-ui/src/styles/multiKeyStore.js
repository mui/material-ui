// Used https://github.com/thinkloop/multi-key-cache as inspiration

export function set(cache, key1, key2, value) {
  let subCache = cache.get(key1);

  if (!subCache) {
    subCache = new Map();
    cache.set(key1, subCache);
  }

  subCache.set(key2, value);
}

export function get(cache, key1, key2) {
  const subCache = cache.get(key1);
  return subCache ? subCache.get(key2) : undefined;
}

export function remove(cache, key1, key2) {
  const subCache = cache.get(key1);
  subCache.delete(key2);
}
