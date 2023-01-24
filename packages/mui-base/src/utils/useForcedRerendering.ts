import * as React from 'react';

export default function useForcedRerendering() {
  const [, setState] = React.useState({});

  return React.useCallback(() => {
    setState({});
  }, []);
}
