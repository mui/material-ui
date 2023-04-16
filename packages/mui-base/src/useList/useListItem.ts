import * as React from 'react';
import {
  unstable_useForkRef as useForkRef,
  unstable_useEnhancedEffect as useEnhancedEffect,
} from '@mui/utils';
import { EventHandlers } from '../utils/types';
import useForcedRerendering from '../utils/useForcedRerendering';
import { UseListItemParameters, UseListItemReturnValue } from './useListItem.types';
import { ListActionTypes } from './listActions.types';
import { ListContext } from './ListContext';

/**
 * Contains the logic for an item of a list-like component (e.g. Select, Menu, etc.).
 * It provides information about the item's state (selected, highlighted) and
 * handles the item's mouse events.
 *
 * @template ItemValue The type of the item's value. This should be consistent with the type of useList's `items` parameter.
 * @ignore - internal hook.
 */
export default function useListItem<ItemValue>(
  parameters: UseListItemParameters<ItemValue>,
): UseListItemReturnValue {
  const { handlePointerOverEvents = false, item, ref: externalRef } = parameters;

  const itemRef = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(itemRef, externalRef);

  const listContext = React.useContext(ListContext);
  if (!listContext) {
    throw new Error('useListItem must be used within a ListProvider');
  }

  const { dispatch, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler } =
    listContext;

  const { highlighted, selected, focusable } = getItemState(item);

  const rerender = useForcedRerendering();

  useEnhancedEffect(() => {
    function updateHighlightedState(highlightedItem: ItemValue | null) {
      if (highlightedItem === item && !highlighted) {
        rerender();
      } else if (highlightedItem !== item && highlighted) {
        rerender();
      }
    }

    return registerHighlightChangeHandler(updateHighlightedState);
  });

  useEnhancedEffect(() => {
    function updateSelectedState(selectedItems: ItemValue[]) {
      if (!selected) {
        if (selectedItems.includes(item)) {
          rerender();
        }
      } else if (!selectedItems.includes(item)) {
        rerender();
      }
    }

    return registerSelectionChangeHandler(updateSelectedState);
  }, [registerSelectionChangeHandler, rerender, selected, item]);

  const createHandleClick = React.useCallback(
    (other: Record<string, React.EventHandler<any>>) => (event: React.MouseEvent) => {
      other.onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }

      event.preventDefault();

      dispatch({
        type: ListActionTypes.itemClick,
        item,
        event,
      });
    },
    [dispatch, item],
  );

  const createHandlePointerOver = React.useCallback(
    (other: Record<string, React.EventHandler<any>>) => (event: React.PointerEvent) => {
      other.onMouseOver?.(event);
      if (event.defaultPrevented) {
        return;
      }

      dispatch({
        type: ListActionTypes.itemHover,
        item,
        event,
      });
    },
    [dispatch, item],
  );

  let tabIndex: number | undefined;
  if (focusable) {
    tabIndex = highlighted ? 0 : -1;
  }

  const getRootProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther,
  ) => ({
    ...otherHandlers,
    onClick: createHandleClick(otherHandlers),
    onPointerOver: handlePointerOverEvents ? createHandlePointerOver(otherHandlers) : undefined,
    ref: handleRef,
    tabIndex,
  });

  return {
    getRootProps,
    highlighted,
    ref: handleRef,
    selected,
  };
}
