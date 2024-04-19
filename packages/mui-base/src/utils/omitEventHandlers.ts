/**
 * Removes event handlers from the given object.
 * A field is considered an event handler if it is a function with a name beginning with `on`.
 *
 * @param object Object to remove event handlers from.
 * @returns Object with event handlers removed.
 */
export function omitEventHandlers<Props extends Record<string, unknown>>(
  object: Props | undefined,
) {
  if (object === undefined) {
    return {};
  }

  const result = {} as Partial<Props>;

  Object.keys(object)
    .filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === 'function'))
    .forEach((prop) => {
      (result[prop] as any) = object[prop];
    });

  return result;
}
