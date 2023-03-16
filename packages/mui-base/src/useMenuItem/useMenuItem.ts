import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import { EventHandlers } from '../utils/types';
import { MenuUnstyledContext } from '../MenuUnstyled';
import useButton from '../useButton';
import { UseMenuItemParameters } from './useMenuItem.types';
import useForcedRerendering from '../utils/useForcedRerendering';

/**
 *
 * Demos:
 *
 * - [Unstyled Menu](https://mui.com/base/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenuItem API](https://mui.com/base/react-menu/hooks-api/#use-menu-item)
 */
export default function useMenuItem(props: UseMenuItemParameters) {
  const { disabled = false, ref, label } = props;

  const id = useId();
  const menuContext = React.useContext(MenuUnstyledContext);

  const itemRef = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(itemRef, ref);

  if (menuContext === null) {
    throw new Error('MenuItemUnstyled must be used within a MenuUnstyled');
  }

  const { registerItem, unregisterItem, open, registerHighlightChangeHandler } = menuContext;

  React.useEffect(() => {
    if (id === undefined) {
      return undefined;
    }

    registerItem(id, { disabled, id, ref: itemRef, label });

    return () => unregisterItem(id);
  }, [id, registerItem, unregisterItem, disabled, ref, label]);

  const { getRootProps: getButtonProps, focusVisible } = useButton({
    disabled,
    focusableWhenDisabled: true,
    ref: handleRef,
  });

  // Ensure the menu item is focused when highlighted
  const [focusRequested, requestFocus] = React.useState(false);

  const focusIfRequested = React.useCallback(() => {
    if (focusRequested && itemRef.current != null) {
      itemRef.current.focus();
      requestFocus(false);
    }
  }, [focusRequested]);

  React.useEffect(() => {
    focusIfRequested();
  });

  React.useDebugValue({ id, disabled, label });

  const itemState = menuContext.getItemState(id ?? '');

  const { highlighted } = itemState ?? { highlighted: false };

  const rerender = useForcedRerendering();

  React.useEffect(() => {
    function updateHighlightedState(highlightedItemId: string | null) {
      if (highlightedItemId === id && !highlighted) {
        rerender();
      } else if (highlightedItemId !== id && highlighted) {
        rerender();
      }
    }

    return registerHighlightChangeHandler(updateHighlightedState);
  });

  React.useEffect(() => {
    // TODO: this should be handled by the MenuButton
    requestFocus(highlighted && open);
  }, [highlighted, open]);

  if (id === undefined) {
    return {
      getRootProps: (other?: EventHandlers) => ({
        ...other,
        ...getButtonProps(other),
        role: 'menuitem',
      }),
      disabled: false,
      focusVisible,
      highlighted: false,
    };
  }

  return {
    getRootProps: (other?: EventHandlers) => {
      const optionProps = menuContext.getItemProps(id, other);

      return {
        ...other,
        ...getButtonProps(other),
        tabIndex: optionProps.tabIndex,
        id: optionProps.id,
        role: 'menuitem',
      };
    },
    disabled: itemState?.disabled ?? false,
    focusVisible,
    highlighted,
  };
}
