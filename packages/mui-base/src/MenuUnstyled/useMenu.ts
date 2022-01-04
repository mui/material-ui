import * as React from 'react';
import {
  ActionTypes,
  defaultListboxReducer,
  ListboxAction,
  ListboxState,
  useListbox,
} from '../ListboxUnstyled';

export interface MenuItemMetadata {
  id: string;
  disabled: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  ref: React.RefObject<HTMLElement>;
}

export interface UseMenuProps {
  listboxRef?: React.Ref<HTMLElement>;
}

export default function useMenu({ listboxRef }: UseMenuProps) {
  const [menuItems, setMenuItems] = React.useState<Record<string, MenuItemMetadata>>({});

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
    if (action.type === ActionTypes.optionHover) {
      const optionIndex = action.props.options.indexOf(action.option);
      if (action.props.isOptionDisabled(action.option, optionIndex)) {
        return state;
      }

      return {
        selectedValue: null,
        highlightedIndex: optionIndex,
      };
    }

    const newState = defaultListboxReducer(state, action);

    return {
      ...newState,
      selectedValue: null,
    };
  };

  const { getOptionState, getOptionProps, getRootProps, highlightedOption } = useListbox({
    options: Object.keys(menuItems),
    isOptionDisabled: (id) => menuItems?.[id]?.disabled || false,
    listboxRef,
    stateReducer,
  });

  const getListboxProps = (otherHandlers: Record<string, React.EventHandler<any>>) => ({
    ...getRootProps(otherHandlers),
    role: 'menu',
  });

  React.useDebugValue({ menuItems, highlightedOption });

  return {
    registerItem,
    unregisterItem,
    menuItems,
    getRootProps: getListboxProps,
    getItemState: getOptionState,
    getItemProps: getOptionProps,
    highlightedOption,
  };
}
