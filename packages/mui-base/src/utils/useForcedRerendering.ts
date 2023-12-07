'use client';
import * as React from 'react';
/**
 * @ignore - internal hook.
 */
export function useForcedRerendering() {
  const [, setState] = React.useState({});

  return React.useCallback(() => {
    setState({});
  }, []);
}
