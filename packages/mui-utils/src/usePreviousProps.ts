import * as React from 'react';

const usePreviousProps = (value: object): object => {
  const ref = React.useRef({});
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePreviousProps;
