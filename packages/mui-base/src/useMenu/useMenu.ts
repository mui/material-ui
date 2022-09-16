import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import {
  defaultListboxReducer,
  ListboxAction,
  ListboxState,
  useListbox,
  ActionTypes,
} from '@mui/base/useListbox';
import {
  MenuItemMetadata,
  MenuItemState,
  UseMenuListboxSlotProps,
  UseMenuParameters,
} from './useMenu.types';
import { EventHandlers } from '../utils';

function stateReducer(
  state: ListboxState<string>,
  action: ListboxAction<string>,
): ListboxState<string> {
  if (
    action.type === ActionTypes.blur ||
    action.type === ActionTypes.optionHover ||
    action.type === ActionTypes.setValue
  ) {
    return state;
  }

  const newState = defaultListboxReducer(state, action);

  if (
    action.type !== ActionTypes.setHighlight &&
    newState.highlightedValue === null &&
    action.props.options.length > 0
  ) {
    return {
      ...newState,
      highlightedValue: action.props.options[0],
    };
  }

  return newState;
}

export default function useMenu(parameters: UseMenuParameters = {}) {
  const { listboxRef: listboxRefProp, open = false, onClose, listboxId } = parameters;

  const [menuItems, setMenuItems] = React.useState<Record<string, MenuItemMetadata>>({});

  const listboxRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(listboxRef, listboxRefProp);

  const registerItem = React.useCallback((id: string, metadata: MenuItemMetadata) => {
    setMenuItems((previousState) => {
      const newState = { ...previousState };
      newState[id] = metadata;
      return newState;
    });
  }, []);

  const unregisterItem = React.useCallback((id: string) => {
    setMenuItems((previousState) => {
      const newState = { ...previousState };
      delete newState[id];
      return newState;
    });
  }, []);

  const {
    getOptionState,
    getOptionProps,
    getRootProps,
    highlightedOption,
    setHighlightedValue: setListboxHighlight,
  } = useListbox({
    options: Object.keys(menuItems),
    optionStringifier: (id: string) => menuItems[id].label || menuItems[id].ref.current?.innerText,
    isOptionDisabled: (id) => menuItems?.[id]?.disabled || false,
    listboxRef: handleRef,
    focusManagement: 'DOM',
    id: listboxId,
    stateReducer,
    disabledItemsFocusable: true,
  });

  const highlightFirstItem = React.useCallback(() => {
    if (Object.keys(menuItems).length > 0) {
      setListboxHighlight(menuItems[Object.keys(menuItems)[0]].id);
    }
  }, [menuItems, setListboxHighlight]);

  const highlightLastItem = React.useCallback(() => {
    if (Object.keys(menuItems).length > 0) {
      setListboxHighlight(menuItems[Object.keys(menuItems)[Object.keys(menuItems).length - 1]].id);
    }
  }, [menuItems, setListboxHighlight]);

  React.useEffect(() => {
    if (!open) {
      highlightFirstItem();
    }
  }, [open, highlightFirstItem]);

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
      menuItems?.[highlightedOption]?.ref.current?.focus();
    }
  }, [highlightedOption, menuItems]);

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

  const getItemState = (id: string): MenuItemState => {
    const { disabled, highlighted } = getOptionState(id);
    return { disabled, highlighted };
  };

  React.useDebugValue({ menuItems, highlightedOption });

  return {
    registerItem,
    unregisterItem,
    menuItems,
    getListboxProps,
    getItemState,
    getItemProps: getOptionProps,
    highlightedOption,
    highlightFirstItem,
    highlightLastItem,
  };
}
