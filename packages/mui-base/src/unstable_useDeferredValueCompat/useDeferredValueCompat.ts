import * as React from 'react';
import {
  nonBlockingBatchCallback,
  enqueueStateUpdate,
  runWithBatch,
} from '../utils/CompatTransitionManager';

function useDeferredValueCompatImpl18<T>(value: T): T {
  // TODO: On React 18 and higher, using the compat hook is unnecessary,
  // so we should display a warning.
  return React.useDeferredValue(value);
}

function useDeferredValueCompatImpl17<T>(value: T): T {
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

export const useDeferredValueCompat =
  typeof React.useDeferredValue === 'undefined'
    ? useDeferredValueCompatImpl17
    : useDeferredValueCompatImpl18;
