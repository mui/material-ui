import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { UseMenuButtonParameters, UseMenuButtonReturnValue } from './useMenuButton.types';
import MenuContext from '../useMenu/MenuContext';
import { MenuActionTypes } from '../useDropdownMenu/useDropdownMenu.types';
import useButton from '../useButton/useButton';
import { EventHandlers } from '../utils/types';
import MuiCancellableEvent from '../utils/muiCancellableEvent';
import combineHooksSlotProps from '../utils/combineHooksSlotProps';

/**
 *
 * API:
 *
 * - [useMenuButton API](https://mui.com/base-ui/api/use-menu-button/)
 */
export default function useMenuButton(
  parameters: UseMenuButtonParameters = {},
): UseMenuButtonReturnValue {
  const { disabled = false, focusableWhenDisabled, rootRef: externalRef } = parameters;

  const menuContext = React.useContext(MenuContext);
  if (menuContext === null) {
    throw new Error('useMenuButton: no menu context available.');
  }

  const { state, dispatch, registerTrigger, popupId } = menuContext;

  const {
    getRootProps: getButtonRootProps,
    rootRef: buttonRootRef,
    active,
  } = useButton({
    disabled,
    focusableWhenDisabled,
    rootRef: externalRef,
  });

  const setTriggerRef = React.useCallback(
    (element: HTMLElement | null) => {
      registerTrigger(element);
    },
    [registerTrigger],
  );

  const handleRef = useForkRef(buttonRootRef, setTriggerRef);

  const createHandleClick =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent & MuiCancellableEvent) => {
      otherHandlers.onClick?.(event);
      if (event.defaultMuiPrevented) {
        return;
      }

      dispatch({
        type: MenuActionTypes.toggle,
        event,
      });
    };

  const createHandleKeyDown =
    (otherHandlers: EventHandlers) => (event: React.KeyboardEvent & MuiCancellableEvent) => {
      otherHandlers.onKeyDown?.(event);
      if (event.defaultMuiPrevented) {
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        dispatch({
          type: MenuActionTypes.open,
          event,
        });
      }
    };

  const getOwnRootProps = (otherHandlers: EventHandlers = {}) => ({
    onClick: createHandleClick(otherHandlers),
    onKeyDown: createHandleKeyDown(otherHandlers),
  });

  const getRootProps = (otherHandlers: EventHandlers = {}) => {
    const getCombinedProps = combineHooksSlotProps(getButtonRootProps, getOwnRootProps);

    return {
      ...getCombinedProps(otherHandlers),
      'aria-haspopup': 'menu' as const,
      'aria-expanded': state.open,
      'aria-controls': popupId,
      ref: handleRef,
    };
  };

  return {
    active,
    getRootProps,
    open: state.open,
    rootRef: handleRef,
  };
}
