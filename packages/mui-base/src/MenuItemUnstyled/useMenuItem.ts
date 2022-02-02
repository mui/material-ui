import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import { MenuUnstyledContext } from '../MenuUnstyled';
import { useButton } from '../ButtonUnstyled';

export interface UseMenuItemProps {
  component: React.ElementType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<any>;
  ref: React.Ref<any>;
}

export default function useMenuItem(props: UseMenuItemProps) {
  const { component, disabled = false, ref } = props;

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

    registerItem(id, { disabled, id, ref: itemRef });

    return () => unregisterItem(id);
  }, [id, registerItem, unregisterItem, disabled, ref]);

  const { getRootProps: getButtonProps } = useButton({
    component,
    ref: handleRef,
    disabled,
  });
  React.useDebugValue({ id, disabled });

  if (id === undefined) {
    return {
      getRootProps: (other?: Record<string, any>) => ({
        ...other,
        ...getButtonProps(other),
        role: 'menuitem',
      }),
      itemState: null,
    };
  }

  const itemState = menuContext.getItemState(id);

  return {
    getRootProps: (other?: Record<string, any>) => {
      const optionProps = menuContext.getItemProps(id, other);

      return {
        ...other,
        ...getButtonProps(other),
        tabIndex: optionProps.tabIndex,
        id: optionProps.id,
        role: 'menuitem',
      };
    },
    itemState,
  };
}
