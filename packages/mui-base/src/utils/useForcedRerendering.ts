import * as React from 'react';
/**
 * @ignore - internal hook.
 */
export default function useForcedRerendering() {
  const [, setState] = React.useState({});

  return React.useCallback(() => {
    setState({});
  }, []);
}
