import { ListActionTypes } from './listActions.types';
import {
  ListState,
  ListActionAddOnValue,
  ListReducerAction,
  ListActionAddOn,
} from './useList.types';

type ItemPredicate<ItemValue> = (item: ItemValue, index: number) => boolean;

/**
 * Looks up the next valid item to highlight within the list.
 *
 * @param currentIndex The index of the start of the search.
 * @param lookupDirection Whether to look for the next or previous item.
 * @param items The array of items to search.
 * @param includeDisabledItems Whether to include disabled items in the search.
 * @param isItemDisabled A function that determines whether an item is disabled.
 * @param wrapAround Whether to wrap around the list when searching.
 * @returns The index of the next valid item to highlight or -1 if no valid item is found.
 */
function findValidItemToHighlight<ItemValue>(
  currentIndex: number,
  lookupDirection: 'next' | 'previous',
  items: ItemValue[],
  includeDisabledItems: boolean,
  isItemDisabled: ItemPredicate<ItemValue>,
  wrapAround: boolean,
): number {
  if (
    items.length === 0 ||
    (!includeDisabledItems && items.every((item, itemIndex) => isItemDisabled(item, itemIndex)))
  ) {
    return -1;
  }

  let nextFocus = currentIndex;

  for (;;) {
    // No valid items found
    if (
      (!wrapAround && lookupDirection === 'next' && nextFocus === items.length) ||
      (!wrapAround && lookupDirection === 'previous' && nextFocus === -1)
    ) {
      return -1;
    }

    const nextFocusDisabled = includeDisabledItems
      ? false
      : isItemDisabled(items[nextFocus], nextFocus);
    if (nextFocusDisabled) {
      nextFocus += lookupDirection === 'next' ? 1 : -1;
      if (wrapAround) {
        nextFocus = (nextFocus + items.length) % items.length;
      }
    } else {
      return nextFocus;
    }
  }
}

/**
 * Gets the next item to highlight based on the current highlighted item and the search direction.
 *
 * @param previouslyHighlightedValue The item from which to start the search for the next candidate.
 * @param offset The offset from the previously highlighted item to search for the next candidate or a special named value ('reset', 'start', 'end').
 * @param listConfig The confguration of the list.
 *
 * @returns The next item to highlight or null if no item is valid.
 */
export function moveHighlight<ItemValue>(
  previouslyHighlightedValue: ItemValue | null,
  offset: number | 'reset' | 'start' | 'end',
  listConfig: ListActionAddOnValue<ItemValue>,
) {
  const {
    items,
    isItemDisabled,
    disableListWrap,
    disabledItemsFocusable,
    itemComparer,
    focusManagement,
  } = listConfig;

  // TODO: make this configurable
  // The always should be an item highlighted when focus is managed by the DOM
  // so that it's accessible by the `tab` key.
  const defaultHighlightedIndex = focusManagement === 'DOM' ? 0 : -1;
  const maxIndex = items.length - 1;

  const previouslyHighlightedIndex =
    previouslyHighlightedValue == null
      ? -1
      : items.findIndex((item) => itemComparer(item, previouslyHighlightedValue));

  let nextIndexCandidate: number;
  let lookupDirection: 'next' | 'previous';
  let wrapAround = !disableListWrap;

  switch (offset) {
    case 'reset':
      if (defaultHighlightedIndex === -1) {
        return null;
      }

      nextIndexCandidate = 0;
      lookupDirection = 'next';
      wrapAround = false;
      break;

    case 'start':
      nextIndexCandidate = 0;
      lookupDirection = 'next';
      wrapAround = false;
      break;

    case 'end':
      nextIndexCandidate = maxIndex;
      lookupDirection = 'previous';
      wrapAround = false;
      break;

    default: {
      const newIndex = previouslyHighlightedIndex + offset;

      if (newIndex < 0) {
        if ((!wrapAround && previouslyHighlightedIndex !== -1) || Math.abs(offset) > 1) {
          nextIndexCandidate = 0;
          lookupDirection = 'next';
        } else {
          nextIndexCandidate = maxIndex;
          lookupDirection = 'previous';
        }
      } else if (newIndex > maxIndex) {
        if (!wrapAround || Math.abs(offset) > 1) {
          nextIndexCandidate = maxIndex;
          lookupDirection = 'previous';
        } else {
          nextIndexCandidate = 0;
          lookupDirection = 'next';
        }
      } else {
        nextIndexCandidate = newIndex;
        lookupDirection = offset >= 0 ? 'next' : 'previous';
      }
    }
  }

  const nextIndex = findValidItemToHighlight(
    nextIndexCandidate,
    lookupDirection,
    items,
    disabledItemsFocusable,
    isItemDisabled,
    wrapAround,
  );

  // If there are no valid items to highlight, return the previously highlighted item (if it's still valid).
  if (
    nextIndex === -1 &&
    previouslyHighlightedValue !== null &&
    !isItemDisabled(previouslyHighlightedValue, previouslyHighlightedIndex)
  ) {
    return previouslyHighlightedValue;
  }

  return items[nextIndex] ?? null;
}

