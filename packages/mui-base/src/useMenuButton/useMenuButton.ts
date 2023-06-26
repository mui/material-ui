import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { EventHandlers } from '../utils';
import MuiCancellableEvent from '../utils/muiCancellableEvent';
import { UseMenuButtonParameters, UseMenuButtonReturnValue } from './useMenuButton.types';
import MenuContext from '../useMenu/MenuContext';
import { MenuActionTypes } from '../useDropdownMenu/useDropdownMenu.types';
/**
 *
 * API:
 *
 * - [useMenuButton API](https://mui.com/base-ui/api/use-menu-button/)
 */
export default function useMenuButton(
  parameters: UseMenuButtonParameters = {},
): UseMenuButtonReturnValue {
  const { rootRef: externalRef } = parameters;

  const menuContext = React.useContext(MenuContext);
  if (menuContext === null) {
    throw new Error('useMenuButton: no menu context available.');
  }

  const { state, dispatch, registerTrigger, popupId } = menuContext;

  const setTriggerRef = React.useCallback(
    (element: HTMLElement | null) => {
      registerTrigger(element);
    },
    [registerTrigger],
  );

  const handleRef = useForkRef(externalRef, setTriggerRef);

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

  const getRootProps = (otherHandlers: EventHandlers = {}) => ({
    'aria-haspopup': 'menu' as const,
    'aria-expanded': state.open,
    'aria-controls': popupId,
    onClick: createHandleClick(otherHandlers),
    ref: handleRef,
  });

  return {
    getRootProps,
    open: state.open,
    rootRef: handleRef,
  };
}
