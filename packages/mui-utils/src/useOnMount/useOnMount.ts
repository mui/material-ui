'use client';
import * as React from 'react';

const EMPTY = [] as unknown[];

/**
 * A React.useEffect equivalent that runs once, when the component is mounted.
 */
export default function useOnMount(fn: React.EffectCallback) {
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(fn, EMPTY);
  /* eslint-enable react-hooks/exhaustive-deps */
}
