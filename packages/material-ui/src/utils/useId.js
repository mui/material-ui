import * as React from 'react';

/**
 * Private module reserved for @material-ui/x packages.
 */
export default function useId(idProp, skipDoubleRender) {
  const [defaultId, setDefaultId] = React.useState();
  const id = idProp || defaultId;
  React.useEffect(() => {
    if (skipDoubleRender || defaultId) {
      return;
    }

    // Fallback to this default id when possible.
    // Use the random value for client-side rendering only.
    // We can't use it server-side.
    setDefaultId(`${Math.round(Math.random() * 1e5)}`);
  }, [skipDoubleRender, defaultId]);
  return id;
}
