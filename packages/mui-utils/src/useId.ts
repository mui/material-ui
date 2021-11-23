import * as React from 'react';

let globalId = 0;
function useIncrementingId(idOverride?: string): string | undefined {
  const [defaultId, setDefaultId] = React.useState(idOverride);
  const id = idOverride || defaultId;
  React.useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the incrementing value for client-side rendering only.
      // We can't use it server-side.
      // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
      globalId += 1;
      setDefaultId(`mui-${globalId}`);
    }
  }, [defaultId]);
  return id;
}

/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
export default function useReactId(idOverride?: string): string | undefined {
  // TODO: Remove `React as any` once `useId` is part of stable types.
  if ((React as any).useId !== undefined) {
    const reactId = (React as any).useId();
    return idOverride ?? reactId;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks -- `React.useId` is invariant at runtime.
  return useIncrementingId(idOverride);
}
