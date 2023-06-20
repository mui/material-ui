import * as React from 'react';
import { type MenuContextValue } from '../useMenu/MenuContext';
import useControllableReducer from '../utils/useControllableReducer';
import { StateChangeCallback } from '../utils/useControllableReducer.types';
import { MenuActionTypes, MenuOpenState, UseDropdownMenuParameters } from './useDropdownMenu.types';
import dropdownMenuReducer from './dropdownMenuReducer';

/**
 *
 * API:
 *
 * - [useDropdownMenu API](https://mui.com/base-ui/api/use-dropdown-menu/)
 */
export default function useDropdownMenu(parameters: UseDropdownMenuParameters = {}) {
  const { defaultOpen, onOpenChange, open: openProp } = parameters;
  const triggerElementRef = React.useRef<HTMLElement | null>(null);
  const lastActionType = React.useRef<string | null>(null);

  const handleStateChange: StateChangeCallback<MenuOpenState> = React.useCallback(
    (event, field, value, reason) => {
      if (field === 'open') {
        onOpenChange?.(event as React.MouseEvent | React.KeyboardEvent | React.FocusEvent, value);
      }

      lastActionType.current = reason;
    },
    [onOpenChange],
  );

  const controlledProps = React.useMemo(
    () => (openProp !== undefined ? { open: openProp } : {}),
    [openProp],
  );

  const [state, dispatch] = useControllableReducer({
    controlledProps,
    initialState: defaultOpen ? { open: true } : { open: false },
    onStateChange: handleStateChange,
    reducer: dropdownMenuReducer,
  });

  React.useEffect(() => {
    if (!state.open && lastActionType.current !== MenuActionTypes.blur) {
      triggerElementRef.current?.focus();
    }
  }, [state.open]);

  const registerTrigger = React.useCallback((element: HTMLElement | null) => {
    triggerElementRef.current = element;
  }, []);

  const contextValue: MenuContextValue = {
    state,
    dispatch,
    registerTrigger,
    triggerElement: triggerElementRef.current,
  };

  return {
    contextValue,
  };
}
