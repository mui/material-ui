import * as React from 'react';
import { TabPanelMetadata } from '@mui/base';
import ScrollableTabsContext, {
  ScrollableTabsContextValue,
} from '../ScrollableTabs/ScrollableTabsContext';
import { CompoundComponentContext, CompoundComponentContextValue } from '../utils/useCompound';

export type ScrollableTabsProviderValue = CompoundComponentContextValue<
  string | number,
  TabPanelMetadata
> &
  ScrollableTabsContextValue;

export interface ScrollableTabsProviderProps {
  value: ScrollableTabsProviderValue;
  children: React.ReactNode;
}

/**
 * Sets up the contexts for the underlying Tab and TabPanel components.
 *
 * @ignore - do not document.
 */
export default function ScrollableTabsProvider(props: ScrollableTabsProviderProps) {
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
    getScrollButtonProps,
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

  const scrollableTabsContextValue: ScrollableTabsContextValue = React.useMemo(
    () => ({
      direction,
      getTabId,
      getTabPanelId,
      getScrollButtonProps,
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
      getScrollButtonProps,
      onSelected,
      orientation,
      registerTabIdLookup,
      selectionFollowsFocus,
      value,
    ],
  );

  return (
    <CompoundComponentContext.Provider value={compoundComponentContextValue}>
      <ScrollableTabsContext.Provider value={scrollableTabsContextValue}>
        {children}
      </ScrollableTabsContext.Provider>
    </CompoundComponentContext.Provider>
  );
}
