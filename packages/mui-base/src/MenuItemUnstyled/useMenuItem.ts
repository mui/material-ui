import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import { MenuUnstyledContext } from '../MenuUnstyled';

export interface UseMenuItemProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<any>;
  ref: React.Ref<any>;
}

export default function useMenuItem(props: UseMenuItemProps) {
  const { disabled = false, onClick, ref } = props;

  const id = useId();
  const menuContext = React.useContext(MenuUnstyledContext);

  const itemRef = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(itemRef, ref);

  if (menuContext === null) {
    throw new Error('MenuItemUnstyled must be used within a MenuUnstyled');
  }

  const { registerItem, unregisterItem } = menuContext;

  React.useEffect(() => {
    if (id === undefined) {
      return undefined;
    }

    registerItem(id, { disabled, id, onClick, ref: itemRef });

    return () => unregisterItem(id);
  }, [id, registerItem, unregisterItem, disabled, onClick, ref]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (disabled) {
      return;
    }

    onClick?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      itemRef.current?.click();
    }
  };

  React.useDebugValue({ id, disabled });

  if (id === undefined) {
    return null;
  }

  const itemState = menuContext.getItemState(id);
  const itemProps = menuContext.getItemProps(id, {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  });

  return {
    getRootProps: (other?: Record<string, any>) => ({
      ...itemProps,
      role: 'menuitem',
      'aria-disabled': disabled || undefined,
      'aria-selected': undefined,
      ...other,
      ref: handleRef,
    }),
    itemState,
  };
}
