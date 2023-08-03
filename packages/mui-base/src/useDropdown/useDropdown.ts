'use client';

import * as React from 'react';

import { DropdownActionTypes, DropdownState, UseDropdownParameters } from './useDropdown.types';

import type { DropdownContextValue } from './DropdownContext';
import { StateChangeCallback } from '../utils/useControllableReducer.types';
import dropdownReducer from './dropdownReducer';
import useControllableReducer from '../utils/useControllableReducer';

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
  const [popupId, setPopupId] = React.useState<string>('');
  const [triggerElement, setTriggerElement] = React.useState<HTMLElement | null>(null);
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
