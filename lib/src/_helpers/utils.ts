import * as React from 'react';

/* Use it instead of .includes method for IE support */
export function arrayIncludes<T>(array: T[] | readonly T[], itemOrItems: T | T[]) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(item => array.indexOf(item) !== -1);
  }

  return array.indexOf(itemOrItems) !== -1;
}

export const onSpaceOrEnter = (
  innerFn: () => void,
  onFocus?: (event: React.KeyboardEvent<any>) => void
) => (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    innerFn();

    // prevent any side effects
    event.preventDefault();
    event.stopPropagation();
  }

  if (onFocus) {
    onFocus(event);
  }
};

/* Quick untyped helper to improve function composition readability */
export const pipe = (...fns: ((...args: any[]) => any)[]) =>
  fns.reduceRight(
    (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    value => value
  );

export const executeInTheNextEventLoopTick = (fn: () => void) => {
  setTimeout(fn, 0);
};

export function createDelegatedEventHandler<TEvent>(
  fn: (event: TEvent) => void,
  onEvent?: (event: TEvent) => void
) {
  return (event: TEvent) => {
    fn(event);

    if (onEvent) {
      onEvent(event);
    }
  };
}

export function mergeRefs<T>(refs: (React.Ref<T | null> | undefined)[]) {
  return (value: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (typeof ref === 'object' && ref != null) {
        // @ts-ignore .current is not a readonly, hold on ts
        ref.current = value;
      }
    });
  };
}
