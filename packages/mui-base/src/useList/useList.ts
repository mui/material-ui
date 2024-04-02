'use client';
import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import {
  UseListParameters,
  ListItemState,
  UseListRootSlotProps,
  ListState,
  ListActionContext,
  UseListReturnValue,
} from './useList.types';
import { ListActionTypes, ListAction } from './listActions.types';
import { ListContextValue } from './ListContext';
import { listReducer as defaultReducer } from './listReducer';

import { useControllableReducer } from '../utils/useControllableReducer';
import {
  ControllableReducerAction,
  StateChangeCallback,
  StateComparers,
} from '../utils/useControllableReducer.types';
import { areArraysEqual } from '../utils/areArraysEqual';
import { useTextNavigation } from '../utils/useTextNavigation';
import { MuiCancellableEvent } from '../utils/MuiCancellableEvent';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { EventHandlers } from '../utils/types';

const EMPTY_OBJECT = {};
const NOOP = () => {};

const defaultItemComparer = <ItemValue>(optionA: ItemValue, optionB: ItemValue) =>
  optionA === optionB;

const defaultIsItemDisabled = () => false;

const defaultItemStringifier = <ItemValue>(item: ItemValue) =>
  typeof item === 'string' ? item : String(item);

const defaultGetInitialState = () => ({
  highlightedValue: null,
  selectedValues: [],
});

/**
 * The useList is a lower-level utility that is used to build list-like components.
 * It's used to manage the state of the list and its items.
 *
 * Supports highlighting a single item and selecting an arbitrary number of items.
 *
 * The state of the list is managed by a controllable reducer - that is a reducer that can have its state
 * controlled from outside.
 *
 * By default, the state consists of `selectedValues` and `highlightedValue` but can be extended by the caller of the hook.
 * Also the actions that can be dispatched and the reducer function can be defined externally.
 *
 * @template ItemValue The type of the item values.
 * @template State The type of the list state. This should be a subtype of `ListState<ItemValue>`.
 * @template CustomAction The type of the actions that can be dispatched (besides the standard ListAction).
 * @template CustomActionContext The shape of additional properties that will be added to actions when dispatched.
 *
 * @ignore - internal hook.
 */
function useList<
  ItemValue,
  State extends ListState<ItemValue> = ListState<ItemValue>,
  CustomAction extends ControllableReducerAction = never,
  CustomActionContext = {},
