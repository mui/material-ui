import * as React from 'react';
import {
  runWithBatch,
  blockingBatchCallback,
  enqueueStateUpdate,
} from '../utils/CompatTransitionManager';

/**
 * Like `useReducer`, but for use with `useTransitionCompat`.
 * TODO: Improve typing.
 */
export function useReducerCompat<T>(reducer: any, initializerArg: any, initializer?: any) {
  if (typeof React.startTransition === 'function') {
    // TODO: `useReducerCompat` is unnecessary in React 18 and higher.
    // We should suggesting migrating to a regular `useReducer` *after*
    // migrating `useTransitionCompat` calls.
  }

  const [state, dispatch] = React.useReducer(reducer, initializerArg, initializer);
  const enqueueDispatch = React.useCallback(
    (value: any) => {
      runWithBatch(() => {
        enqueueStateUpdate(() => (dispatch as any)(value));
      }, blockingBatchCallback);
    },
    [dispatch],
  );

  return [state, enqueueDispatch];
}
