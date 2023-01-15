import * as React from 'react';

type AddUndefined<Value> = {
  [Property in keyof Value]: Value[Property] | undefined;
};

const usePreviousProps = <T>(value: T) => {
  const ref = React.useRef<T | {}>({});
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current as AddUndefined<T>;
};

export default usePreviousProps;
