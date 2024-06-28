'use client';
import * as React from 'react';
import { unstable_useId as useId } from '@mui/utils';
import { ListContext, ListContextValue, ListItemState } from '../useList';

/**
 * Stabilizes the ListContext value for the MenuItem component, so it doesn't change when sibling items update.
 *
 * Demos:
 *
 * - [Menu](https://next.mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenuItemContextStabilizer API](https://next.mui.com/base-ui/react-menu/hooks-api/#use-menu-item-context-stabilizer)
 *
 * @param id - The id of the MenuItem. If undefined, it will be generated with useId.
 * @returns The stable ListContext value and the id of the MenuItem.
 */
export function useMenuItemContextStabilizer(id: string | undefined) {
  const listContext = React.useContext(ListContext as React.Context<ListContextValue<string>>);

  if (!listContext) {
    throw new Error('MenuItem: ListContext was not found.');
  }
  const itemId = useId(id);

  const { getItemState, dispatch } = listContext;

  let itemState: ListItemState;
  if (itemId != null) {
    itemState = getItemState(itemId);
  } else {
    itemState = { focusable: true, highlighted: false, selected: false };
  }

  const { highlighted, selected, focusable } = itemState;

  // The local version of getItemState can be only called with the current Option's value.
  // It doesn't make much sense to render an Option depending on other Options' state anyway.
  const localGetItemState = React.useCallback(
    (itemValue: string) => {
      if (itemValue !== itemId) {
        throw new Error(
          [
            'Base UI MenuItem: Tried to access the state of another MenuItem.',
            `itemValue: ${itemValue} | id: ${itemId}`,
            'This is unsupported when the MenuItem uses the MenuItemContextStabilizer as a performance optimization.',
          ].join('/n'),
        );
      }

      return {
        highlighted,
        selected,
        focusable,
      };
    },
    [highlighted, selected, focusable, itemId],
  );

  // Create a local (per MenuItem) instance of the ListContext that changes only when
  // the getItemState's return value changes.
  // This makes MenuItems re-render only when their state actually change, not when any MenuItem's state changes.
  const localContextValue = React.useMemo(
    () => ({
      dispatch,
      getItemState: localGetItemState,
    }),
    [dispatch, localGetItemState],
  );

  return {
    contextValue: localContextValue,
    id: itemId,
  };
}
