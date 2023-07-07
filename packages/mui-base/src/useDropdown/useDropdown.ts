import * as React from 'react';
import { type DropdownContextValue } from './DropdownContext';
import useControllableReducer from '../utils/useControllableReducer';
import { StateChangeCallback } from '../utils/useControllableReducer.types';
import { DropdownActionTypes, DropdownState, UseDropdownParameters } from './useDropdown.types';
import dropdownReducer from './dropdownReducer';

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useDropdown API](https://mui.com/base-ui/react-menu/hooks-api/#use-dropdown)
 */
export default function useDropdown(parameters: UseDropdownParameters = {}) {
  const { defaultOpen, onOpenChange, open: openProp } = parameters;
  const triggerElementRef = React.useRef<HTMLElement | null>(null);
  const lastActionType = React.useRef<string | null>(null);

  const handleStateChange: StateChangeCallback<DropdownState> = React.useCallback(
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
    reducer: dropdownReducer,
  });

  React.useEffect(() => {
    if (
      !state.open &&
      lastActionType.current !== null &&
      lastActionType.current !== DropdownActionTypes.blur
    ) {
      triggerElementRef.current?.focus();
    }
  }, [state.open]);

  const registerTrigger = React.useCallback((element: HTMLElement | null) => {
    triggerElementRef.current = element;
  }, []);

  const [popupId, setPopupId] = React.useState<string>('');

  const contextValue: DropdownContextValue = {
    state,
    dispatch,
    popupId,
    registerPopup: setPopupId,
    registerTrigger,
    triggerElement: triggerElementRef.current,
  };

  return {
    contextValue,
    open: state.open,
  };
}
