import * as React from 'react';
import {
  nonBlockingBatchCallback,
  BatchCallback,
  createPassthroughBatchCallback,
  enqueueStateUpdate,
  runWithBatch,
} from '../CompatTransitionManager';

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
 * Shared implementation logic for the `useTransition` hooks.
 */
function useTransitionImpl(batchCallback: BatchCallback): [boolean, StartTransitionFunction] {
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

  if (state.status === 'REJECTED') {
    throw state.reason;
  } else {
    return [state.status === 'PENDING', startTransition];
  }
}

function useTransition18(): [boolean, StartTransitionFunction] {
  // To ease the upgrade process, we implement the same semantics in
  // React 18 as React 17, i.e. only updates to `useStateWithTransitions`
  // and `useReducerWithTransitions` are marked as non-blocking.
  const [isPendingInternal, startTransitionInternal] = maybeReactUseTransition!();
  const batchCallback = React.useMemo(
    () => createPassthroughBatchCallback(startTransitionInternal),
    [startTransitionInternal],
  );
  const [isPending, startTransition] = useTransitionImpl(batchCallback);
  // React 18 applications might adopt suspense, so we should be pending
  // as long as an async action is pending or the subsequent transition is.
  return [isPending || isPendingInternal, startTransition];
}

function useTransition17(): [boolean, StartTransitionFunction] {
  return useTransitionImpl(nonBlockingBatchCallback);
}

// See https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379 for why
const safeReact = { ...React };
const maybeReactUseTransition: undefined | typeof React.useTransition = safeReact.useTransition;

/**
 * The `startTransition` callback in the compatibility hook works a little differently from the built-in hook.
 * Even in React 18, only updates to `useStateWithTransitions` and `useReducerWithTransitions` are marked as
 * non-blocking.
 */
const useTransition: () => [boolean, StartTransitionFunction] =
  typeof maybeReactUseTransition === 'undefined' ? useTransition17 : useTransition18;

export default useTransition;
