// @flow weak

export function transform(obj, cb, accumulator) {
  Object.keys(obj).forEach((key) => {
    cb(accumulator, obj[key], key);
  });
  return accumulator;
}

export function contains(obj, pred) {
  for (const key in pred) {
    if (!obj.hasOwnProperty(key) || obj[key] !== pred[key]) {
      return false;
    }
  }
  return true;
}

export function findIndex(arr, pred) {
  const predType = typeof pred;
  for (let i = 0; i < arr.length; i++) {
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

export function find(arr, pred) {
  const index = findIndex(arr, pred);
  return index > -1 ? arr[index] : undefined;
}

export function throttle(fn, limit) {
  let wait = false;
  return function throttledFn() {
    if (!wait) {
      fn.call();
      wait = true;
      return setTimeout(() => {
        wait = false;
      }, limit);
    }
    return null;
  };
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
export function createChainedFunction(...funcs) {
  return funcs
    .filter((f) => f != null)
    .reduce((acc, f) => {
      if (typeof f !== 'function') {
        throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
      }

      if (acc === null) {
        return f;
      }

      return function chainedFunction(...args) {
        acc.apply(this, args);
        f.apply(this, args);
      };
    }, null);
}
