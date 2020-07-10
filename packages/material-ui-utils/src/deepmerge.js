export function isPlainObject(item) {
  return item && typeof item === 'object' && item.constructor === Object;
}

export default function deepmerge(
  target,
  source,
  options = { clone: true, mergeVariantsArray: true },
) {
  const output = options.clone ? { ...target } : target;

  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      // Avoid prototype pollution
      if (key === '__proto__') {
        return;
      }

      if (isPlainObject(source[key]) && key in target) {
        output[key] = deepmerge(target[key], source[key], options);
      } else if (
        options.mergeVariantsArray &&
        Array.isArray(source[key]) &&
        key in target &&
        Array.isArray(target[key]) &&
        key.substring(0, 3) === 'Mui'
      ) {
        output[key] = [...target[key], ...source[key]];
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
}
