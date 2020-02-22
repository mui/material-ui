import * as React from 'react';

/** Use it instead of .includes method for IE support */
export function arrayIncludes<T>(array: T[] | readonly T[], itemOrItems: T | T[]) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(item => array.indexOf(item) !== -1);
  }

  return array.indexOf(itemOrItems) !== -1;
}

export const onSpaceOrEnter = (innerFn: () => void) => (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    innerFn();

    // prevent any side effects
    e.preventDefault();
    e.stopPropagation();
  }
};

/** Quick untyped helper to improve function composition readability */
export const pipe = (...fns: ((...args: any[]) => any)[]) =>
  fns.reduceRight(
    (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    value => value
  );
