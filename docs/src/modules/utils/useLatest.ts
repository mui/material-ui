import * as React from 'react';

/**
 * Returns the last defined value that has been passed in [value]
 */
export default function useLatest<T>(value: T | undefined): T | undefined {
  const latest = React.useRef(value);
  if (value !== undefined) {
    latest.current = value;
  }
  return latest.current;
}
