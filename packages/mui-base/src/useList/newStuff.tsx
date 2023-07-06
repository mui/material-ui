import * as React from 'react';
import { ListContext } from './ListContext';

export interface ListItemContextValue {
  dispatch: React.Dispatch<any>;
  highlighted: boolean;
  selected: boolean;
  focusable: boolean;
}

export const ListItemContext = React.createContext<ListItemContextValue | null>(null);

interface ListItemWrapperProps<ItemValue> {
  children?: React.ReactNode;
  item: ItemValue;
}

export function ListItemWrapper<ItemValue>(props: ListItemWrapperProps<ItemValue>) {
  const { children, item } = props;

  // console.log('ListItemWrapper render', item);

  const { dispatch, getItemState } = React.useContext(ListContext)!;
  const { highlighted, selected, focusable } = getItemState(item);

  const contextValue = React.useMemo(
    () => ({
      dispatch,
      highlighted,
      selected,
      focusable,
    }),
    [highlighted, selected, focusable, dispatch],
  );

  return <ListItemContext.Provider value={contextValue}>{children}</ListItemContext.Provider>;
}
