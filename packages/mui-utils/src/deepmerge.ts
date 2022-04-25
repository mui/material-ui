export function isPlainObject(item: unknown) {
  return item !== null && typeof item === 'object' && item.constructor === Object;
}

export interface DeepmergeOptions {
  clone?: boolean;
}

type Assign<A, B> = {
  [key in keyof A | keyof B]: key extends keyof B
    ? key extends keyof A
      ? B[key] extends Record<keyof any, any>
        ? A[key] extends Record<keyof any, any>
          ? Assign<A[key], B[key]>
          : B[key]
        : B[key]
      : B[key]
    : key extends keyof A
    ? A[key]
    : never;
};

function deepmerge<A extends Record<keyof any, any>, B extends Record<keyof any, any>>(
  target: A,
  source: B,
  options?: DeepmergeOptions,
): B extends A ? A : Assign<A, B>;
function deepmerge<A extends Record<keyof any, any>, B extends Record<keyof any, any>>(
  target: A,
  source: B,
  options: DeepmergeOptions = { clone: true },
): Assign<A, B> {
  const output: A & B = options.clone ? { ...target } : target;

  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      // Avoid prototype pollution
      if (key === '__proto__') {
        return;
      }

      if (isPlainObject(source[key]) && key in target && isPlainObject(target[key])) {
        output[key as keyof B | keyof A] = deepmerge(target[key], source[key], options);
      } else {
        output[key as keyof B | keyof A] = source[key];
      }
    });
  }

  return output;
}

export default deepmerge;
