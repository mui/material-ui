const memoize = (func, resolver = (a) => a) => {
  const cache = new Map();
  return (...args) => {
    const key = resolver(...args);
    if (cache.has(key)) return cache.get(key);
    const value = func(...args);
    cache.set(key, value);
    return value;
  };
};

export default memoize;
