'use client';
import * as React from 'react';
import setRef from '../setRef';

/**
 * Takes an array of refs and returns a new ref which will apply any modification to all of the refs.
 * This is useful when you want to have the ref used in multiple places.
 *
 * ```tsx
 * const rootRef = React.useRef<Instance>(null);
 * const refFork = useForkRef(rootRef, props.ref);
 *
 * return (
 *   <Root {...props} ref={refFork} />
 * );
 * ```
 *
 * @param {Array<React.Ref<Instance> | undefined>} refs The ref array.
 * @returns {React.RefCallback<Instance> | null} The new ref callback.
 */
export default function useForkRef<Instance>(
  ...refs: Array<React.Ref<Instance> | undefined>
): React.RefCallback<Instance> | null {
  /**
   * This will create a new function if the refs passed to this hook change and are all defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (instance) => {
      refs.forEach((ref) => {
        setRef(ref, instance);
      });
    };
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- intentionally ignoring that the dependency array must be an array literal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
