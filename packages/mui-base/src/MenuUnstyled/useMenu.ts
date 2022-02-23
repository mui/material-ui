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

export default function useMenu(parameters: UseMenuParameters) {
  const { listboxRef: listboxRefProp, open = false, onClose } = parameters;

  const [menuItems, setMenuItems] = React.useState<Record<string, MenuItemMetadata>>({});

  const listboxRef = React.useRef<HTMLElement | null>(null);
  const intermediaryListboxRef = useForkRef(listboxRefProp, listboxRef);

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

  const stateReducer = (state: ListboxState<string>, action: ListboxAction<string>) => {
    if (action.type === ActionTypes.blur || action.type === ActionTypes.optionHover) {
      return state;
    }

    const newState = defaultListboxReducer(state, action);

    if (newState.highlightedIndex === -1 && action.props.options.length > 0) {
      return {
        ...newState,
        highlightedIndex: 0,
      };
    }

    return newState;
  };

  // Ensure the menu is focused after opening
  const [focusRequested, requestFocus] = React.useState(false);

  const focusMenuIfRequested = React.useCallback(() => {
    if (focusRequested && listboxRef.current != null) {
      listboxRef.current.focus();
      requestFocus(false);
    }
  }, [focusRequested]);

  const updateMenuRef = (listboxElement: HTMLUListElement) => {
    listboxRef.current = listboxElement;
    focusMenuIfRequested();
  };

  const handleRef = useForkRef(intermediaryListboxRef, updateMenuRef);

  React.useEffect(() => {
    focusMenuIfRequested();
  }, [focusMenuIfRequested]);

  React.useEffect(() => {
    requestFocus(open ?? false);
  }, [open]);

  const { getOptionState, getOptionProps, getRootProps, highlightedOption } = useListbox({
    options: Object.keys(menuItems),
    isOptionDisabled: (id) => menuItems?.[id]?.disabled || false,
    listboxRef: handleRef,
    focusManagement: 'DOM',
    stateReducer,
    disabledItemsFocusable: true,
  });

  const createHandleBlur =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (e: React.FocusEvent) => {
      otherHandlers?.onBlur(e);

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

  const getListboxProps = (otherHandlers?: Record<string, React.EventHandler<any>>) => ({
    ...otherHandlers,
    ...getRootProps({
      ...otherHandlers,
      onBlur: createHandleBlur(otherHandlers),
    }),
    role: 'menu',
  });

  const getItemState = (id: string): MenuItemState => {
    const { disabled } = getOptionState(id);
    return { disabled };
  };

  React.useDebugValue({ menuItems, highlightedOption });

  return {
    registerItem,
    unregisterItem,
    menuItems,
    getRootProps: getListboxProps,
    getItemState,
    getItemProps: getOptionProps,
    highlightedOption,
  };
}
