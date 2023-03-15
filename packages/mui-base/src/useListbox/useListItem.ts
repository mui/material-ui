import * as React from 'react';
import {
  unstable_useForkRef as useForkRef,
  unstable_useEnhancedEffect as useEnhancedEffect,
} from '@mui/utils';
import { EventHandlers } from '../utils/types';
import useForcedRerendering from '../utils/useForcedRerendering';
import { ListContext } from './useListbox';

export interface UseListItemParameters<Item> {
  item: Item;
  ref?: React.Ref<HTMLElement>;
}

export default function useListItem<Item>(parameters: UseListItemParameters<Item>) {
  const { item, ref: externalRef } = parameters;

  const itemRef = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(itemRef, externalRef);

  const listContext = React.useContext(ListContext);
  if (!listContext) {
    throw new Error('useListItem must be used within a ListProvider');
  }

  const {
    getItemProps,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
  } = listContext;

  const itemState = getItemState(item);
  const { highlighted, selected } = itemState;

  const rerender = useForcedRerendering();

  useEnhancedEffect(() => {
    function updateHighlightedState(highlightedItem: Item | null) {
      if (highlightedItem === item && !highlighted) {
        rerender();
      } else if (highlightedItem !== item && highlighted) {
        rerender();
      }
    }

    return registerHighlightChangeHandler(updateHighlightedState);
  });

  useEnhancedEffect(() => {
    function updateSelectedState(selectedItems: Item | Item[] | null) {
      if (!selected) {
        if (Array.isArray(selectedItems)) {
          if (selectedItems.includes(item)) {
            rerender();
          }
        } else if (selectedItems === item) {
          rerender();
        }
      } else if (Array.isArray(selectedItems)) {
        if (!selectedItems.includes(item)) {
          rerender();
        }
      } else if (selectedItems !== item) {
        rerender();
      }
    }

    return registerSelectionChangeHandler(updateSelectedState);
  }, [registerSelectionChangeHandler, rerender, selected, item]);

  return {
    getItemProps: <TOther extends EventHandlers = {}>(otherHandlers?: TOther) => ({
      ...getItemProps(item, otherHandlers),
      ref: handleRef,
    }),
    getItemState: () => getItemState(item),
    ref: handleRef,
  };
}
