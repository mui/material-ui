import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import {
  UseListParameters,
  UseListParametersWithDefaults,
  ListItemState,
  UseListRootSlotProps,
} from './useList.types';
import defaultReducer from './defaultListboxReducer';
import useControllableReducer from './useControllableReducer';
import areArraysEqual from '../utils/areArraysEqual';
import { EventHandlers } from '../utils/types';
import useLatest from '../utils/useLatest';
import useTextNavigation from '../utils/useTextNavigation';
import useListChangeNotifiers from './useListChangeNotifiers';
import { ActionTypes, ListAction } from './actions.types';

const defaultItemComparer = <ItemValue>(item1: ItemValue, item2: ItemValue) => item1 === item2;
const defaultIsItemDisabled = () => false;
const defaultItemStringifier = <ItemValue>(item: ItemValue) =>
  typeof item === 'string' ? item : String(item);

export interface ListContextValue<ItemValue> {
  dispatch: (action: ListAction<ItemValue>) => void;
  getItemState: (item: ItemValue) => ListItemState;
  registerHighlightChangeHandler: (handler: (item: ItemValue | null) => void) => () => void;
  registerSelectionChangeHandler: (
    handler: (items: ItemValue | ItemValue[] | null) => void,
  ) => () => void;
}

export const ListContext = React.createContext<ListContextValue<any> | null>(null);
if (process.env.NODE_ENV !== 'production') {
  ListContext.displayName = 'ListContext';
}

/**
 * The useList is a lower-level utility that is used to build list-like components.
 * It's used to manage the state of the list and its items.
 *
 * Supports highlighting a single item and selecting an arbitrary number of items.
 *
 * @ignore - internal hook.
 */
