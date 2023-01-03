import * as React from 'react';
import {
  unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import { useSlotProps } from '../utils';

export interface MenuButtonProps {
  className?: string;
  open?: boolean;
  onOpenChange?: (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
    open: boolean,
  ) => void;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  popup?: React.ReactNode;
  slots?: {
    root?: React.ElementType;
  };
  slotProps?: {
    root?: React.HTMLAttributes<HTMLButtonElement>;
  };
}

interface MenuTriggerContextValue {
  open: boolean;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export const MenuTriggerContext = React.createContext<MenuTriggerContextValue | null>(null);

const MenuButton = React.forwardRef(function MenuButton(
  props: MenuButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const {
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    popup,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const [isOpen, setOpen] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: 'MenuButton',
  });

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const contextValue: MenuTriggerContextValue = React.useMemo(
    () => ({ open: isOpen, buttonRef }),
    [isOpen, buttonRef],
  );

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
    if (!isOpen) {
      buttonRef.current?.focus();
    }
  }, [isOpen]);

  const Root = slots.root || 'button';
  const rootProps = useSlotProps({
    elementType: Root,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: handleRef,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    ownerState: { ...props, open: isOpen },
  });

  return (
    <MenuTriggerContext.Provider value={contextValue}>
      <Root {...rootProps}>{children}</Root>
      {popup}
    </MenuTriggerContext.Provider>
  );
});

export default MenuButton;
