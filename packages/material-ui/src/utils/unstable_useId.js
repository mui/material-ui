import * as React from 'react';

/**
 * Private module reserved for @material-ui/x packages.
 */
export default function useId(idOverride) {
  const [defaultId, setDefaultId] = React.useState(idOverride);
  const id = idOverride || defaultId;
  React.useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the random value for client-side rendering only.
      // We can't use it server-side.
      setDefaultId(`mui-${Math.round(Math.random() * 1e5)}`);
    }
  }, [defaultId]);
  return id;
}