/**
 * Toggles the selection of an item.
 *
 * @param item Item to toggle.
 * @param selectedValues Already selected items.
 * @param selectionLimit The number of items that can be simultanously selected. If null, there is no limit.
 * @param itemComparer A custom item comparer function.
 *
 * @returns The new array of selected items.
 */
export function toggleSelection<ItemValue>(
  item: ItemValue,
  selectedValues: ItemValue[],
  selectionLimit: number | null,
  itemComparer: (item1: ItemValue, item2: ItemValue) => boolean,
) {
  if (selectionLimit === 0) {
    return [];
  }

  // Selection limit = 1 is a special case - we don't want to allow deselecting the item.
  if (selectionLimit === 1) {
    if (itemComparer(selectedValues[0], item)) {
      return selectedValues;
    }

    return [item];
  }

  // The toggled item is selected; remove it from the selection.
  if (selectedValues.some((sv) => itemComparer(sv, item))) {
    return selectedValues.filter((sv) => !itemComparer(sv, item));
  }

  // The toggled item is not selected and the selected array is shorter than the limit - add to the selection.
  if (selectionLimit === null || selectedValues.length < selectionLimit) {
    return [...selectedValues, item];
  }

  // Truncate the selection to the limit (discard items with lower indexes).
  const newSelection = selectedValues.slice(selectedValues.length - selectionLimit + 1);
  newSelection.push(item);

  return newSelection;
}

function handleItemSelection<ItemValue, State extends ListState<ItemValue>>(
  item: ItemValue,
  state: State,
  props: ListActionAddOnValue<ItemValue>,
): State {
  const { itemComparer = (o, v) => o === v, isItemDisabled = () => false, selectionLimit } = props;
  const { selectedValues } = state;

  const itemIndex = props.items.findIndex((i) => itemComparer(item, i));

  if (isItemDisabled(item, itemIndex)) {
    return state;
  }

  // if the item is already selected, remove it from the selection, otherwise add it
  const newSelectedValues = toggleSelection(item, selectedValues, selectionLimit, itemComparer);

  return {
    ...state,
    selectedValues: newSelectedValues,
    highlightedValue: item,
  };
}

function handleKeyDown<ItemValue, State extends ListState<ItemValue>>(
  key: string,
  state: State,
  parameters: ListActionAddOnValue<ItemValue>,
): State {
  const previouslySelectedValue = state.highlightedValue;
  const { orientation, pageSize } = parameters;

  switch (key) {
    case 'Home':
      return {
        ...state,
        highlightedValue: moveHighlight(previouslySelectedValue, 'start', parameters),
      };

    case 'End':
      return {
        ...state,
        highlightedValue: moveHighlight(previouslySelectedValue, 'end', parameters),
      };

    case 'PageUp':
      return {
        ...state,
        highlightedValue: moveHighlight(previouslySelectedValue, -pageSize, parameters),
      };

    case 'PageDown':
      return {
        ...state,
        highlightedValue: moveHighlight(previouslySelectedValue, pageSize, parameters),
      };

    case 'ArrowUp':
      if (orientation !== 'vertical') {
        break;
      }

      return {
        ...state,
        highlightedValue: moveHighlight(previouslySelectedValue, -1, parameters),
      };

    case 'ArrowDown':
      if (orientation !== 'vertical') {
        break;
      }

      return {
        ...state,
        highlightedValue: moveHighlight(previouslySelectedValue, 1, parameters),
      };

    case 'ArrowLeft': {
      if (orientation === 'vertical') {
        break;
      }

      const offset = orientation === 'horizontal-ltr' ? -1 : 1;

      return {
        ...state,
        highlightedValue: moveHighlight(previouslySelectedValue, offset, parameters),
      };
    }

    case 'ArrowRight': {
      if (orientation === 'vertical') {
        break;
      }

      const offset = orientation === 'horizontal-ltr' ? 1 : -1;

      return {
        ...state,
        highlightedValue: moveHighlight(previouslySelectedValue, offset, parameters),
      };
    }

    case 'Enter':
    case ' ':
      if (state.highlightedValue === null) {
        return state;
      }

      return handleItemSelection(state.highlightedValue, state, parameters);

    default:
      break;
  }

  return state;
}

