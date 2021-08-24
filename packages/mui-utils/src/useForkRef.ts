import * as React from 'react';
import setRef from './setRef';

export default function useForkRef<Instance>(
  ...refs: Array<React.Ref<Instance> | null | undefined>
): React.Ref<Instance> | null {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (refValue) => {
      refs.forEach((ref) => {
        setRef(ref, refValue);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...refs]);
}
