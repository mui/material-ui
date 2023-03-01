import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import {
  UseListboxParameters,
  UseListboxParametersWithDefaults,
  ActionTypes,
  OptionState,
  UseListboxOptionSlotProps,
  UseListboxRootSlotProps,
} from './useListbox.types';
import defaultReducer from './defaultListboxReducer';
import useControllableReducer from './useControllableReducer';
import areArraysEqual from '../utils/areArraysEqual';
import { EventHandlers } from '../utils/types';
import useLatest from '../utils/useLatest';
import useTextNavigation from '../utils/useTextNavigation';
import useForcedRerendering from '../utils/useForcedRerendering';
import useListChangeNotifiers from './useListChangeNotifiers';

const defaultOptionComparer = <TOption>(optionA: TOption, optionB: TOption) => optionA === optionB;
const defaultIsOptionDisabled = () => false;
const defaultOptionStringifier = <TOption>(option: TOption) =>
  typeof option === 'string' ? option : String(option);

export interface ListContextValue<Item> {
  getItemProps: <TOther extends EventHandlers = {}>(
    item: Item,
    otherHandlers?: TOther,
  ) => UseListboxOptionSlotProps<TOther>;
  getItemState: (item: Item) => OptionState;
  registerHighlightChangeHandler: (handler: (item: Item | null) => void) => () => void;
  registerSelectionChangeHandler: (handler: (items: Item | Item[] | null) => void) => () => void;
  focusManagement: UseListboxParameters<Item>['focusManagement'];
}

export const ListContext = React.createContext<ListContextValue<any> | null>(null);
if (process.env.NODE_ENV !== 'production') {
  ListContext.displayName = 'ListContext';
}

/**
 * @ignore - internal hook.
 *
 * The useListbox is a lower-level utility that is used to build a listbox component.
 * It's used to manage the state of the listbox and its options.
 * Contains the logic for keyboard navigation, selection, and focus management.
 */
