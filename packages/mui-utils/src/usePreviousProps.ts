import * as React from 'react';

type AddUndefined<T> = {
  [Property in keyof T]: T[Property] | undefined;
};

const usePreviousProps = <T>(value: T) => {
  const ref = React.useRef<T | {}>({});
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current as AddUndefined<T>;
};

export default usePreviousProps;
