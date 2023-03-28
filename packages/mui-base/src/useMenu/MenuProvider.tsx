import * as React from 'react';
import { ListContext, ListContextValue } from '../useList/ListContext';
import { MenuItemMetadata } from '../useMenuItem';
import { CompoundComponentContext, CompoundComponentContextValue } from '../utils/useCompound';
import type { MenuInternalState } from './useMenu.types';

export type MenuProviderValue = CompoundComponentContextValue<string, MenuItemMetadata> &
  ListContextValue<string, MenuInternalState>;

export interface MenuProviderProps {
  value: MenuProviderValue;
  children: React.ReactNode;
}

export default function MenuProvider(props: MenuProviderProps) {
  const { value, children } = props;

  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
    registerItem,
    unregisterItem,
    totalSubitemCount,
  } = value;

  const listContextValue: ListContextValue<string, MenuInternalState> = React.useMemo(
    () => ({
      dispatch,
      getItemState,
      getItemIndex,
      registerHighlightChangeHandler,
      registerSelectionChangeHandler,
    }),
    [
      dispatch,
      getItemIndex,
      getItemState,
      registerHighlightChangeHandler,
      registerSelectionChangeHandler,
    ],
  );

  const compoundComponentContextValue: CompoundComponentContextValue<string, MenuItemMetadata> =
    React.useMemo(
      () => ({
        getItemIndex,
        registerItem,
        totalSubitemCount,
        unregisterItem,
      }),
      [registerItem, getItemIndex, unregisterItem, totalSubitemCount],
    );

  return (
    <CompoundComponentContext.Provider value={compoundComponentContextValue}>
      <ListContext.Provider value={listContextValue}>{children}</ListContext.Provider>
    </CompoundComponentContext.Provider>
  );
}
