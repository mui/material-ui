/**
 * Safe chained function.
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 */
export default function createChainedFunction<Args extends any[], This>(
  ...funcs: Array<(this: This, ...args: Args) => any>
): (this: This, ...args: Args) => void {
  return funcs.reduce(
    (acc, func) => {
      if (func == null) {
        return acc;
      }

      return function chainedFunction(...args) {
        acc.apply(this, args);
        func.apply(this, args);
      };
    },
    () => {},
  );
}
