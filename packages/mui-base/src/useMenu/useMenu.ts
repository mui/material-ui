import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import useList, {
  defaultListboxReducer,
  ListState,
  ActionTypes,
  ListReducerAction,
} from '../useList';
import { UseMenuListboxSlotProps, UseMenuParameters, UseMenuReturnValue } from './useMenu.types';
import { EventHandlers } from '../utils';
import { useCompoundParent } from '../utils/useCompound';
import { MenuItemMetadata } from '../useMenuItem';

function stateReducer(
  state: ListState<string>,
  action: ListReducerAction<string>,
): ListState<string> {
  if (
    action.type === ActionTypes.blur ||
    action.type === ActionTypes.itemHover ||
    action.type === ActionTypes.setValue
  ) {
    return state;
  }

  const newState = defaultListboxReducer(state, action);

  if (
    action.type !== ActionTypes.setHighlight &&
    newState.highlightedValue === null &&
    action.props.items.length > 0
  ) {
    return {
      ...newState,
      highlightedValue: action.props.items[0],
    };
  }

  return newState;
}
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
  const { listboxRef: listboxRefProp, open = false, onClose, listboxId } = parameters;

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

  const {
    getRootProps,
    highlightedOption,
    setHighlightedValue: setListboxHighlight,
    contextValue: listContextValue,
  } = useList({
    disabledItemsFocusable: true,
    focusManagement: 'DOM',
    getItemDomElement,
    id: listboxId,
    isItemDisabled: (id) => subitems?.get(id)?.disabled || false,
    items: subitemKeys,
    itemStringifier: (id: string) =>
      subitems.get(id)?.label || subitems.get(id)?.ref.current?.innerText,
    listRef: handleRef,
    selectionLimit: 0,
    stateReducer,
  });

  const highlightFirstItem = React.useCallback(() => {
    if (subitems.size > 0) {
      setListboxHighlight(subitems.get(Array.from(subitems.keys())[0])!.id);
    }
  }, [subitems, setListboxHighlight]);

  const highlightLastItem = React.useCallback(() => {
    if (subitems.size > 0) {
      setListboxHighlight(subitems.get(Array.from(subitems.keys())[subitems.size - 1])!.id);
    }
  }, [subitems, setListboxHighlight]);

  React.useEffect(() => {
    if (open) {
      // TODO: ignore disabled items
      highlightFirstItem();
      subitems.get(subitemKeys[0])?.ref?.current?.focus();
    }
  }, [open, highlightFirstItem, subitems, subitemKeys]);

  const createHandleKeyDown = (otherHandlers: EventHandlers) => (e: React.KeyboardEvent) => {
    otherHandlers.onKeyDown?.(e);
    if (e.defaultPrevented) {
      return;
    }

    if (e.key === 'Escape' && open) {
      onClose?.();
    }
  };

  const createHandleBlur = (otherHandlers: EventHandlers) => (e: React.FocusEvent) => {
    otherHandlers.onBlur?.(e);

    if (!listboxRef.current?.contains(e.relatedTarget)) {
      onClose?.();
    }
  };

  React.useEffect(() => {
    // set focus to the highlighted item (but prevent stealing focus from other elements on the page)
    if (listboxRef.current?.contains(document.activeElement) && highlightedOption !== null) {
      subitems?.get(highlightedOption)?.ref.current?.focus();
    }
  }, [highlightedOption, subitems]);

  const getListboxProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseMenuListboxSlotProps => {
    const rootProps = getRootProps({
      ...otherHandlers,
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers),
    });
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
    highlightFirstItem,
    highlightLastItem,
    menuItems: subitems,
  };
}
