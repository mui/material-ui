/**
 * Array.prototype.flat polyfill
 * @param {T[][]} arr
 * @returns T[]
 */
function flatten(arr) {
  return arr.reduce((acc, entry) => acc.concat(entry), []);
}

/**
 * Object.fromEntries() polyfill
 * @param {[K, V][]} entries
 * @returns Record<K, V>
 */
function fromEntries(entries) {
  return entries.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
}

/**
 *
 * @param  {object[]} objects
 * @returns {Array<keyof any>}
 */
function uniqueKeys(...objects) {
  return Array.from(new Set(flatten(objects.map(Object.keys))));
}

module.exports = { flatten, fromEntries, uniqueKeys };
