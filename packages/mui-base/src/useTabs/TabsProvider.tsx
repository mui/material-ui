'use client';
import * as React from 'react';
import { TabsContext, TabsContextValue } from '../Tabs/TabsContext';
import { CompoundComponentContext, CompoundComponentContextValue } from '../useCompound';

export type TabPanelMetadata = {
  id: string | undefined;
  ref: React.RefObject<HTMLElement | null>;
};

export type TabsProviderValue = CompoundComponentContextValue<string | number, TabPanelMetadata> &
  TabsContextValue;

export interface TabsProviderProps {
  value: TabsProviderValue;
  children: React.ReactNode;
}

/**
 * Sets up the contexts for the underlying Tab and TabPanel components.
 *
 * @ignore - do not document.
 */
export function TabsProvider(props: TabsProviderProps) {
  const { value: valueProp, children } = props;
  const {
    direction,
    getItemIndex,
    onSelected,
    orientation,
    registerItem,
    registerTabIdLookup,
    selectionFollowsFocus,
    totalSubitemCount,
    value,
    getTabId,
    getTabPanelId,
  } = valueProp;

  const compoundComponentContextValue: CompoundComponentContextValue<
    string | number,
    TabPanelMetadata
  > = React.useMemo(
    () => ({
      getItemIndex,
      registerItem,
      totalSubitemCount,
    }),
    [registerItem, getItemIndex, totalSubitemCount],
  );

  const tabsContextValue: TabsContextValue = React.useMemo(
    () => ({
      direction,
      getTabId,
      getTabPanelId,
      onSelected,
      orientation,
      registerTabIdLookup,
      selectionFollowsFocus,
      value,
    }),
    [
      direction,
      getTabId,
      getTabPanelId,
      onSelected,
      orientation,
      registerTabIdLookup,
      selectionFollowsFocus,
      value,
    ],
  );

  return (
    <CompoundComponentContext.Provider value={compoundComponentContextValue}>
      <TabsContext.Provider value={tabsContextValue}>{children}</TabsContext.Provider>
    </CompoundComponentContext.Provider>
  );
}
