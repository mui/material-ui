import React from 'react';
import extractEventHandlers from './extractEventHandlers';

function deduplicateArray<T>(array: Array<T>): Array<T> {
  const set = new Set(array);
  return Array.from(set);
}

/**
 * Creates an object composed of the event handlers from the provided parameters.
 * This function extracts events handlers from the objects from parameters.
 * Handlers found in `ownHandlers` will be provided a function that explicitly calls the other handlers in the chain.
 *
 * @param {object} ownHandlers The object containing event handlers with explicit control over next handlers.
 * @param {...otherProps} args Objects containing other handlers to call. These objects can contain other fields as well. Handlers will be picked from these objects.
 */
export default function mergeEventHandlers(
  ownHandlers: Record<string, (event: any, otherHandler: () => void) => void>,
  ...otherProps: Array<Record<string, unknown>>
) {
  const otherHandlers = Object.assign({}, ...otherProps.map(extractEventHandlers)) as Record<
    string,
    React.EventHandler<any>
  >;

  const allHandlersKeys = deduplicateArray([
    ...Object.keys(ownHandlers),
    ...Object.keys(otherHandlers),
  ]);

  const callOtherHandler = (eventKey: string, event: any) => {
    otherHandlers[eventKey]?.(event);
  };

  return allHandlersKeys
    .map((key: string) => {
      return {
        key,
        handler: (event: React.EventHandler<any>) => {
          if (ownHandlers[key]) {
            ownHandlers[key](event, () => callOtherHandler(key, event));
          } else {
            callOtherHandler(key, event);
          }
        },
      };
    })
    .reduce((acc, { key, handler }) => {
      acc[key] = handler;
      return acc;
    }, {} as Record<string, React.EventHandler<any>>);
}
