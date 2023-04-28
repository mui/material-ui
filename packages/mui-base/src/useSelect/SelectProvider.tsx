import * as React from 'react';
import { ListContextValue, ListContext } from '../useList/ListContext';
import { SelectOption } from '../useOption/useOption.types';
import { CompoundComponentContext, CompoundComponentContextValue } from '../utils/useCompound';

export type SelectProviderValue<Value> = CompoundComponentContextValue<Value, SelectOption<Value>> &
  ListContextValue<Value>;

export interface SelectProviderProps<Value> {
  value: SelectProviderValue<Value>;
  children: React.ReactNode;
}

/**
 * Sets up the contexts for the underlying Option components.
 *
 * @ignore - do not document.
 */
export default function SelectProvider<Value>(props: SelectProviderProps<Value>) {
  const { value, children } = props;

  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
    registerItem,
    totalSubitemCount,
  } = value;

  const listContextValue: ListContextValue<Value> = React.useMemo(
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

  const compoundComponentContextValue: CompoundComponentContextValue<
    Value,
    SelectOption<Value>
  > = React.useMemo(
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
