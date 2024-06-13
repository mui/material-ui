'use client';
import * as React from 'react';
import type { DropdownContextValue } from './DropdownContext';
import { useControllableReducer } from '../utils/useControllableReducer';
import { StateChangeCallback } from '../utils/useControllableReducer.types';
import { DropdownActionTypes, DropdownState, UseDropdownParameters } from './useDropdown.types';
import { dropdownReducer } from './dropdownReducer';

/**
 *
 * Demos:
 *
 * - [Menu](https://next.mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useDropdown API](https://next.mui.com/base-ui/react-menu/hooks-api/#use-dropdown)
 */
export function useDropdown(parameters: UseDropdownParameters = {}) {
  const { defaultOpen, onOpenChange, open: openProp, componentName = 'useDropdown' } = parameters;
  const [popupId, setPopupId] = React.useState<string>('');
  const [triggerElement, setTriggerElement] = React.useState<HTMLElement | null>(null);
  const lastActionType = React.useRef<string | null>(null);

  const handleStateChange: StateChangeCallback<DropdownState> = React.useCallback(
    (event, field, value, reason) => {
      if (field === 'open') {
        onOpenChange?.(
          event as React.MouseEvent | React.KeyboardEvent | React.FocusEvent,
          value as boolean,
        );
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
    initialState: defaultOpen
      ? { open: true, changeReason: null }
      : { open: false, changeReason: null },
    onStateChange: handleStateChange,
    reducer: dropdownReducer,
    componentName,
  });

  React.useEffect(() => {
    if (
      !state.open &&
      lastActionType.current !== null &&
      lastActionType.current !== DropdownActionTypes.blur
    ) {
      triggerElement?.focus();
    }
  }, [state.open, triggerElement]);

  const contextValue: DropdownContextValue = {
    state,
    dispatch,
    popupId,
    registerPopup: setPopupId,
    registerTrigger: setTriggerElement,
    triggerElement,
  };

  return {
    contextValue,
    open: state.open,
  };
}
