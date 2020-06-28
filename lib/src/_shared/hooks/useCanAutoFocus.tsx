import * as React from 'react';

export const CanAutoFocusContext = React.createContext(true);

export const useCanAutoFocus = () => React.useContext(CanAutoFocusContext);

export function useAutoFocusControl(open: boolean) {
  const [canAutoFocus, setCanAutoFocus] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setCanAutoFocus(false);
    }
  }, [open]);

  return {
    canAutoFocus,
    onOpen: React.useCallback(() => setCanAutoFocus(true), []),
  };
}
