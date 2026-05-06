import { EventHandlers } from '../types';

export function isEventHandler(key: string, value: unknown): boolean {
  return (
    key.charCodeAt(0) === 111 /* o */ &&
    key.charCodeAt(1) === 110 /* n */ &&
    key.charCodeAt(2) >= 65 /* A */ &&
    key.charCodeAt(2) <= 90 /* Z */ &&
    typeof value === 'function'
  );
}

/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param object An object to extract event handlers from.
 * @param excludeKeys An array of keys to exclude from the returned object.
 */
function extractEventHandlers(
  object: Record<string, any> | undefined,
  excludeKeys: string[] = [],
): EventHandlers {
  if (object === undefined) {
    return {};
  }

  const result: EventHandlers = {};

  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (isEventHandler(key, object[key]) && !excludeKeys.includes(key)) {
      result[key] = object[key];
    }
  }

  return result;
}

export default extractEventHandlers;
