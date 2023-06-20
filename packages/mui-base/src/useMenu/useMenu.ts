import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { UseMenuListboxSlotProps, UseMenuParameters, UseMenuReturnValue } from './useMenu.types';
import menuReducer from './menuReducer';
import MenuContext, { MenuContextValue } from './MenuContext';
import useList from '../useList';
import { MenuItemMetadata } from '../useMenuItem';
import { MenuActionTypes } from '../useDropdownMenu';
import { EventHandlers } from '../utils';
import { useCompoundParent } from '../utils/useCompound';
import MuiCancellableEvent from '../utils/muiCancellableEvent';
import combineHooksSlotProps from '../utils/combineHooksSlotProps';

const FALLBACK_MENU_CONTEXT: MenuContextValue = {
  state: { open: true },
  dispatch: () => {},
  triggerElement: null,
  registerTrigger: () => {},
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
export default function useMenu(parameters: UseMenuParameters = {}): UseMenuReturnValue {
  const { listboxRef: listboxRefProp, onItemsChange } = parameters;

  const listboxRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(listboxRef, listboxRefProp);

  const {
    state: { open },
    dispatch: menuDispatch,
    triggerElement,
  } = React.useContext(MenuContext) ?? FALLBACK_MENU_CONTEXT;

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
    reducerActionContext: { listboxRef },
    selectionMode: 'none',
    stateReducer: menuReducer,
  });

  React.useEffect(() => {
    if (open && highlightedValue === subitemKeys[0]) {
      subitems.get(subitemKeys[0])?.ref?.current?.focus();
    }
  }, [open, highlightedValue, subitems, subitemKeys]);

  React.useEffect(() => {
    // set focus to the highlighted item (but prevent stealing focus from other elements on the page)
    if (listboxRef.current?.contains(document.activeElement) && highlightedValue !== null) {
      subitems?.get(highlightedValue)?.ref.current?.focus();
    }
  }, [highlightedValue, subitems]);

  const createHandleListboxBlur =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent & MuiCancellableEvent) => {
      otherHandlers.onBlur?.(event);
      if (event.defaultMuiPrevented) {
        return;
      }

      if (
        listboxRef.current?.contains(event.relatedTarget as HTMLElement) ||
        event.relatedTarget === triggerElement
      ) {
        return;
      }

      menuDispatch({
        type: MenuActionTypes.blur,
        event,
      });
    };

  const createHandleListboxKeyDown =
    (otherHandlers: EventHandlers) => (event: React.KeyboardEvent & MuiCancellableEvent) => {
      otherHandlers.onKeyDown?.(event);
      if (event.defaultMuiPrevented) {
        return;
      }

      if (event.key === 'Escape') {
        menuDispatch({
          type: MenuActionTypes.escapeKeyDown,
          event,
        });
      }
    };

  const getOwnListboxHandlers = (otherHandlers: EventHandlers = {}) => ({
    onBlur: createHandleListboxBlur(otherHandlers),
    onKeyDown: createHandleListboxKeyDown(otherHandlers),
  });

  const getListboxProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseMenuListboxSlotProps => {
    const getRootProps = combineHooksSlotProps(getOwnListboxHandlers, getListRootProps);
    return {
      ...getRootProps(otherHandlers),
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
  };
}