export default function useList<ItemValue>(params: UseListParameters<ItemValue>) {
  const {
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = 'activeDescendant',
    getItemDomElement,
    id: idProp,
    isItemDisabled = defaultIsItemDisabled,
    listRef: externalListRef,
    onHighlightChange,
    itemComparer = defaultItemComparer,
    items,
    itemStringifier = defaultItemStringifier,
    orientation = 'vertical',
    selectionLimit = null,
    stateReducer: externalReducer,
    value: valueParam,
  } = params;

  const id = useId(idProp);

  const defaultIdGenerator = React.useCallback(
    (_: ItemValue, index: number) => `${id}-option-${index}`,
    [id],
  );

  const itemIdGenerator = params.itemIdGenerator ?? defaultIdGenerator;

  const listRef = React.useRef<HTMLUListElement>(null);
  const handleRef = useForkRef(externalListRef, listRef);

  const handleHighlightChange = React.useCallback(
    (
      event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
      value: ItemValue | null,
      reason: ActionTypes,
    ) => {
      onHighlightChange?.(event, value, reason);

      if (
        focusManagement === 'DOM' &&
        value != null &&
        (reason === ActionTypes.itemClick ||
          reason === ActionTypes.keyDown ||
          reason === ActionTypes.textNavigation)
      ) {
        getItemDomElement?.(value)?.focus();
      }
    },
    [getItemDomElement, onHighlightChange, focusManagement],
  );

  const propsWithDefaults: React.RefObject<UseListParametersWithDefaults<ItemValue>> = useLatest(
    {
      ...params,
      disabledItemsFocusable,
      disableListWrap,
      focusManagement,
      isItemDisabled,
      onHighlightChange: handleHighlightChange,
      itemComparer,
      itemStringifier,
      orientation,
      selectionLimit,
    },
    [params],
  );

  const [{ highlightedValue, selectedValues }, dispatch] = useControllableReducer(
    defaultReducer,
    externalReducer,
    propsWithDefaults,
  );

  const handleTextNavigation = useTextNavigation((searchString, event) =>
    dispatch({
      type: ActionTypes.textNavigation,
      event,
      searchString,
    }),
  );

  React.useEffect(() => {
    // if a controlled value changes, we need to update the state to keep things in sync
    if (valueParam !== undefined && valueParam !== selectedValues) {
      dispatch({
        type: ActionTypes.setValue,
        event: null,
        value: valueParam,
      });
    }
  }, [valueParam, selectedValues, dispatch]);

  const highlightedIndex = React.useMemo(() => {
    return highlightedValue == null
      ? -1
      : items.findIndex((item) => itemComparer(item, highlightedValue));
  }, [highlightedValue, items, itemComparer]);

  // introducing refs to avoid recreating the getOptionState function on each change.
  const latestSelectedValues = useLatest(selectedValues);
  const latestHighlightedIndex = useLatest(highlightedIndex);
  const previousItems = React.useRef<ItemValue[]>([]);

  React.useEffect(() => {
    if (areArraysEqual(previousItems.current, items, itemComparer)) {
      return;
    }

    dispatch({
      type: ActionTypes.itemsChange,
      event: null,
      items,
      previousItems: previousItems.current,
    });

    previousItems.current = items;
  }, [items, itemComparer, dispatch]);

  const {
    notifySelectionChanged,
    notifyHighlightChanged,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
  } = useListChangeNotifiers<ItemValue>();

  React.useEffect(() => {
    notifySelectionChanged(selectedValues);
  }, [selectedValues, notifySelectionChanged]);

  React.useEffect(() => {
    notifyHighlightChanged(highlightedValue);
  }, [highlightedValue, notifyHighlightChanged]);

  const setSelectedValue = React.useCallback(
    (values: ItemValue[]) => {
      dispatch({
        type: ActionTypes.setValue,
        event: null,
        value: values,
      });
    },
    [dispatch],
  );

  const setHighlightedValue = React.useCallback(
    (option: ItemValue | null) => {
      dispatch({
        type: ActionTypes.setHighlight,
        event: null,
        highlight: option,
      });
    },
    [dispatch],
  );

  const createHandleKeyDown =
    (other: Record<string, React.EventHandler<any>>) =>
    (event: React.KeyboardEvent<HTMLElement>) => {
      other.onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      const keysToPreventDefault = ['Home', 'End', 'PageUp', 'PageDown'];

      if (orientation === 'vertical') {
        keysToPreventDefault.push('ArrowUp', 'ArrowDown');
      } else {
        keysToPreventDefault.push('ArrowLeft', 'ArrowRight');
      }

      if (focusManagement === 'activeDescendant') {
        // When the child element is focused using the activeDescendant attribute,
        // the list handles keyboard events on its behalf.
        // We have to `preventDefault()` is this case to prevent the browser from
        // scrolling the view when space is pressed or submitting forms when enter is pressed.
        keysToPreventDefault.push(' ', 'Enter');
      }

      if (keysToPreventDefault.includes(event.key)) {
        event.preventDefault();
      }

      dispatch({
        type: ActionTypes.keyDown,
        event,
      });

      handleTextNavigation(event);
    };

  const createHandleBlur =
    (other: Record<string, React.EventHandler<any>>) => (event: React.FocusEvent<HTMLElement>) => {
      other.onBlur?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (listRef.current?.contains(event.relatedTarget)) {
        // focus remains within the list
        return;
      }

      dispatch({
        type: ActionTypes.blur,
        event,
      });
    };

  const getRootProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther,
  ): UseListRootSlotProps<TOther> => {
    return {
      ...otherHandlers,
      'aria-activedescendant':
        focusManagement === 'activeDescendant' && highlightedValue != null
          ? itemIdGenerator(highlightedValue, highlightedIndex)
          : undefined,
      id,
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers),
      // TODO: role should be set by a downstream component
      role: 'listbox',
      tabIndex: focusManagement === 'DOM' ? -1 : 0,
      ref: handleRef,
    };
  };

  const firstFocusableItem = React.useMemo(() => {
    if (focusManagement === 'activeDescendant') {
      // items are not focusable when using activeDescendant
      return undefined;
    }

    if (disabledItemsFocusable) {
      return items[0];
    }

    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (!isItemDisabled(item, i)) {
        return item;
      }
    }

    return undefined;
  }, [items, disabledItemsFocusable, focusManagement, isItemDisabled]);

  const isItemFocusable = React.useCallback(
    (item: ItemValue, highlighted: boolean, disabled: boolean) => {
      if (focusManagement === 'activeDescendant') {
        return undefined;
      }

      // TODO: check if using highlightedValue instead of latestHighlightedValue.current does not kill performance
      if (highlightedValue == null) {
        return item === firstFocusableItem;
      }

      if (!highlighted) {
        return false;
      }

      if (disabled && !disabledItemsFocusable) {
        return false;
      }

      return true;
    },
    [focusManagement, disabledItemsFocusable, firstFocusableItem, highlightedValue],
  );

  const getItemState = React.useCallback(
    (item: ItemValue): ListItemState => {
      const index = items.findIndex((i) => itemComparer(i, item));
      const selected = (latestSelectedValues.current ?? []).some(
        (value) => value != null && itemComparer(item, value),
      );

      const disabled = isItemDisabled(item, index);
      const highlighted = latestHighlightedIndex.current === index && index !== -1;
      const focusable = isItemFocusable(item, highlighted, disabled);

      return {
        disabled,
        focusable,
        highlighted,
        index,
        selected,
      };
    },
    [
      items,
      isItemDisabled,
      itemComparer,
      latestSelectedValues,
      latestHighlightedIndex,
      isItemFocusable,
    ],
  );

  const contextValue: ListContextValue<ItemValue> = React.useMemo(
    () => ({
      dispatch,
      getItemState,
      registerHighlightChangeHandler,
      registerSelectionChangeHandler,
    }),
    [dispatch, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler],
  );

  React.useDebugValue({
    highlightedOption: highlightedValue,
    selectedOptions: selectedValues,
  });

  return {
    contextValue,
    getRootProps,
    highlightedOption: highlightedValue,
    selectedOptions: selectedValues,
    setHighlightedValue,
    setSelectedValue,
  };
}
