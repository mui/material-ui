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

  // TODO rething approach. It is a temporal fix to allow tests that are rendering Popper to update the state using
  if (process.env.NODE_ENV === 'test') {
    return {
      canAutoFocus: true,
      onOpen: () => {},
    };
  }

  return {
    canAutoFocus,
    onOpen: () => setCanAutoFocus(true),
  };
}
