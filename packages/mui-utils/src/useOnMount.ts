import * as React from 'react';

const EMPTY = [] as unknown[];

/**
 * A React.useEffect equivalent that runs once, when the component is mounted.
 */
export function useOnMount(fn: React.EffectCallback) {
  // eslint-disable-next-lines react-hooks/exhaustive-deps
  React.useEffect(fn, EMPTY);
}
