import * as React from 'react';
import {
  asyncBatchCallback,
  batchReactUpdates,
  createPassthroughBatchCallback,
  enqueueStateUpdate,
  runWithBatch,
  StartTransitionFunction,
  TransitionFunction,
} from '../utils/CompatTransitionManager';

function useTransitionCompatImpl18(): [boolean, StartTransitionFunction] {
  // TODO: On React 18 and higher, using the compat hook is unnecessary,
  // so we should display a warning. However, to ease the upgrade process,
  // we implement the same semantics as in the compat hook, i.e.
  // only updates to `useStateCompat` and `useReducerCompat` are marked
  // as non-blocking.
  const [isPending, startTransitionImpl] = React.useTransition();
  const batchCallback = React.useMemo(
    () => createPassthroughBatchCallback(startTransitionImpl),
    [startTransitionImpl],
  );
  const startTransition = React.useCallback(
    (callback: TransitionFunction) => {
      runWithBatch(callback, batchCallback);
    },
    [startTransitionImpl],
  );

  return [isPending, startTransition];
}

function useTransitionCompatImpl17(): [boolean, StartTransitionFunction] {
  const [isPending, setIsPending] = React.useState(false);
  const startTransition = React.useCallback(
    (callback: TransitionFunction) => {
      batchReactUpdates(() => {
        enqueueStateUpdate(() => setIsPending(true));
        runWithBatch(() => {
          callback();
          enqueueStateUpdate(() => setIsPending(false));
        }, asyncBatchCallback);
      });
    },
    [setIsPending],
  );

  return [isPending, startTransition];
}

/**
 * The `startTransition` callback in the compatibility hook works a little differently from the built-in hook.
 * Even in React 18, only updates to `useStateCompat` or `useReducerCompat` values are marked as non-blocking.
 */
export const useTransitionCompat: () => [boolean, StartTransitionFunction] =
  typeof React.useTransition === 'undefined'
    ? useTransitionCompatImpl17
    : useTransitionCompatImpl18;
