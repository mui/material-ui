'use client';
import useEnhancedEffect from '../useEnhancedEffect/useEnhancedEffect';
import useLazyRef from '../useLazyRef/useLazyRef';

interface ValueRef<T> {
  current: T;
  next: T;
  effect: () => void;
}

/**
 * Copied from `@base-ui/utils/useValueAsRef`.
 *
 * Untracks the provided value by turning it into a ref to remove its reactivity.
 *
 * Used to access the passed value inside effects without causing those effects to re-run when the
 * value changes.
 */
export default function useValueAsRef<T>(value: T) {
  const latest = useLazyRef(() => createValueRef(value)).current;
  latest.next = value;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEnhancedEffect(latest.effect);

  return latest;
}

function createValueRef<T>(value: T): ValueRef<T> {
  const latest: ValueRef<T> = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next;
    },
  };

  return latest;
}
