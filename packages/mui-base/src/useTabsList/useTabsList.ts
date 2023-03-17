import * as React from 'react';
import { useTabContext } from '../TabsUnstyled';
import {
  TabsListContextValue,
  UseTabsListParameters,
  UseTabsListReturnValue,
  UseTabsListRootSlotProps,
} from './useTabsList.types';
import { EventHandlers } from '../utils';
import { useCompoundParent } from '../utils/useCompound';
import { TabMetadata } from '../useTabs/useTabs';
import useList, {
  ActionTypes,
  defaultListboxReducer,
  ListReducer,
  UseListParameters,
} from '../useList';

export const TabsListContext = React.createContext<TabsListContextValue | null>(null);

/**
 *
 * Demos:
 *
 * - [Unstyled Tabs](https://mui.com/base/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTabsList API](https://mui.com/base/react-tabs/hooks-api/#use-tabs-list)
 */

function useTabsList(parameters: UseTabsListParameters): UseTabsListReturnValue {
  const { ref: externalRef } = parameters;

  const {
    direction = 'ltr',
    onSelected,
    orientation = 'horizontal',
    value,
    selectionFollowsFocus,
  } = useTabContext();

  const { subitems, contextValue: compoundComponentContextValue } = useCompoundParent<
    string | number,
    TabMetadata
  >();

  const subitemKeys = React.useMemo(() => Array.from(subitems.keys()), [subitems]);

  const getTabElement = React.useCallback(
    (tabValue: string | number) => {
      if (tabValue == null) {
        return null;
      }

      return subitems.get(tabValue)?.ref.current ?? null;
    },
    [subitems],
  );

  const isRtl = direction === 'rtl';

  let listOrientation: UseListParameters<any>['orientation'];
  if (orientation === 'vertical') {
    listOrientation = 'vertical';
  } else {
    listOrientation = isRtl ? 'horizontal-rtl' : 'horizontal-ltr';
  }

  const stateReducer: ListReducer<string | number> = React.useCallback(
    (state, action) => {
      const newState = defaultListboxReducer(state, action);

      if (action.type === ActionTypes.itemsChange) {
        return {
          ...newState,
          highlightedValue: newState.selectedValues[0] ?? null,
        };
      }

      if (action.type === ActionTypes.setValue && action.values != null) {
        return {
          ...newState,
          highlightedValue: action.values[0],
        };
      }

      if (selectionFollowsFocus && newState.highlightedValue != null) {
        return {
          ...newState,
          selectedValues: [newState.highlightedValue],
        };
      }

      return newState;
    },
    [selectionFollowsFocus],
  );

  const listboxValue = React.useMemo(() => {
    if (value == null) {
      return [];
    }

    return [value];
  }, [value]);

  const handleChange = React.useCallback(
    (
      event:
        | React.FocusEvent<Element, Element>
        | React.KeyboardEvent<Element>
        | React.MouseEvent<Element, MouseEvent>
        | null,
      newValue: (string | number)[],
    ) => {
      onSelected(event, newValue[0] ?? null);
    },
    [onSelected],
  );

  const {
    getRootProps: getListboxRootProps,
    selectedOptions,
    highlightedOption,
    contextValue: listContextValue,
  } = useList({
    disabledItemsFocusable: !selectionFollowsFocus,
    focusManagement: 'DOM',
    getItemDomElement: getTabElement,
    isItemDisabled: (item) => subitems.get(item)?.disabled ?? false,
    items: subitemKeys,
    listRef: externalRef,
    onChange: handleChange,
    orientation: listOrientation,
    selectionLimit: 1,
    stateReducer,
    value: listboxValue,
  });

  const getRootProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther,
  ): UseTabsListRootSlotProps<TOther> => {
    return {
      ...otherHandlers,
      ...getListboxRootProps(otherHandlers),
      'aria-orientation': orientation === 'vertical' ? 'vertical' : undefined,
      role: 'tablist',
    };
  };

  return {
    isRtl,
    orientation,
    selectedValue: selectedOptions[0] ?? null,
    highlightedValue: highlightedOption,
    getRootProps,
    contextValue: {
      ...compoundComponentContextValue,
      ...listContextValue,
    },
  };
}

export default useTabsList;
