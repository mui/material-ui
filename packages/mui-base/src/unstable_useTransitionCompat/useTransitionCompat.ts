import * as React from 'react';
import {
  nonBlockingBatchCallback,
  BatchCallback,
  createPassthroughBatchCallback,
  enqueueStateUpdate,
  runWithBatch,
} from '../utils/CompatTransitionManager';

export type TransitionFunction = () => void | PromiseLike<void>;
export interface StartTransitionFunction {
  (callback: TransitionFunction): void;
}

interface TransitionStatePending {
  status: 'PENDING';
}
interface TransitionStateResolved {
  status: 'RESOLVED';
}
interface TransitionStateRejected {
  status: 'REJECTED';
  reason: any;
}
type TransitionState = TransitionStatePending | TransitionStateResolved | TransitionStateRejected;

/**
 * Shared implementation logic for the useTransitionCompat hooks.
 */
function useTransitionCompatImpl(batchCallback: BatchCallback): [boolean, StartTransitionFunction] {
  const pendingPromise = React.useRef<PromiseLike<void> | null>(null);
  const [state, setState] = React.useState<TransitionState>({ status: 'RESOLVED' });

  const onTransitionThen = (promise: PromiseLike<void> | null) => {
    if (pendingPromise.current === promise) {
      pendingPromise.current = null;
      runWithBatch(() => {
        enqueueStateUpdate(() => setState({ status: 'RESOLVED' }));
      }, batchCallback);
    }
  };
  const onTransitionCatch = (promise: PromiseLike<void> | null, reason: any) => {
    if (pendingPromise.current === promise) {
      pendingPromise.current = null;
      runWithBatch(() => {
        enqueueStateUpdate(() => setState({ status: 'REJECTED', reason }));
      }, batchCallback);
    }
  };

  const startTransition = React.useCallback(
    (callback: TransitionFunction) => {
      enqueueStateUpdate(() => setState({ status: 'PENDING' }));
      runWithBatch(() => {
        try {
          const res = callback();
          if (res != null && typeof res.then === 'function') {
            pendingPromise.current = res;
            res.then(onTransitionThen.bind(null, res), onTransitionCatch.bind(null, res));
          } else {
            pendingPromise.current = null;
            onTransitionThen(null);
          }
        } catch (error) {
          pendingPromise.current = null;
          onTransitionCatch(null, error);
        }
      }, batchCallback);
    },
    [setState, batchCallback],
  );

  switch (state.status) {
    case 'PENDING':
      return [true, startTransition];

    case 'RESOLVED':
      return [false, startTransition];

    case 'REJECTED':
      throw state.reason;
  }
}

function useTransitionCompatImpl18(): [boolean, StartTransitionFunction] {
  // TODO: On React 18 and higher, using the compat hook is unnecessary,
  // so we should display a warning. However, to ease the upgrade process,
  // we implement the same semantics as in the compat hook, i.e. only
  // updates to `useStateCompat` and `useReducerCompat` are marked as
  // non-blocking.
  const [isPendingImpl, startTransitionImpl] = React.useTransition();
  const batchCallback = React.useMemo(
    () => createPassthroughBatchCallback(startTransitionImpl),
    [startTransitionImpl],
  );
  const [isPending, startTransition] = useTransitionCompatImpl(batchCallback);
  // React 18 applications might adopt suspense, so we should be pending
  // as long as an async action is pending or the subsequent transition is.
  return [isPending || isPendingImpl, startTransition];
}

function useTransitionCompatImpl17(): [boolean, StartTransitionFunction] {
  return useTransitionCompatImpl(nonBlockingBatchCallback);
}

/**
 * The `startTransition` callback in the compatibility hook works a little differently from the built-in hook.
 * Even in React 18, only updates to `useStateCompat` or `useReducerCompat` values are marked as non-blocking.
 */
export const useTransitionCompat: () => [boolean, StartTransitionFunction] =
  typeof React.useTransition === 'undefined'
    ? useTransitionCompatImpl17
    : useTransitionCompatImpl18;
