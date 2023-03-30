import * as React from 'react';
import { useTabsContext } from '../TabsUnstyled';
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
  ListActionTypes,
  listReducer,
  ListReducer,
  ListState,
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
    registerTabIdLookup,
    selectionFollowsFocus,
  } = useTabsContext();

  const { subitems, contextValue: compoundComponentContextValue } = useCompoundParent<
    string | number,
    TabMetadata
  >();

  const tabIdLookup = React.useCallback(
    (tabValue: string | number) => {
      return subitems.get(tabValue)?.id;
    },
    [subitems],
  );

  registerTabIdLookup(tabIdLookup);

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

  let listOrientation: UseListParameters<any, any>['orientation'];
  if (orientation === 'vertical') {
    listOrientation = 'vertical';
  } else {
    listOrientation = isRtl ? 'horizontal-rtl' : 'horizontal-ltr';
  }

  const stateReducer: ListReducer<string | number, ListState<string | number>> = React.useCallback(
    (state, action) => {
      const newState = listReducer(state, action);

      if (action.type === ListActionTypes.itemsChange) {
        return {
          ...newState,
          highlightedValue: newState.selectedValues[0] ?? null,
        };
      }

      if (action.type === ListActionTypes.setState && action.value.selectedValues != null) {
        return {
          ...newState,
          highlightedValue: action.value.selectedValues[0],
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

  const controlledState = React.useMemo(() => {
    if (value === undefined) {
      return {};
    }

    return value != null ? { selectedValues: [value] } : { selectedValues: [] };
  }, [value]);

  const {
    contextValue: listContextValue,
    dispatch,
    getRootProps: getListboxRootProps,
    highlightedOption,
    selectedOptions,
  } = useList({
    controlledProps: controlledState,
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
  });

  React.useEffect(() => {
    if (value === undefined) {
      return;
    }

    if (value != null) {
      dispatch({
        type: ListActionTypes.setState,
        event: null,
        value: {
          highlightedValue: value,
        },
      });
    }
  }, [dispatch, value]);

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
