import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import {
  defaultListboxReducer,
  ListboxAction,
  ListboxState,
  useListbox,
  ActionTypes,
} from '../ListboxUnstyled';
import { MenuItemMetadata, MenuItemState, UseMenuParameters } from './useMenu.types';
import { EventHandlers } from '../utils';

function stateReducer<TOption>(
  state: ListboxState<TOption>,
  action: ListboxAction<TOption>,
): ListboxState<TOption> {
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

export default function useMenu(parameters: UseMenuParameters) {
  const { listboxRef: listboxRefProp, open = false, onClose, listboxId } = parameters;

  const [menuItems, setMenuItems] = React.useState<Record<string, MenuItemMetadata>>({});

  const listboxRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(listboxRef, listboxRefProp);

  const registerItem = React.useCallback((id, metadata) => {
    setMenuItems((previousState) => {
      const newState = { ...previousState };
      newState[id] = metadata;
      return newState;
    });
  }, []);

  const unregisterItem = React.useCallback((id) => {
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
  } = useListbox<MenuItemMetadata>({
    options: Object.values(menuItems),
    optionStringifier: (option: MenuItemMetadata) => option.ref.current?.innerText ?? '',
    isOptionDisabled: (menuItem) => menuItem?.disabled || false,
    listboxRef: handleRef,
    focusManagement: 'DOM',
    id: listboxId,
    stateReducer,
    disabledItemsFocusable: true,
  });

  const highlightFirstItem = React.useCallback(() => {
    if (Object.keys(menuItems).length > 0) {
      setListboxHighlight(menuItems[Object.keys(menuItems)[0]]);
    }
  }, [menuItems, setListboxHighlight]);

  const highlightLastItem = React.useCallback(() => {
    if (Object.keys(menuItems).length > 0) {
      setListboxHighlight(menuItems[Object.keys(menuItems)[Object.keys(menuItems).length - 1]]);
    }
  }, [menuItems, setListboxHighlight]);

  React.useEffect(() => {
    if (!open) {
      highlightFirstItem();
    }
  }, [open, highlightFirstItem]);

  const createHandleKeyDown = (otherHandlers?: EventHandlers) => (e: React.KeyboardEvent) => {
    otherHandlers?.onKeyDown?.(e);
    if (e.defaultPrevented) {
      return;
    }

    if (e.key === 'Escape' && open) {
      onClose?.();
    }
  };

  const createHandleBlur = (otherHandlers?: EventHandlers) => (e: React.FocusEvent) => {
    otherHandlers?.onBlur(e);

    if (!listboxRef.current?.contains(e.relatedTarget)) {
      onClose?.();
    }
  };

  React.useEffect(() => {
    // set focus to the highlighted item (but prevent stealing focus from other elements on the page)
    if (listboxRef.current?.contains(document.activeElement) && highlightedOption !== null) {
      highlightedOption.ref.current?.focus();
    }
  }, [highlightedOption, menuItems]);

  const getListboxProps = (otherHandlers?: EventHandlers) => ({
    ...otherHandlers,
    ...getRootProps({
      ...otherHandlers,
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers),
    }),
    role: 'menu',
  });

  const getItemState = (id: string): MenuItemState => {
    const { disabled, highlighted } = getOptionState(menuItems[id]);
    return { disabled, highlighted };
  };

  React.useDebugValue({ menuItems, highlightedOption });

  return {
    registerItem,
    unregisterItem,
    menuItems,
    getListboxProps,
    getItemState,
    getItemProps: (id: string, otherHandlers?: Record<string, React.EventHandler<any>>) =>
      getOptionProps(menuItems[id], otherHandlers),
    highlightedOption,
    highlightFirstItem,
    highlightLastItem,
  };
}
