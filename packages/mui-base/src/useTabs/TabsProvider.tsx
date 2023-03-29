import * as React from 'react';
import TabsContext, { TabsContextValue } from '../TabsUnstyled/TabsContext';
import { CompoundComponentContext, CompoundComponentContextValue } from '../utils/useCompound';

export type TabsProviderValue = CompoundComponentContextValue<string | number, string> &
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
export default function TabsProvider(props: TabsProviderProps) {
  const { value: valueProp, children } = props;
  const {
    direction,
    getItemIndex,
    idPrefix,
    onSelected,
    orientation,
    registerItem,
    selectionFollowsFocus,
    totalSubitemCount,
    value,
  } = valueProp;

  const compoundComponentContextValue: CompoundComponentContextValue<string | number, string> =
    React.useMemo(
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
      idPrefix,
      onSelected,
      orientation,
      selectionFollowsFocus,
      value,
    }),
    [direction, idPrefix, onSelected, orientation, selectionFollowsFocus, value],
  );

  return (
    <CompoundComponentContext.Provider value={compoundComponentContextValue}>
      <TabsContext.Provider value={tabsContextValue}>{children}</TabsContext.Provider>
    </CompoundComponentContext.Provider>
  );
}
