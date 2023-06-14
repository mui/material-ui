import * as React from 'react';
import { TabPanelMetadata } from '@mui/base';
import ScrollableTabsContext, {
  ScrollableTabsContextValue,
} from '../ScrollableTabs/ScrollableTabsContext';
import { CompoundComponentContextValue } from '../utils/useCompound';

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
  const { tabListRef } = valueProp;

  const scrollableTabsContextValue: ScrollableTabsContextValue = React.useMemo(
    () => ({
      tabListRef,
    }),
    [tabListRef],
  );

  return (
    <ScrollableTabsContext.Provider value={scrollableTabsContextValue}>
      {children}
    </ScrollableTabsContext.Provider>
  );
}
