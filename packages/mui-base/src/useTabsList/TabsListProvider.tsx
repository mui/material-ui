'use client';
import * as React from 'react';
import { ListContext, ListContextValue } from '../useList/ListContext';
import { TabMetadata } from '../useTabs';
import { CompoundComponentContext, CompoundComponentContextValue } from '../useCompound';

export type TabsListProviderValue = CompoundComponentContextValue<string | number, TabMetadata> &
  ListContextValue<string | number>;

export interface TabsListProviderProps {
  value: TabsListProviderValue;
  children: React.ReactNode;
}

/**
 * Sets up the contexts for the underlying Tab components.
 *
 * @ignore - do not document.
 */
export function TabsListProvider(props: TabsListProviderProps) {
  const { value, children } = props;
  const { dispatch, getItemIndex, getItemState, registerItem, totalSubitemCount } = value;

  const listContextValue: ListContextValue<string | number> = React.useMemo(
    () => ({
      dispatch,
      getItemState,
      getItemIndex,
    }),
    [dispatch, getItemIndex, getItemState],
  );

  const compoundComponentContextValue: CompoundComponentContextValue<string | number, TabMetadata> =
    React.useMemo(
      () => ({
        getItemIndex,
        registerItem,
        totalSubitemCount,
      }),
      [registerItem, getItemIndex, totalSubitemCount],
    );

  return (
    <CompoundComponentContext.Provider value={compoundComponentContextValue}>
      <ListContext.Provider value={listContextValue}>{children}</ListContext.Provider>
    </CompoundComponentContext.Provider>
  );
}
