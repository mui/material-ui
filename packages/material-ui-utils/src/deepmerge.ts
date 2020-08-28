export function isPlainObject(item: unknown) {
  return item && typeof item === 'object' && item.constructor === Object;
}

export interface DeepmergeOptions {
  clone?: boolean;
}

export default function deepmerge<T>(
  target: Partial<T>,
  source: Partial<T>,
  options: DeepmergeOptions = { clone: true },
) {
  const output = options.clone ? { ...target } : target;

  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      // Avoid prototype pollution
      if (key === '__proto__') {
        return;
      }

      // @ts-ignore
      if (isPlainObject(source[key]) && key in target) {
        // @ts-ignore
        output[key] = deepmerge(target[key], source[key], options);
      } else {
        // @ts-ignore
        output[key] = source[key];
      }
    });
  }

  return output;
}
