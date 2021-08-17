/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param object An object to extract event handlers from.
 */
export default function extractEventHandlers(object: Record<string, any> | undefined) {
  if (object === undefined) {
    return {};
  }

  const result: Record<string, React.EventHandler<any>> = {};

  Object.keys(object)
    .filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === 'function')
    .forEach((prop) => {
      result[prop] = object[prop];
    });

  return result;
}
