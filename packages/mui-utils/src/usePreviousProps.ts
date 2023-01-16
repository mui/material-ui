import * as React from 'react';

type PartialProps<T> = {
  [Property in keyof T]?: T[Property];
};

const usePreviousProps = <T>(value: T) => {
  const ref = React.useRef<T | {}>({});
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current as PartialProps<T>;
};

export default usePreviousProps;
