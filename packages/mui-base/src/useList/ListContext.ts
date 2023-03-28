import * as React from 'react';
import { ListAction } from './listActions.types';
import { ListState, ListItemState } from './useList.types';

export interface ListContextValue<ItemValue, State extends ListState<ItemValue>> {
  dispatch: (action: ListAction<ItemValue, State>) => void;
  getItemState: (item: ItemValue) => ListItemState;
  registerHighlightChangeHandler: (handler: (item: ItemValue | null) => void) => () => void;
  registerSelectionChangeHandler: (
    handler: (items: ItemValue | ItemValue[] | null) => void,
  ) => () => void;
}

export const ListContext = React.createContext<ListContextValue<any, any> | null>(null);
if (process.env.NODE_ENV !== 'production') {
  ListContext.displayName = 'ListContext';
}
