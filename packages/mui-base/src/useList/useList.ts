import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import {
  UseListParameters,
  UseListParametersWithDefaults,
  ListItemState,
  UseListRootSlotProps,
  ListState,
  ListActionAddOn,
} from './useList.types';
import defaultReducer from './defaultListboxReducer';
import useControllableReducer from '../utils/useControllableReducer';
import areArraysEqual from '../utils/areArraysEqual';
import { EventHandlers } from '../utils/types';
import useLatest from '../utils/useLatest';
import useTextNavigation from '../utils/useTextNavigation';
import useListChangeNotifiers from './useListChangeNotifiers';
import { ActionTypes, ListAction } from './actions.types';
import {
  ControllableReducerAction,
  StateChangeCallback,
  StateComparers,
} from '../utils/useControllableReducer.types';

const noop = () => {};
const emptyObject = {};

const defaultItemComparer = <TOption>(optionA: TOption, optionB: TOption) => optionA === optionB;
const defaultIsItemDisabled = () => false;
const defaultItemStringifier = <ItemValue>(item: ItemValue) =>
  typeof item === 'string' ? item : String(item);
const defaultGetInitialState = () => ({
  highlightedValue: null,
  selectedValues: [],
});

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

/**
 * The useList is a lower-level utility that is used to build list-like components.
 * It's used to manage the state of the list and its items.
 *
 * Supports highlighting a single item and selecting an arbitrary number of items.
 *
 * @ignore - internal hook.
 */
function useList<
  ItemValue,
  State extends ListState<ItemValue> = ListState<ItemValue>,
  CustomAction extends ControllableReducerAction = never,
>(params: UseListParameters<ItemValue, State, CustomAction>) {
  const {
    controlledState: controlledProps = emptyObject,
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = 'activeDescendant',
    getInitialState = defaultGetInitialState,
    getItemDomElement,
    getItemId,
    isItemDisabled = defaultIsItemDisabled,
    listRef: externalListRef,
    onStateChange = noop,
    items,
    itemComparer = defaultItemComparer,
    itemStringifier = defaultItemStringifier,
    onChange,
    onHighlightChange,
    orientation = 'vertical',
    selectionLimit = null,
    stateReducer: externalReducer,
  } = params;

  if (process.env.NODE_ENV !== 'production') {
    if (focusManagement === 'DOM' && getItemDomElement == null) {
      throw new Error(
        'The `getItemDomElement` prop is required when using the `DOM` focus management.',
      );
    }

    if (focusManagement === 'activeDescendant' && getItemId == null) {
      throw new Error(
        'The `getItemId` prop is required when using the `activeDescendant` focus management.',
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
        (reason === ActionTypes.itemClick ||
          reason === ActionTypes.keyDown ||
          reason === ActionTypes.textNavigation)
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
      } as StateComparers<State>),
    [itemComparer],
  );

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

  const propsWithDefaults: React.RefObject<UseListParametersWithDefaults<ItemValue>> = useLatest(
    {
      disabledItemsFocusable,
      disableListWrap,
      focusManagement,
      isItemDisabled,
      itemComparer,
      items,
      itemStringifier,
      onHighlightChange: handleHighlightChange,
      orientation,
      selectionLimit,
      stateComparers,
    },
    [params],
  );

  const initialState = getInitialState();
  const reducer = externalReducer ?? defaultReducer;

  const actionAddOn: ListActionAddOn<ItemValue> = React.useMemo(
    () => ({ props: propsWithDefaults }),
    [propsWithDefaults],
  );

  type ListActionsWithCustomActions = CustomAction | ListAction<ItemValue, State>;

  const [state, dispatch] = useControllableReducer<
    State,
    ListActionsWithCustomActions,
    ListActionAddOn<ItemValue>
  >({
    reducer: reducer as any,
    actionAddOn,
    initialState: initialState as State,
    controlledProps,
    stateComparers,
    onStateChange: handleStateChange,
  });

  const { highlightedValue, selectedValues } = state;

  const handleTextNavigation = useTextNavigation((searchString, event) =>
    dispatch({
      type: ActionTypes.textNavigation,
      event,
      searchString,
    }),
  );

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
        type: ActionTypes.setState,
        event: null,
        value: { selectedValues: values } as Partial<State>,
      });
    },
    [dispatch],
  );

  const setHighlightedValue = React.useCallback(
    (item: ItemValue | null) => {
      dispatch({
        type: ActionTypes.setState,
        event: null,
        value: { highlightedValue: item } as Partial<State>,
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
          ? getItemId!(highlightedValue)
          : undefined,
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers),
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

  const contextValue: ListContextValue<ItemValue, State> = React.useMemo(
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
    dispatch,
    getRootProps,
    highlightedOption: highlightedValue,
    selectedOptions: selectedValues,
    setHighlightedValue,
    setSelectedValue,
    state,
  };
}

export default useList;
