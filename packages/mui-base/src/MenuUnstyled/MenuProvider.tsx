import * as React from 'react';
import { unstable_useControlled as useControlled } from '@mui/utils';

export interface MenuContextValue {
  open: boolean;
  setOpen: (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
    open: boolean,
  ) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  setButtonElement: (element: HTMLButtonElement | null) => void;
}

export const MenuContext = React.createContext<MenuContextValue | null>(null);

export interface MenuProviderProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
    open: boolean,
  ) => void;
}

export default function MenuProvider(props: MenuProviderProps) {
  const { children, open: openProp, onOpenChange } = props;

  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: 'MenuProvider',
  });

  const setOpen = React.useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
      open: boolean,
    ) => {
      setOpenState(open);
      onOpenChange?.(event, open);
    },
    [setOpenState, onOpenChange],
  );

  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const setButtonElement = React.useCallback((element: HTMLButtonElement | null) => {
    buttonRef.current = element;
  }, []);

  React.useEffect(() => {
    if (!openState) {
      buttonRef.current?.focus();
    }
  }, [openState]);

  const contextValue: MenuContextValue = React.useMemo(
    () => ({
      buttonRef,
      open: openState,
      setOpen,
      setButtonElement,
    }),
    [openState, setOpen, setButtonElement],
  );

  return <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>;
}
