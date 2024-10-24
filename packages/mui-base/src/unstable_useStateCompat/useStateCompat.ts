import * as React from 'react';
import {
  runWithBatch,
  blockingBatchCallback,
  enqueueStateUpdate,
} from '../utils/CompatTransitionManager';

type StateUpdateFn<T> = (prevState: T) => T;
type SetStateInput<T> = T | StateUpdateFn<T>;
type SetStateFn<T> = (value: SetStateInput<T>) => void;

/**
 * Like `useState`, but for use with `useTransitionCompat`.
 */
export function useStateCompat<T>(initialValue: T | (() => T)): [T, SetStateFn<T>] {
  if (typeof React.startTransition === 'function') {
    // TODO: `useStateCompat` is unnecessary in React 18 and higher.
    // We should suggesting migrating to a regular `useState` *after*
    // migrating `useTransitionCompat` calls.
  }

  const [state, setState] = React.useState(initialValue);
  const enqueueSetState = React.useCallback(
    (value: SetStateInput<T>) => {
      runWithBatch(() => {
        enqueueStateUpdate(() => setState(value));
      }, blockingBatchCallback);
    },
    [setState],
  );

  return [state, enqueueSetState];
}
