import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import useList, {
  defaultListboxReducer,
  ActionTypes,
  ListActionAddOn,
  ListAction,
} from '../useList';
import {
  MenuInternalState,
  UseMenuListboxSlotProps,
  UseMenuParameters,
  UseMenuReturnValue,
} from './useMenu.types';
import { EventHandlers } from '../utils';
import { useCompoundParent } from '../utils/useCompound';
import { MenuItemMetadata } from '../useMenuItem';
import { StateChangeCallback } from '../utils/useControllableReducer.types';

/**
 *
 * Demos:
 *
 * - [Unstyled Menu](https://mui.com/base/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenu API](https://mui.com/base/react-menu/hooks-api/#use-menu)
 */
export default function useMenu(parameters: UseMenuParameters = {}): UseMenuReturnValue {
  const { defaultOpen, listboxRef: listboxRefProp, open: openProp, onOpenChange } = parameters;

  const listboxRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(listboxRef, listboxRefProp);

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

  const stateReducer = React.useCallback(
    (
      state: MenuInternalState,
      action: ListAction<string, MenuInternalState> & ListActionAddOn<string>,
    ): MenuInternalState => {
      if (action.type === ActionTypes.itemHover || action.type === ActionTypes.setState) {
        return state;
      }

      const newState = defaultListboxReducer(state, action);

      // make sure an item is always highlighted
      if (newState.highlightedValue === null && action.props.current!.items.length > 0) {
        return {
          ...newState,
          highlightedValue: action.props.current!.items[0],
        };
      }

      if (action.type === ActionTypes.keyDown) {
        if (action.event.key === 'Escape') {
          return {
            ...newState,
            open: false,
          };
        }
      }

      if (action.type === ActionTypes.blur) {
        if (!listboxRef.current?.contains(action.event.relatedTarget)) {
          return {
            ...newState,
            open: false,
          };
        }
      }

      return newState;
    },
    [],
  );

  const controlledState = React.useMemo(() => ({ open: openProp }), [openProp]);

  const stateChangeHandler: StateChangeCallback<MenuInternalState> = React.useCallback(
    (event, field, fieldValue, reason, state) => {
      if (field === 'open') {
        onOpenChange?.(fieldValue as boolean);

        if (state.highlightedValue !== null) {
          subitems.get(state.highlightedValue)?.ref.current?.focus();
        }
      }
    },
    [onOpenChange, subitems],
  );

  const {
    getRootProps,
    highlightedOption,
    contextValue: listContextValue,
    state: { open },
  } = useList<string, MenuInternalState>({
    controlledState,
    disabledItemsFocusable: true,
    focusManagement: 'DOM',
    getItemDomElement,
    getInitialState: () => ({
      selectedValues: [],
      highlightedValue: null,
      open: defaultOpen ?? false,
    }),
    isItemDisabled: (id) => subitems?.get(id)?.disabled || false,
    items: subitemKeys,
    itemStringifier: (id: string) =>
      subitems.get(id)?.label || subitems.get(id)?.ref.current?.innerText,
    listRef: handleRef,
    onStateChange: stateChangeHandler,
    selectionLimit: 0,
    stateReducer,
  });

  React.useEffect(() => {
    if (open && highlightedOption === subitemKeys[0]) {
      subitems.get(subitemKeys[0])?.ref?.current?.focus();
    }
  }, [open, highlightedOption, subitems, subitemKeys]);

  React.useEffect(() => {
    // set focus to the highlighted item (but prevent stealing focus from other elements on the page)
    if (listboxRef.current?.contains(document.activeElement) && highlightedOption !== null) {
      subitems?.get(highlightedOption)?.ref.current?.focus();
    }
  }, [highlightedOption, subitems]);

  const getListboxProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseMenuListboxSlotProps => {
    const rootProps = getRootProps(otherHandlers);
    return {
      ...otherHandlers,
      ...rootProps,
      role: 'menu',
    };
  };

  React.useDebugValue({ subitems, highlightedOption });

  return {
    contextValue: {
      ...compoundComponentContextValue,
      ...listContextValue,
    },
    getListboxProps,
    highlightedOption,
    // TODO: remove
    highlightFirstItem: () => {},
    highlightLastItem: () => {},
    menuItems: subitems,
    open,
  };
}
