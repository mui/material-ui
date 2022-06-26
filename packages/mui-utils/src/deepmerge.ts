export function isPlainObject(item: unknown) {
  return item !== null && typeof item === 'object' && item.constructor === Object;
}
export interface DeepmergeOptions {
  clone?: boolean;
}

type AnyObject = Record<PropertyKey, any>;

export type Deepmerge<A, B> = {
  [key in keyof A | keyof B]: key extends keyof B
    ? key extends keyof A
      ? B[key] extends AnyObject
        ? A[key] extends AnyObject
          ? Deepmerge<A[key], B[key]>
          : B[key]
        : B[key]
      : B[key]
    : key extends keyof A
    ? A[key]
    : {};
};

export type IsPlainObject<A, B> = A extends AnyObject
  ? A extends any[] | ((...props: any[]) => any) | Set<any> | Map<any, any>
    ? {}
    : B extends AnyObject
    ? B extends any[] | ((...props: any[]) => any) | Set<any> | Map<any, any>
      ? A
      : A extends B
      ? A
      : Deepmerge<A, B>
    : A
  : {};

function deepmerge<A, B>(
  target: A,
  source: B,
  options: DeepmergeOptions = { clone: true },
): IsPlainObject<A, B> {
  if (isPlainObject(target)) {
    if (!isPlainObject(source)) {
      // @ts-expect-error shorthand
      return target;
    }

    const output = options.clone ? { ...target } : target;

    Object.keys(source as AnyObject).forEach((key) => {
      // Avoid prototype pollution
      if (key === '__proto__') {
        return;
      }

      if (
        isPlainObject((source as AnyObject)[key]) &&
        key in target &&
        isPlainObject((target as AnyObject)[key])
      ) {
        output[key as keyof A] = deepmerge(
          (target as AnyObject)[key],
          (source as AnyObject)[key],
          options,
        );
      } else {
        output[key as keyof A] = (source as AnyObject)[key];
      }
    });

    // @ts-expect-error shorthand
    return output;
  }

  // @ts-expect-error shorthand
  return {};
}

export default deepmerge;
