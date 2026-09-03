import isEventHandler from '@mui/utils/isEventHandler';
import { EventHandlers } from '../types';

/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param object An object to extract event handlers from.
 */
function extractEventHandlers(object: Record<string, any> | undefined): EventHandlers {
  if (object === undefined) {
    return {};
  }

  const result: EventHandlers = {};

  for (const prop of Object.keys(object)) {
    if (isEventHandler(prop, object[prop])) {
      result[prop] = object[prop];
    }
  }

  return result;
}

export default extractEventHandlers;
