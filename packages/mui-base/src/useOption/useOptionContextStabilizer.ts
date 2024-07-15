'use client';
import * as React from 'react';
import { ListContext, ListContextValue } from '../useList';

/**
 * Stabilizes the ListContext value for the Option component, so it doesn't change when sibling Options update.
 *
 * Demos:
 *
 * - [Select](https://next.mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useOptionContextStabilizer API](https://next.mui.com/base-ui/react-select/hooks-api/#use-option-context-stabilizer)
 *
 * @param value - The value of the Option.
 * @returns The stable ListContext value.
 */
export function useOptionContextStabilizer<OptionValue>(value: OptionValue) {
  const listContext = React.useContext(ListContext as React.Context<ListContextValue<OptionValue>>);

  if (!listContext) {
    throw new Error('Option: ListContext was not found.');
  }

  const { getItemState, dispatch } = listContext;
  const { highlighted, selected, focusable } = getItemState(value);

  // The local version of getItemState can be only called with the current Option's value.
  // It doesn't make much sense to render an Option depending on other Options' state anyway.
  const localGetItemState = React.useCallback(
    (itemValue: OptionValue) => {
      if (itemValue !== value) {
        throw new Error(
          [
            'Base UI Option: Tried to access the state of another Option.',
            'This is unsupported when the Option uses the OptionContextStabilizer as a performance optimization.',
          ].join('/n'),
        );
      }

      return {
        highlighted,
        selected,
        focusable,
      };
    },
    [highlighted, selected, focusable, value],
  );

  // Create a local (per Option) instance of the ListContext that changes only when
  // the getItemState's return value changes.
  // This makes Options re-render only when their state actually change, not when any Option's state changes.
  const localContextValue = React.useMemo(
    () => ({
      dispatch,
      getItemState: localGetItemState,
    }),
    [dispatch, localGetItemState],
  );

  return {
    contextValue: localContextValue,
  };
}
