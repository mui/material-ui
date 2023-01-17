import * as React from 'react';

export default function useLatest<T>(value: T, deps: React.DependencyList) {
  const ref = React.useRef<T>(value);

  React.useEffect(() => {
    ref.current = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
