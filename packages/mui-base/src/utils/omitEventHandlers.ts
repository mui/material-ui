import { Simplify } from '@mui/types';

/**
 * Creates a type that is T with removed properties that are functions with names beginning with `on`.
 * Note that it does not exactly follow the logic of `omitEventHandlers` as it also removes fields where
 * `on` is followed by a non-letter character,
 */
export type OmitEventHandlers<T> = {
  [Key in keyof T as Key extends `on${infer EventName}`
    ? T[Key] extends Function
      ? EventName extends ''
        ? Key
        : EventName extends Capitalize<EventName>
        ? never
        : Key
      : Key
    : Key]: T[Key];
};

/**
 * Removes event handlers from the given object.
 * A field is considered an event handler if it is a function with a name beginning with `on`.
 *
 * @param object Object to remove event handlers from.
 * @returns Object with event handlers removed.
 */
export default function omitEventHandlers<T extends Record<string, unknown>>(
  object: T | undefined,
): Simplify<OmitEventHandlers<T>> {
  if (object === undefined) {
    return {} as Simplify<OmitEventHandlers<T>>;
  }

  const result = {} as Simplify<OmitEventHandlers<T>>;

  Object.keys(object)
    .filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === 'function'))
    .forEach((prop) => {
      (result[prop] as any) = object[prop];
    });

  return result;
}