>(
  params: UseListParameters<ItemValue, State, CustomAction, CustomActionContext>,
): UseListReturnValue<ItemValue, State, CustomAction> {
  const {
    controlledProps = EMPTY_OBJECT,
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = 'activeDescendant',
    getInitialState = defaultGetInitialState,
    getItemDomElement,
    getItemId,
    isItemDisabled = defaultIsItemDisabled,
    rootRef: externalListRef,
    onStateChange = NOOP,
    items,
    itemComparer = defaultItemComparer,
    getItemAsString = defaultItemStringifier,
    onChange,
    onHighlightChange,
    onItemsChange,
    orientation = 'vertical',
    pageSize = 5,
    reducerActionContext = EMPTY_OBJECT as CustomActionContext,
    selectionMode = 'single',
    stateReducer: externalReducer,
    componentName = 'useList',
  } = params;

  if (process.env.NODE_ENV !== 'production') {
    if (focusManagement === 'DOM' && getItemDomElement == null) {
      throw new Error(
        'useList: The `getItemDomElement` prop is required when using the `DOM` focus management.',
      );
    }

    if (focusManagement === 'activeDescendant' && getItemId == null) {
      throw new Error(
        'useList: The `getItemId` prop is required when using the `activeDescendant` focus management.',
      );
    }
  }

  const listRef = React.useRef<HTMLUListElement>(null);
  const handleRef = useForkRef(externalListRef, listRef);

  const handleHighlightChange = React.useCallback(
    (
      event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
      value: ItemValue | null,
      reason: string,
    ) => {
      onHighlightChange?.(event, value, reason);

      if (
        focusManagement === 'DOM' &&
        value != null &&
        (reason === ListActionTypes.itemClick ||
          reason === ListActionTypes.keyDown ||
          reason === ListActionTypes.textNavigation)
      ) {
        getItemDomElement?.(value)?.focus();
      }
    },
    [getItemDomElement, onHighlightChange, focusManagement],
  );

  const stateComparers = React.useMemo(
    () =>
      ({
        highlightedValue: itemComparer,
        selectedValues: (valuesArray1, valuesArray2) =>
          areArraysEqual(valuesArray1, valuesArray2, itemComparer),
      }) as StateComparers<State>,
    [itemComparer],
  );

  // This gets called whenever a reducer changes the state.
  const handleStateChange: StateChangeCallback<State> = React.useCallback(
    (event, field, value, reason, state) => {
      onStateChange?.(event, field, value, reason, state);

      switch (field) {
        case 'highlightedValue':
          handleHighlightChange(
            event as React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
            value as ItemValue | null,
            reason,
          );
          break;
        case 'selectedValues':
          onChange?.(
            event as React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
            value as ItemValue[],
            reason,
          );
          break;
        default:
          break;
      }
    },
    [handleHighlightChange, onChange, onStateChange],
  );

  // The following object is added to each action when it's dispatched.
  // It's accessible in the reducer via the `action.context` field.
  const listActionContext: ListActionContext<ItemValue> = React.useMemo(() => {
    return {
      disabledItemsFocusable,
      disableListWrap,
      focusManagement,
      isItemDisabled,
      itemComparer,
      items,
      getItemAsString,
      onHighlightChange: handleHighlightChange,
      orientation,
      pageSize,
      selectionMode,
      stateComparers,
    };
  }, [
    disabledItemsFocusable,
    disableListWrap,
    focusManagement,
    isItemDisabled,
    itemComparer,
    items,
    getItemAsString,
    handleHighlightChange,
    orientation,
    pageSize,
    selectionMode,
    stateComparers,
  ]);

  const initialState = getInitialState();
  const reducer = (externalReducer ?? defaultReducer) as React.Reducer<
    State,
    ListAction<ItemValue> | CustomAction
  >;

  const actionContext: ListActionContext<ItemValue> & CustomActionContext = React.useMemo(
    () => ({ ...reducerActionContext, ...listActionContext }),
    [reducerActionContext, listActionContext],
  );

  const [state, dispatch] = useControllableReducer<
    State,
    ListAction<ItemValue> | CustomAction,
    ListActionContext<ItemValue> & CustomActionContext
  >({
    reducer,
    actionContext,
    initialState: initialState as State,
    controlledProps,
    stateComparers,
    onStateChange: handleStateChange,
    componentName,
  });

  const { highlightedValue, selectedValues } = state;

  const handleTextNavigation = useTextNavigation((searchString, event) =>
    dispatch({
      type: ListActionTypes.textNavigation,
      event,
      searchString,
    }),
  );

  const previousItems = React.useRef<ItemValue[]>([]);

  React.useEffect(() => {
    // Whenever the `items` object changes, we need to determine if the actual items changed.
    // If they did, we need to dispatch an `itemsChange` action, so the selected/highlighted state is updated.
    if (areArraysEqual(previousItems.current, items, itemComparer)) {
      return;
    }

    dispatch({
      type: ListActionTypes.itemsChange,
      event: null,
      items,
      previousItems: previousItems.current,
    });

    previousItems.current = items;
    onItemsChange?.(items);
  }, [items, itemComparer, dispatch, onItemsChange]);

  const createHandleKeyDown =
    (externalHandlers: EventHandlers) =>
    (event: React.KeyboardEvent<HTMLElement> & MuiCancellableEvent) => {
      externalHandlers.onKeyDown?.(event);

      if (event.defaultMuiPrevented) {
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
        type: ListActionTypes.keyDown,
        key: event.key,
        event,
      });

      handleTextNavigation(event);
    };

  const createHandleBlur =
    (externalHandlers: EventHandlers) =>
    (event: React.FocusEvent<HTMLElement> & MuiCancellableEvent) => {
      externalHandlers.onBlur?.(event);

      if (event.defaultMuiPrevented) {
        return;
      }

      if (listRef.current?.contains(event.relatedTarget)) {
        // focus remains within the list
        return;
      }

      dispatch({
        type: ListActionTypes.blur,
        event,
      });
    };

  const getRootProps = <ExternalProps extends Record<string, any> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseListRootSlotProps<ExternalProps> => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return {
      ...externalProps,
      'aria-activedescendant':
        focusManagement === 'activeDescendant' && highlightedValue != null
          ? getItemId!(highlightedValue)
          : undefined,
      tabIndex: focusManagement === 'DOM' ? -1 : 0,
      ref: handleRef,
      ...externalEventHandlers,
      onBlur: createHandleBlur(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
    };
  };

  const getItemState = React.useCallback(
    (item: ItemValue): ListItemState => {
      const selected = (selectedValues ?? []).some(
        (value) => value != null && itemComparer(item, value),
      );

      const highlighted = highlightedValue != null && itemComparer(item, highlightedValue);
      const focusable = focusManagement === 'DOM';

      return {
        focusable,
        highlighted,
        selected,
      };
    },
    [itemComparer, selectedValues, highlightedValue, focusManagement],
  );

  const contextValue: ListContextValue<ItemValue> = React.useMemo(
    () => ({
      dispatch,
      getItemState,
    }),
    [dispatch, getItemState],
  );

  React.useDebugValue({
    state,
  });

  return {
    contextValue,
    dispatch,
    getRootProps,
    rootRef: handleRef,
    state,
  };
}

export { useList };
