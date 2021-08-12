/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param obj An object to extract event handlers from.
 */
export default function extractEventHandlers(obj: Record<string, any>) {
  if (obj == null) {
    return {};
  }

  return Object.keys(obj)
    .filter((prop) => prop.match(/^on[A-Z]/) && typeof obj[prop] === 'function')
    .reduce((acc, prop) => {
      acc[prop] = obj[prop];
      return acc;
    }, {} as Record<string, React.EventHandler<any>>);
}