export default function useListbox<TOption>(props: UseListboxParameters<TOption>) {
  const {
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = 'activeDescendant',
    id: idProp,
    isOptionDisabled = defaultIsOptionDisabled,
    listboxRef: externalListboxRef,
    onHighlightChange,
    optionComparer = defaultOptionComparer,
    optionStringifier = defaultOptionStringifier,
    options,
    getOptionElement,
    orientation = 'vertical',
    stateReducer: externalReducer,
    value: valueParam,
    selectionLimit = null,
  } = props;

  const id = useId(idProp);

  const defaultIdGenerator = React.useCallback(
    (_: TOption, index: number) => `${id}-option-${index}`,
    [id],
  );

  const optionIdGenerator = props.optionIdGenerator ?? defaultIdGenerator;

  const listboxRef = React.useRef<HTMLUListElement>(null);
  const handleRef = useForkRef(externalListboxRef, listboxRef);

  const handleHighlightChange = React.useCallback(
    (
      event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
      value: TOption | null,
      reason: ActionTypes,
    ) => {
      onHighlightChange?.(event, value, reason);

      if (
        focusManagement === 'DOM' &&
        value != null &&
        (reason === ActionTypes.optionClick ||
          reason === ActionTypes.keyDown ||
          reason === ActionTypes.textNavigation)
      ) {
        getOptionElement?.(value)?.focus();
      }
    },
    [getOptionElement, onHighlightChange, focusManagement],
  );

  const propsWithDefaults: React.RefObject<UseListboxParametersWithDefaults<TOption>> = useLatest(
    {
      ...props,
      disabledItemsFocusable,
      disableListWrap,
      focusManagement,
      isOptionDisabled,
      onHighlightChange: handleHighlightChange,
      optionComparer,
      optionStringifier,
      orientation,
      selectionLimit,
    },
    [props],
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
      : options.findIndex((option) => optionComparer(option, highlightedValue));
  }, [highlightedValue, options, optionComparer]);

  // introducing refs to avoid recreating the getOptionState function on each change.
  const latestSelectedValues = useLatest(selectedValues);
  const latestHighlightedIndex = useLatest(highlightedIndex);
  const latestHighlightedValue = useLatest(highlightedValue);
  const previousOptions = React.useRef<TOption[]>([]);

  React.useEffect(() => {
    if (areArraysEqual(previousOptions.current, options, optionComparer)) {
      return;
    }

    dispatch({
      type: ActionTypes.optionsChange,
      event: null,
      options,
      previousOptions: previousOptions.current,
    });

    previousOptions.current = options;
  }, [options, optionComparer, dispatch]);

  const {
    notifySelectionChanged,
    notifyHighlightChanged,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
  } = useListChangeNotifiers<TOption>();

  React.useEffect(() => {
    notifySelectionChanged(selectedValues);
  }, [selectedValues, notifySelectionChanged]);

  React.useEffect(() => {
    notifyHighlightChanged(highlightedValue);
  }, [highlightedValue, notifyHighlightChanged]);

  const setSelectedValue = React.useCallback(
    (values: TOption[]) => {
      dispatch({
        type: ActionTypes.setValue,
        event: null,
        value: values,
      });
    },
    [dispatch],
  );

  const setHighlightedValue = React.useCallback(
    (option: TOption | null) => {
      dispatch({
        type: ActionTypes.setHighlight,
        event: null,
        highlight: option,
      });
    },
    [dispatch],
  );

  const createHandleOptionClick = React.useCallback(
    (option: TOption, other: Record<string, React.EventHandler<any>>) =>
      (event: React.MouseEvent) => {
        other.onClick?.(event);
        if (event.defaultPrevented) {
          return;
        }

        event.preventDefault();

        dispatch({
          type: ActionTypes.optionClick,
          option,
          event,
        });
      },
    [dispatch],
  );

  const createHandleOptionPointerOver = React.useCallback(
    (option: TOption, other: Record<string, React.EventHandler<any>>) =>
      (event: React.PointerEvent) => {
        other.onMouseOver?.(event);
        if (event.defaultPrevented) {
          return;
        }

        dispatch({
          type: ActionTypes.optionHover,
          option,
          event,
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
        // the listbox handles keyboard events on its behalf.
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

      if (listboxRef.current?.contains(event.relatedTarget)) {
        // focus remains within the listbox
        return;
      }

      dispatch({
        type: ActionTypes.blur,
        event,
      });
    };

  const getRootProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther,
  ): UseListboxRootSlotProps<TOther> => {
    return {
      ...otherHandlers,
      'aria-activedescendant':
        focusManagement === 'activeDescendant' && highlightedValue != null
          ? optionIdGenerator(highlightedValue, highlightedIndex)
          : undefined,
      id,
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers),
      role: 'listbox',
      tabIndex: focusManagement === 'DOM' ? -1 : 0,
      ref: handleRef,
    };
  };

  const getOptionState = React.useCallback(
    (option: TOption): OptionState => {
      const index = options.findIndex((opt) => optionComparer(opt, option));
      const selected = (latestSelectedValues.current ?? []).some(
        (value) => value != null && optionComparer(option, value),
      );

      const disabled = isOptionDisabled(option, index);
      const highlighted = latestHighlightedIndex.current === index && index !== -1;

      return {
        disabled,
        highlighted,
        index,
        selected,
      };
    },
    [options, isOptionDisabled, optionComparer, latestSelectedValues, latestHighlightedIndex],
  );

  const firstFocusableOption = React.useMemo(() => {
    if (focusManagement === 'activeDescendant') {
      // options are not focusable when using activeDescendant
      return undefined;
    }

    if (disabledItemsFocusable) {
      return options[0];
    }

    for (let i = 0; i < options.length; i += 1) {
      const option = options[i];
      const optionState = getOptionState(option);
      if (!optionState.disabled) {
        return option;
      }
    }

    return undefined;
  }, [options, disabledItemsFocusable, getOptionState, focusManagement]);

  const getOptionTabIndex = React.useCallback(
    (option: TOption, optionState: OptionState) => {
      if (focusManagement === 'activeDescendant') {
        return undefined;
      }

      // TODO: check if using highlightedValue instead of latestHighlightedValue.current does not kill performance
      if (highlightedValue == null) {
        return option === firstFocusableOption ? 0 : -1;
      }

      if (!optionState.highlighted) {
        return -1;
      }

      if (optionState.disabled && !disabledItemsFocusable) {
        return -1;
      }

      return 0;
    },
    [focusManagement, disabledItemsFocusable, firstFocusableOption, highlightedValue],
  );

  const getOptionProps = React.useCallback(
    <TOther extends EventHandlers = {}>(
      option: TOption,
      otherHandlers: TOther = {} as TOther,
    ): UseListboxOptionSlotProps<TOther> => {
      const optionState = getOptionState(option);

      return {
        ...otherHandlers,
        'aria-disabled': optionState.disabled || undefined,
        'aria-selected': optionState.selected,
        id: optionIdGenerator(option, optionState.index),
        onClick: createHandleOptionClick(option, otherHandlers),
        onPointerOver: createHandleOptionPointerOver(option, otherHandlers),
        role: 'option',
        tabIndex: getOptionTabIndex(option, optionState),
      };
    },
    [
      optionIdGenerator,
      createHandleOptionClick,
      createHandleOptionPointerOver,
      getOptionTabIndex,
      getOptionState,
    ],
  );

  const contextValue: ListContextValue<TOption> = React.useMemo(
    () => ({
      getItemProps: getOptionProps,
      getItemState: getOptionState,
      registerHighlightChangeHandler,
      registerSelectionChangeHandler,
      focusManagement,
    }),
    [
      getOptionProps,
      getOptionState,
      registerHighlightChangeHandler,
      registerSelectionChangeHandler,
      focusManagement,
    ],
  );

  React.useDebugValue({
    highlightedOption: highlightedValue,
    selectedOptions: selectedValues,
  });

  return {
    getRootProps,
    getOptionProps,
    getOptionState,
    highlightedOption: highlightedValue,
    selectedOptions: selectedValues,
    setSelectedValue,
    setHighlightedValue,
    contextValue,
  };
}

export interface UseListItemParameters<Item> {
  item: Item;
  ref?: React.Ref<HTMLElement>;
}

export function useListItem<Item>(parameters: UseListItemParameters<Item>) {
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

  React.useEffect(() => {
    function updateHighlightedState(highlightedItem: Item | null) {
      if (highlightedItem === item && !highlighted) {
        rerender();
      } else if (highlightedItem !== item && highlighted) {
        rerender();
      }
    }

    return registerHighlightChangeHandler(updateHighlightedState);
  });

  React.useEffect(() => {
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
