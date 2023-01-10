import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { useSlotProps } from '../utils';
import { MenuContext } from './MenuProvider';

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

  const menuContext = React.useContext(MenuContext);
  if (!menuContext) {
    throw new Error('MenuButtonUnstyled must be placed within a MenuProvider');
  }

  const { open: isOpen, setOpen } = menuContext;

  const updateButtonRef = React.useCallback(
    (element: HTMLButtonElement | null) => {
      menuContext.setButtonElement(element);
    },
    [menuContext],
  );

  const handleRef = useForkRef(updateButtonRef, ref);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => setOpen(event, !isOpen),
    [isOpen, setOpen],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setOpen(event, true);
      }
    },
    [setOpen],
  );

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

  return <Root {...rootProps}>{children}</Root>;
});

export default MenuButton;