function handleBlur<ItemValue, State extends ListState<ItemValue>>(
  state: State,
  props: ListActionAddOnValue<ItemValue>,
): State {
  if (props.focusManagement === 'DOM') {
    return state;
  }

  return {
    ...state,
    highlightedValue: null,
  };
}

function textCriteriaMatches<ItemValue>(
  nextFocus: ItemValue,
  searchString: string,
  stringifyItem: (item: ItemValue) => string | undefined,
) {
  const text = stringifyItem(nextFocus)?.trim().toLowerCase();

  if (!text || text.length === 0) {
    // Make item not navigable if stringification fails or results in empty string.
    return false;
  }

  return text.indexOf(searchString) === 0;
}

function handleTextNavigation<ItemValue, State extends ListState<ItemValue>>(
  state: State,
  searchString: string,
  props: ListActionAddOnValue<ItemValue>,
): State {
  const { items, isItemDisabled, disabledItemsFocusable, itemStringifier } = props;

  const startWithCurrentItem = searchString.length > 1;

  let nextItem = startWithCurrentItem
    ? state.highlightedValue
    : moveHighlight(state.highlightedValue, 1, props);

  for (let index = 0; index < items.length; index += 1) {
    // Return un-mutated state if looped back to the currently highlighted value
    if (!nextItem || (!startWithCurrentItem && state.highlightedValue === nextItem)) {
      return state;
    }

    if (
      textCriteriaMatches(nextItem, searchString, itemStringifier) &&
      (!isItemDisabled(nextItem, items.indexOf(nextItem)) || disabledItemsFocusable)
    ) {
      // The nextItem is the element to be highlighted
      return {
        ...state,
        highlightedValue: nextItem,
      };
    }
    // Move to the next element.
    nextItem = moveHighlight(nextItem, 1, props);
  }

  // No item matches the text search criteria
  return state;
}

function handleItemsChange<ItemValue, State extends ListState<ItemValue>>(
  items: ItemValue[],
  previousItems: ItemValue[],
  state: State,
  props: ListActionAddOnValue<ItemValue>,
): State {
  const { itemComparer, focusManagement } = props;

  let newHighlightedValue: ItemValue | null = null;

  if (state.highlightedValue != null) {
    newHighlightedValue = items.find((item) => itemComparer(item, state.highlightedValue!)) ?? null;
  } else if (focusManagement === 'DOM' && previousItems.length === 0) {
    newHighlightedValue = moveHighlight(null, 'reset', props);
  }

  // exclude selected values that are no longer in the items list
  const selectedValues = state.selectedValues ?? [];
  const newSelectedValues = selectedValues.filter((selectedValue) =>
    items.some((item) => itemComparer(item, selectedValue)),
  );

  return {
    ...state,
    highlightedValue: newHighlightedValue,
    selectedValues: newSelectedValues,
  };
}

export default function listReducer<ItemValue, State extends ListState<ItemValue>>(
  state: State,
  action: ListReducerAction<ItemValue, State> & ListActionAddOn<ItemValue>,
): State {
  const { type, props } = action;
  const parameters = props.current!;

  switch (type) {
    case ListActionTypes.keyDown:
      return handleKeyDown(action.key, state, parameters);
    case ListActionTypes.itemClick:
      return handleItemSelection(action.item, state, parameters);
    case ListActionTypes.blur:
      return handleBlur(state, parameters);
    case ListActionTypes.setState:
      return {
        ...state,
        ...action.value,
      };
    case ListActionTypes.textNavigation:
      return handleTextNavigation(state, action.searchString, parameters);
    case ListActionTypes.itemsChange:
      return handleItemsChange(action.items, action.previousItems, state, parameters);
    default:
      return state;
  }
}
