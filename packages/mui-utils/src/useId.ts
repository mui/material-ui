import * as React from 'react';

function useRandomId(idOverride?: string): string | undefined {
  const [defaultId, setDefaultId] = React.useState(idOverride);
  const id = idOverride || defaultId;
  React.useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the random value for client-side rendering only.
      // We can't use it server-side.
      setDefaultId(`mui-${Math.round(Math.random() * 1e9)}`);
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
  return useRandomId(idOverride);
}
