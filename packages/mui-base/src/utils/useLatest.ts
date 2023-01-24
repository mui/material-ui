import * as React from 'react';

/**
 * Initializes a ref with the given value and updates it when the value changes.
 *
 * @param value Value to store in the ref
 * @param deps An optional array of dependencies to watch for changes. If not provided, the ref will be updated each time the `value` changes.
 * @returns A React.RefObject containing the latest value
 */
export default function useLatest<T>(value: T, deps?: React.DependencyList) {
  const ref = React.useRef<T>(value);

  React.useEffect(() => {
    ref.current = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ?? [value]);

  return ref;
}
