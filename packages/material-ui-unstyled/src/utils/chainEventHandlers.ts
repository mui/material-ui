import extractEventHandlers from './extractEventHandlers';

function deduplicateArray<T>(array: Array<T>): Array<T> {
  const set = new Set(array);
  return Array.from(set);
}

/**
 * Creates an object composed of the event handlers from the provided parameters.
 * This function extracts events handlers from the objects from parameters and wraps them in a function
 * that calls them in order they were passed in.
 * Handlers found in `ownHandlers` will be provided a function that explicitly calls the other handlers in the chain.
 *
 * @param {object} ownHandlers The object containing event handlers with explicit control over next handlers.
 * @param {...otherProps} args Objects containing other handlers to call. These objects can contain other fields as well. Handlers will be picked from these objects.
 */
export default function chainEventHandlers(
  ownHandlers: Record<string, (event: any, otherHandler: () => void) => void>,
  ...otherProps: Array<Record<string, unknown>>
) {
  const otherHandlers = otherProps.map((props) => extractEventHandlers(props));

  const allHandlersKeys = deduplicateArray([
    ...Object.keys(ownHandlers),
    ...otherHandlers.map(Object.keys).flat(),
  ]);

  const callOtherHandlers = (eventKey: string, event: any) => {
    for (let i = 0; i < otherHandlers.length; i += 1) {
      otherHandlers[i][eventKey]?.(event);
    }
  };

  return [...allHandlersKeys]
    .map((key: string) => {
      return {
        key,
        handler: (e: React.EventHandler<any>) => {
          if (ownHandlers[key]) {
            ownHandlers[key](e, () => callOtherHandlers(key, e));
          } else {
            callOtherHandlers(key, e);
          }
        },
      };
    })
    .reduce((acc, { key, handler }) => {
      acc[key] = handler;
      return acc;
    }, {} as Record<string, React.EventHandler<any>>);
}
