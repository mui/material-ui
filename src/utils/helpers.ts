import * as warning from 'warning';

export function capitalizeFirstLetter(string: string): string {
  warning(
    typeof string === 'string',
    'Material-UI: capitalizeFirstLetter(string) expects a string argument.',
  );

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function contains(obj: object, pred: object): boolean {
  return Object.keys(pred).every(key => {
    return obj.hasOwnProperty(key) && obj[key] === pred[key];
  });
}

export function findIndex(arr: any[], pred: any): number {
  const predType = typeof pred;
  for (let i = 0; i < arr.length; i += 1) {
    if (predType === 'function' && !!pred(arr[i], i, arr) === true) {
      return i;
    }
    if (predType === 'object' && contains(arr[i], pred)) {
      return i;
    }
    if (['string', 'number', 'boolean'].indexOf(predType) !== -1) {
      return arr.indexOf(pred);
    }
  }
  return -1;
}

export function find<T>(arr: T[], pred: any): T {
  const index = findIndex(arr, pred);
  return index > -1 ? arr[index] : undefined;
}

/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
export function createChainedFunction(...funcs: Function[]): Function {
  return funcs.filter(func => func != null).reduce(
    (acc, func) => {
      warning(
        typeof func === 'function',
        'Material-UI: invalid Argument Type, must only provide functions, undefined, or null.',
      );

      return function chainedFunction(...args: Function[]) {
        acc.apply(this, args);
        func.apply(this, args);
      };
    },
    () => {},
  );
}
