import React from 'react';
import setRef from './setRef';

export default function useForkRef(refA, refB) {
  /**
   * This will create a new function if the ref props change.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return React.useCallback(
    refValue => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    },
    [refA, refB],
  );
}
