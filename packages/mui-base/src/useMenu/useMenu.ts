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
import { ListActionTypes, useList } from '../useList';
import { MenuItemMetadata } from '../useMenuItem';
import { DropdownActionTypes } from '../useDropdown';
import { EventHandlers } from '../utils/types';
import { useCompoundParent } from '../useCompound';
import { MuiCancellableEvent } from '../utils/MuiCancellableEvent';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';
import { extractEventHandlers } from '../utils/extractEventHandlers';

const FALLBACK_MENU_CONTEXT: DropdownContextValue = {
  dispatch: () => {},
  popupId: '',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: { open: true, changeReason: null },
  triggerElement: null,
};

/**
 *
 * Demos:
 *
 * - [Menu](https://next.mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenu API](https://next.mui.com/base-ui/react-menu/hooks-api/#use-menu)
 */
export function useMenu(parameters: UseMenuParameters = {}): UseMenuReturnValue {
  const {
    listboxRef: listboxRefProp,
    onItemsChange,
    id: idParam,
    disabledItemsFocusable = true,
    disableListWrap = false,
    autoFocus = true,
    componentName = 'useMenu',
  } = parameters;

  const rootRef = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(rootRef, listboxRefProp);

  const listboxId = useId(idParam) ?? '';

  const {
    state: { open, changeReason },
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

  const isItemDisabled = React.useCallback(
    (id: string) => subitems?.get(id)?.disabled || false,
    [subitems],
  );

  const getItemAsString = React.useCallback(
    (id: string) => subitems.get(id)?.label || subitems.get(id)?.ref.current?.innerText,
    [subitems],
  );

  const reducerActionContext = React.useMemo(() => ({ listboxRef: rootRef }), [rootRef]);

  const {
    dispatch: listDispatch,
    getRootProps: getListRootProps,
    contextValue: listContextValue,
    state: { highlightedValue },
    rootRef: mergedListRef,
  } = useList({
    disabledItemsFocusable,
    disableListWrap,
    focusManagement: 'DOM',
    getItemDomElement,
    getInitialState: () => ({
      selectedValues: [],
      highlightedValue: null,
    }),
    isItemDisabled,
    items: subitemKeys,
    getItemAsString,
    rootRef: handleRef,
    onItemsChange,
    reducerActionContext,
    selectionMode: 'none',
    stateReducer: menuReducer,
    componentName,
  });

  useEnhancedEffect(() => {
    registerPopup(listboxId);
  }, [listboxId, registerPopup]);

  useEnhancedEffect(() => {
    if (
      open &&
      changeReason?.type === 'keydown' &&
      (changeReason as React.KeyboardEvent).key === 'ArrowUp'
    ) {
      listDispatch({
        type: ListActionTypes.highlightLast,
        event: changeReason as React.KeyboardEvent,
      });
    }
  }, [open, changeReason, listDispatch]);

  React.useEffect(() => {
    if (open && autoFocus && highlightedValue && !isInitiallyOpen.current) {
      subitems.get(highlightedValue)?.ref?.current?.focus();
    }
  }, [open, autoFocus, highlightedValue, subitems, subitemKeys]);

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

  const getListboxProps = <ExternalProps extends Record<string, unknown>>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseMenuListboxSlotProps => {
    const getCombinedRootProps = combineHooksSlotProps(getOwnListboxHandlers, getListRootProps);
    const externalEventHandlers = extractEventHandlers(externalProps);
    return {
      ...externalProps,
      ...externalEventHandlers,
      ...getCombinedRootProps(externalEventHandlers),
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
