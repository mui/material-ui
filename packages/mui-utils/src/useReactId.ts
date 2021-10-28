import * as React from 'react';
import useId from './useId';

/**
 *
 * @example <div id={useId} />
 * @param idOverride
 * @returns {string} Can only be passed to props
 */
export default function useReactId(idOverride?: string): string | undefined {
  if ((React as any).unstable_useId !== undefined) {
    const reactId = (React as any).unstable_useId();
    return idOverride ?? reactId;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks -- `React.unstable_useId` is invariant at runtime.
  return useId(idOverride);
}
