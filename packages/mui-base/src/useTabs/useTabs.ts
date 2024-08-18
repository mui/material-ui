'use client';
import * as React from 'react';
import { unstable_useControlled as useControlled } from '@mui/utils';
import { UseTabsParameters, UseTabsReturnValue } from './useTabs.types';
import { useCompoundParent } from '../useCompound';
import { TabPanelMetadata } from './TabsProvider';

export interface TabMetadata {
  disabled: boolean;
  id: string | undefined;
  ref: React.RefObject<HTMLElement | null>;
}

type IdLookupFunction = (id: string | number) => string | undefined;

/**
 *
 * Demos:
 *
 * - [Tabs](https://next.mui.com/base-ui/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTabs API](https://next.mui.com/base-ui/react-tabs/hooks-api/#use-tabs)
 */
function useTabs(parameters: UseTabsParameters): UseTabsReturnValue {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    orientation = 'horizontal',
    direction = 'ltr',
    selectionFollowsFocus = false,
  } = parameters;

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'Tabs',
    state: 'value',
  });

  const onSelected = React.useCallback(
    (event: React.SyntheticEvent | null, newValue: string | number | null) => {
      setValue(newValue);
      onChange?.(event, newValue);
    },
    [onChange, setValue],
  );

  const { subitems: tabPanels, contextValue: compoundComponentContextValue } = useCompoundParent<
    string | number,
    TabPanelMetadata
  >();

  const tabIdLookup = React.useRef<IdLookupFunction>(() => undefined);

  const getTabPanelId = React.useCallback(
    (tabValue: string | number) => {
      return tabPanels.get(tabValue)?.id;
    },
    [tabPanels],
  );

  const getTabId = React.useCallback((tabPanelId: string | number) => {
    return tabIdLookup.current(tabPanelId);
  }, []);

  const registerTabIdLookup = React.useCallback((lookupFunction: IdLookupFunction) => {
    tabIdLookup.current = lookupFunction;
  }, []);

  return {
    contextValue: {
      direction,
      getTabId,
      getTabPanelId,
      onSelected,
      orientation,
      registerTabIdLookup,
      selectionFollowsFocus,
      value,
      ...compoundComponentContextValue,
    },
  };
}

export { useTabs };
