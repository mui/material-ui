import React from 'react';

export default function useSynchronousEffect(func, values) {
  const key = React.useRef([]);
  let output;

  // Store "generation" key. Just returns a new object every time
  const currentKey = React.useMemo(() => ({}), values); // eslint-disable-line react-hooks/exhaustive-deps

  // "the first render", or "memo dropped the value"
  if (key.current !== currentKey) {
    key.current = currentKey;
    output = func();
  }

  React.useEffect(
    () => () => {
      if (output) {
        output();
      }
    },
    [currentKey], // eslint-disable-line react-hooks/exhaustive-deps
  );
}
