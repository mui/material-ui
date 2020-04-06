import * as React from 'react';

/**
 * Private module reserved for @material-ui/x packages.
 */
export default function useId(idOverride) {
  const [id, setId] = React.useState(idOverride);
  React.useEffect(() => {
    if (idOverride == null) {
      // Fallback to this default id when possible.
      // Use the random value for client-side rendering only.
      // We can't use it server-side.
      setId(`mui-${Math.round(Math.random() * 1e5)}`);
    }
  }, [idOverride]);
  return id;
}
