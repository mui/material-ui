import * as React from 'react';
import {
  nonBlockingBatchCallback,
  enqueueStateUpdate,
  runWithBatch,
} from '../CompatTransitionManager';

function useDeferredValue17<T>(value: T): T {
  // React 17 doesn't support concurrent rendering. We simulate the behavior
  // by only updating to the current value when the previous one is committed.
  const [currentValue, setCurrentValue] = React.useState(value);

  React.useEffect(() => {
    if (value !== currentValue) {
      return runWithBatch(
        () => enqueueStateUpdate(() => setCurrentValue(value)),
        nonBlockingBatchCallback,
      );
    }
  }, [value, currentValue]);

  return currentValue;
}

// See https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379 for why
const safeReact = { ...React };
const maybeReactUseDeferredValue: undefined | typeof React.useDeferredValue =
  safeReact.useDeferredValue;

const useDeferredValue =
  typeof maybeReactUseDeferredValue === 'undefined'
    ? useDeferredValue17
    : maybeReactUseDeferredValue;

export default useDeferredValue;
