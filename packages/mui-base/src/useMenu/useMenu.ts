'use client';
import * as React from 'react';
import {
  unstable_useForkRef as useForkRef,
  unstable_useId as useId,
  unstable_useEnhancedEffect as useEnhancedEffect,
} from '@mui/utils';
import { UseMenuListboxSlotProps, UseMenuParameters, UseMenuReturnValue } from './useMenu.types';
import { menuReducer } from './menuReducer';
import { DropdownContext, DropdownContextValue } from '../useDropdown/DropdownContext';
import { useList } from '../useList';
import { MenuItemMetadata } from '../useMenuItem';
import { DropdownActionTypes } from '../useDropdown';
import { EventHandlers } from '../utils';
import { useCompoundParent } from '../utils/useCompound';
import { MuiCancellableEvent } from '../utils/MuiCancellableEvent';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';

const FALLBACK_MENU_CONTEXT: DropdownContextValue = {
  dispatch: () => {},
  popupId: '',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: { open: true },
  triggerElement: null,
};

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenu API](https://mui.com/base-ui/react-menu/hooks-api/#use-menu)
 */
export function useMenu(parameters: UseMenuParameters = {}): UseMenuReturnValue {
  const { listboxRef: listboxRefProp, onItemsChange, id: idParam } = parameters;

  const rootRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(rootRef, listboxRefProp);

  const listboxId = useId(idParam) ?? '';

  const {
    state: { open },
    dispatch: menuDispatch,
    triggerElement,
    registerPopup,
  } = React.useContext(DropdownContext) ?? FALLBACK_MENU_CONTEXT;

  // store the initial open state to prevent focus stealing
  // (the first menu items gets focued only when the menu is opened by the user)
  const isInitiallyOpen = React.useRef(open);

  const { subitems, contextValue: compoundComponentContextValue } = useCompoundParent<
    string,
    MenuItemMetadata
  >();

  const subitemKeys = React.useMemo(() => Array.from(subitems.keys()), [subitems]);

  const getItemDomElement = React.useCallback(
    (itemId: string) => {
      if (itemId == null) {
        return null;
      }

      return subitems.get(itemId)?.ref.current ?? null;
    },
    [subitems],
  );

  const {
    dispatch: listDispatch,
    getRootProps: getListRootProps,
    contextValue: listContextValue,
    state: { highlightedValue },
    rootRef: mergedListRef,
  } = useList({
    disabledItemsFocusable: true,
    focusManagement: 'DOM',
    getItemDomElement,
    getInitialState: () => ({
      selectedValues: [],
      highlightedValue: null,
    }),
    isItemDisabled: (id) => subitems?.get(id)?.disabled || false,
    items: subitemKeys,
    getItemAsString: (id: string) =>
      subitems.get(id)?.label || subitems.get(id)?.ref.current?.innerText,
    rootRef: handleRef,
    onItemsChange,
    reducerActionContext: { listboxRef: rootRef },
    selectionMode: 'none',
    stateReducer: menuReducer,
  });

  useEnhancedEffect(() => {
    registerPopup(listboxId);
  }, [listboxId, registerPopup]);

  React.useEffect(() => {
    if (open && highlightedValue === subitemKeys[0] && !isInitiallyOpen.current) {
      subitems.get(subitemKeys[0])?.ref?.current?.focus();
    }
  }, [open, highlightedValue, subitems, subitemKeys]);

  React.useEffect(() => {
    // set focus to the highlighted item (but prevent stealing focus from other elements on the page)
    if (rootRef.current?.contains(document.activeElement) && highlightedValue !== null) {
      subitems?.get(highlightedValue)?.ref.current?.focus();
    }
  }, [highlightedValue, subitems]);

  const createHandleBlur =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent & MuiCancellableEvent) => {
      otherHandlers.onBlur?.(event);
      if (event.defaultMuiPrevented) {
        return;
      }

      if (
        rootRef.current?.contains(event.relatedTarget as HTMLElement) ||
        event.relatedTarget === triggerElement
      ) {
        return;
      }

      menuDispatch({
        type: DropdownActionTypes.blur,
        event,
      });
    };

  const createHandleKeyDown =
    (otherHandlers: EventHandlers) => (event: React.KeyboardEvent & MuiCancellableEvent) => {
      otherHandlers.onKeyDown?.(event);
      if (event.defaultMuiPrevented) {
        return;
      }

      if (event.key === 'Escape') {
        menuDispatch({
          type: DropdownActionTypes.escapeKeyDown,
          event,
        });
      }
    };

  const getOwnListboxHandlers = (otherHandlers: EventHandlers = {}) => ({
    onBlur: createHandleBlur(otherHandlers),
    onKeyDown: createHandleKeyDown(otherHandlers),
  });

  const getListboxProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseMenuListboxSlotProps => {
    const getCombinedRootProps = combineHooksSlotProps(getOwnListboxHandlers, getListRootProps);
    return {
      ...getCombinedRootProps(otherHandlers),
      id: listboxId,
      role: 'menu',
    };
  };

  React.useDebugValue({ subitems, highlightedValue });

  return {
    contextValue: {
      ...compoundComponentContextValue,
      ...listContextValue,
    },
    dispatch: listDispatch,
    getListboxProps,
    highlightedValue,
    listboxRef: mergedListRef,
    menuItems: subitems,
    open,
    triggerElement,
  };
}
