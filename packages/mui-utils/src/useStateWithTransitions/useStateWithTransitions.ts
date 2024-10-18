import * as React from 'react';
import {
  runWithBatch,
  blockingBatchCallback,
  enqueueStateUpdate,
} from '../CompatTransitionManager';

type StateUpdateFn<T> = (prevState: T) => T;
type SetStateInput<T> = T | StateUpdateFn<T>;
type SetStateFn<T> = (value: SetStateInput<T>) => void;

/**
 * Like `useState`, but for use with the compatibility version of `useTransition`.
 */
export default function useStateWithTransitions<T>(
  initialValue: T | (() => T),
): [T, SetStateFn<T>] {
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
