import * as React from 'react';
import { ActionTypes } from './actions.types';
import { ListState, UseListParametersWithDefaults, ListReducerAction } from './useList.types';

type ItemPredicate<ItemValue> = (item: ItemValue, index: number) => boolean;

// TODO: make page size configurable
const pageSize = 5;

function findValidItemToHighlight<ItemValue>(
  index: number,
  lookupDirection: 'next' | 'previous',
  items: ItemValue[],
  focusDisabled: boolean,
  isItemDisabled: ItemPredicate<ItemValue>,
  wrapAround: boolean,
): number {
  if (items.length === 0 || items.every((item, itemIndex) => isItemDisabled(item, itemIndex))) {
    return -1;
  }

  let nextFocus = index;

  for (;;) {
    // No valid items found
    if (
      (!wrapAround && lookupDirection === 'next' && nextFocus === items.length) ||
      (!wrapAround && lookupDirection === 'previous' && nextFocus === -1)
    ) {
      return -1;
    }

    const nextFocusDisabled = focusDisabled ? false : isItemDisabled(items[nextFocus], nextFocus);
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

function getNewHighlightedItem<ItemValue>(
  items: ItemValue[],
  previouslyHighlightedValue: ItemValue | null,
  diff: number | 'reset' | 'start' | 'end',
  highlightDisabledItems: boolean,
  isItemDisabled: ItemPredicate<ItemValue>,
  disableListWrap: boolean,
  itemComparer: (item1: ItemValue, item2: ItemValue) => boolean,
): ItemValue | null {
  const maxIndex = items.length - 1;
  const defaultHighlightedIndex = -1;
  const previouslyHighlightedIndex =
    previouslyHighlightedValue == null
      ? -1
      : items.findIndex((item) => itemComparer(item, previouslyHighlightedValue));

  let nextIndexCandidate: number;
  let lookupDirection: 'next' | 'previous';
  let wrapAround: boolean;

  switch (diff) {
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
      const newIndex = previouslyHighlightedIndex + diff;
      wrapAround = !disableListWrap;

      if (newIndex < 0) {
        if ((!wrapAround && previouslyHighlightedIndex !== -1) || Math.abs(diff) > 1) {
          nextIndexCandidate = 0;
          lookupDirection = 'next';
        } else {
          nextIndexCandidate = maxIndex;
          lookupDirection = 'previous';
        }
      } else if (newIndex > maxIndex) {
        if (!wrapAround || Math.abs(diff) > 1) {
          nextIndexCandidate = maxIndex;
          lookupDirection = 'previous';
        } else {
          nextIndexCandidate = 0;
          lookupDirection = 'next';
        }
      } else {
        nextIndexCandidate = newIndex;
        lookupDirection = diff >= 0 ? 'next' : 'previous';
      }
    }
  }

  const nextIndex = findValidItemToHighlight(
    nextIndexCandidate,
    lookupDirection,
    items,
    highlightDisabledItems,
    isItemDisabled,
    wrapAround,
  );

  return items[nextIndex] ?? null;
}

function moveHighlight<ItemValue>(
  previouslyHighlightedValue: ItemValue | null,
  diff: number | 'reset' | 'start' | 'end',
  props: UseListParametersWithDefaults<ItemValue>,
) {
  const { items, isItemDisabled, disableListWrap, disabledItemsFocusable, itemComparer } = props;

  return getNewHighlightedItem(
    items,
    previouslyHighlightedValue,
    diff,
    disabledItemsFocusable ?? false,
    isItemDisabled ?? (() => false),
    disableListWrap ?? false,
    itemComparer ?? ((o1, o2) => o1 === o2),
  );
}

function toggleSelection<ItemValue>(
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

function handleItemSelection<ItemValue>(
  item: ItemValue,
  state: ListState<ItemValue>,
  props: UseListParametersWithDefaults<ItemValue>,
): ListState<ItemValue> {
  const { itemComparer = (o, v) => o === v, isItemDisabled = () => false, selectionLimit } = props;
  const { selectedValues } = state;

  const itemIndex = props.items.findIndex((i) => itemComparer(item, i));

  if (isItemDisabled(item, itemIndex)) {
    return state;
  }

  // if the item is already selected, remove it from the selection, otherwise add it
  const newSelectedValues = toggleSelection(item, selectedValues, selectionLimit, itemComparer);

  return {
    selectedValues: newSelectedValues,
    highlightedValue: item,
  };
}

function handleKeyDown<ItemValue>(
  event: React.KeyboardEvent,
  state: Readonly<ListState<ItemValue>>,
  parameters: UseListParametersWithDefaults<ItemValue>,
): ListState<ItemValue> {
  const previouslySelectedValue = state.highlightedValue;
  const { orientation } = parameters;

  switch (event.key) {
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

function handleBlur<ItemValue>(
  state: ListState<ItemValue>,
  props: UseListParametersWithDefaults<ItemValue>,
): ListState<ItemValue> {
  if (props.focusManagement === 'DOM') {
    return state;
  }

  return {
    ...state,
    highlightedValue: null,
  };
}

const textCriteriaMatches = <ItemValue>(
  nextFocus: ItemValue,
  searchString: string,
  stringifyItem: (item: ItemValue) => string | undefined,
) => {
  const text = stringifyItem(nextFocus)?.trim().toLowerCase();

  if (!text || text.length === 0) {
    // Make item not navigable if stringification fails or results in empty string.
    return false;
  }

  return text.indexOf(searchString) === 0;
};

function handleTextNavigation<ItemValue>(
  state: ListState<ItemValue>,
  searchString: string,
  props: UseListParametersWithDefaults<ItemValue>,
): ListState<ItemValue> {
  const {
    items,
    isItemDisabled,
    disableListWrap,
    disabledItemsFocusable,
    itemComparer,
    itemStringifier,
  } = props;

  const startWithCurrentItem = searchString.length > 1;

  let nextItem = startWithCurrentItem
    ? state.highlightedValue
    : getNewHighlightedItem(
        items,
        state.highlightedValue,
        1,
        disabledItemsFocusable ?? false,
        isItemDisabled ?? (() => false),
        disableListWrap ?? false,
        itemComparer,
      );

  // use `for` instead of `while` prevent infinite loop
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
    nextItem = getNewHighlightedItem(
      items,
      nextItem,
      1,
      disabledItemsFocusable ?? false,
      isItemDisabled ?? (() => false),
      disableListWrap ?? false,
      itemComparer,
    );
  }

  // No item matches the text search criteria
  return state;
}

function handleItemsChange<ItemValue>(
  items: ItemValue[],
  previousItems: ItemValue[],
  state: ListState<ItemValue>,
  props: UseListParametersWithDefaults<ItemValue>,
): ListState<ItemValue> {
  const { itemComparer, focusManagement } = props;

  let newHighlightedValue: ItemValue | null = null;

  if (state.highlightedValue != null) {
    newHighlightedValue = items.find((item) => itemComparer(item, state.highlightedValue!)) ?? null;
  } else if (focusManagement === 'DOM' && previousItems.length === 0) {
    // TODO: exclude disabled items
    newHighlightedValue = items[0] ?? null;
  }

  // exclude selected values that are no longer in the items list
  const selectedValues = state.selectedValues ?? [];
  const newSelectedValues = selectedValues.filter((selectedValue) =>
    items.some((item) => itemComparer(item, selectedValue)),
  );

  return {
    highlightedValue: newHighlightedValue,
    selectedValues: newSelectedValues,
  };
}

export default function defaultListboxReducer<ItemValue>(
  state: Readonly<ListState<ItemValue>>,
  action: ListReducerAction<ItemValue>,
): Readonly<ListState<ItemValue>> {
  const { type } = action;

  switch (type) {
    case ActionTypes.keyDown:
      return handleKeyDown(action.event, state, action.props);
    case ActionTypes.itemClick:
      return handleItemSelection(action.item, state, action.props);
    case ActionTypes.blur:
      return handleBlur(state, action.props);
    case ActionTypes.setValue:
      return {
        ...state,
        selectedValues: action.values,
      };
    case ActionTypes.setHighlight:
      return {
        ...state,
        highlightedValue: action.value,
      };
    case ActionTypes.textNavigation:
      return handleTextNavigation(state, action.searchString, action.props);
    case ActionTypes.itemsChange:
      return handleItemsChange(action.items, action.previousItems, state, action.props);
    default:
      return state;
  }
}
