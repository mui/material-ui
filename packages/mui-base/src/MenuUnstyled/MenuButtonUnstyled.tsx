import * as React from 'react';
import {
  // unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import { useSlotProps } from '../utils';

export interface MenuButtonProps {
  className?: string;
  label?: string;
  open?: boolean;
  onOpenChange?: (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
    open: boolean,
  ) => void;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  slots?: {
    root?: React.ElementType;
  };
  slotProps?: {
    root?: React.HTMLAttributes<HTMLButtonElement>;
  };
}

interface MenuButtonContextState {
  open: boolean;
}

export const MenuButtonContext = React.createContext<MenuButtonContextState | null>(null);

const MenuButton = React.forwardRef(function MenuButton(
  props: MenuButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const {
    children,
    label,
    open: openProp,
    defaultOpen,
    onOpenChange,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const focusableElement = React.useRef<HTMLElement | null>(null);

  const [isOpen, setOpen] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: 'MenuButton',
  });

  const contextValue = React.useMemo(() => ({ open: isOpen }), [isOpen]);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpen((open) => {
        return !open;
      });

      onOpenChange?.(event, !isOpen);
    },
    [isOpen, setOpen, onOpenChange],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setOpen(true);
        onOpenChange?.(event, true);
      }
    },
    [setOpen, onOpenChange],
  );

  React.useEffect(() => {
    if (isOpen) {
      focusableElement.current?.focus();
    }
  }, [isOpen]);

  const Root = slots.root || 'button';
  const rootProps = useSlotProps({
    elementType: Root,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    ownerState: { ...props, open: isOpen },
  });

  return (
    <MenuButtonContext.Provider value={contextValue}>
      <Root {...rootProps}>{label}</Root>
      {children}
    </MenuButtonContext.Provider>
  );
});

export default MenuButton;
