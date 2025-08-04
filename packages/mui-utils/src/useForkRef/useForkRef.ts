'use client';
import * as React from 'react';

/**
 * Merges refs into a single memoized callback ref or `null`.
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
  const cleanupRef = React.useRef<void | (() => void)>(undefined);

  const refEffect = React.useCallback((instance: Instance | null) => {
    const cleanups = refs.map((ref) => {
      if (ref == null) {
        return null;
      }

      if (typeof ref === 'function') {
        const refCallback = ref;
        const refCleanup: void | (() => void) = refCallback(instance);
        return typeof refCleanup === 'function'
          ? refCleanup
          : () => {
              refCallback(null);
            };
      }

      (ref as React.RefObject<Instance | null>).current = instance;
      return () => {
        (ref as React.RefObject<Instance | null>).current = null;
      };
    });

    return () => {
      cleanups.forEach((refCleanup) => refCleanup?.());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);

  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (value) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        (cleanupRef as React.RefObject<void | (() => void)>).current = undefined;
      }

      if (value != null) {
        (cleanupRef as React.RefObject<void | (() => void)>).current = refEffect(value);
      }
    };
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- intentionally ignoring that the dependency array must be an array literal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
