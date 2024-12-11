import * as React from 'react';
import {
  runWithBatch,
  blockingBatchCallback,
  enqueueStateUpdate,
} from '../CompatTransitionManager';

/**
 * Like `useReducer`, but for use with the compatibility version of `useTransition`.
 * TODO: Improve typing.
 */
export default function useReducerWithTransitions<T>(
  reducer: any,
  initializerArg: any,
  initializer?: any,
) {
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
