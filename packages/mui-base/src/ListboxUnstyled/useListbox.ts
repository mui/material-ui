import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import {
  UseListboxParameters,
  UseListboxPropsWithDefaults,
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

const defaultOptionComparer = <TOption>(optionA: TOption, optionB: TOption) => optionA === optionB;
const defaultIsOptionDisabled = () => false;
const defaultOptionStringifier = <TOption>(option: TOption) =>
  typeof option === 'string' ? option : String(option);

export default function useListbox<TOption>(props: UseListboxParameters<TOption>) {
  const {
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = 'activeDescendant',
    id: idProp,
    isOptionDisabled = defaultIsOptionDisabled,
    listboxRef: externalListboxRef,
    multiple = false,
    optionComparer = defaultOptionComparer,
    optionStringifier = defaultOptionStringifier,
    options,
    stateReducer: externalReducer,
    value: valueParam,
  } = props;

  const id = useId(idProp);

  const defaultIdGenerator = React.useCallback(
    (_: TOption, index: number) => `${id}-option-${index}`,
    [id],
  );

  const optionIdGenerator = props.optionIdGenerator ?? defaultIdGenerator;

  const propsWithDefaults: React.RefObject<UseListboxPropsWithDefaults<TOption>> = useLatest(
    {
      ...props,
      disabledItemsFocusable,
      disableListWrap,
      focusManagement,
      isOptionDisabled,
      multiple,
      optionComparer,
      optionStringifier,
    },
    [props],
  );

  const listboxRef = React.useRef<HTMLUListElement>(null);
  const handleRef = useForkRef(externalListboxRef, listboxRef);

  const [{ highlightedValue, selectedValue }, dispatch] = useControllableReducer(
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

  const highlightedIndexRef = React.useRef<number>(-1);

  React.useEffect(() => {
    // if a controlled value changes, we need to update the state to keep things in sync
    if (valueParam !== undefined && valueParam !== selectedValue) {
      dispatch({
        type: ActionTypes.setValue,
        event: null,
        value: valueParam,
      });
    }
  }, [valueParam, selectedValue, dispatch]);

  React.useEffect(() => {
    if (highlightedValue == null) {
      highlightedIndexRef.current = -1;
    } else {
      highlightedIndexRef.current = options.findIndex((option) =>
        optionComparer(option, highlightedValue),
      );
    }
  }, [highlightedValue, options, optionComparer]);

  // introducing a ref to avoid recreating the getOptionState function on each change.
  const latestSelectedValue = useLatest(selectedValue);

  const highlightedIndex = React.useMemo(() => {
    return highlightedValue == null
      ? -1
      : options.findIndex((option) => optionComparer(option, highlightedValue));
  }, [highlightedValue, options, optionComparer]);

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

  const setSelectedValue = React.useCallback(
    (option: TOption | TOption[] | null) => {
      dispatch({
        type: ActionTypes.setValue,
        event: null,
        value: option,
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

      const keysToPreventDefault = ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'];

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

      if (listboxRef.current?.contains(document.activeElement)) {
        // focus is within the listbox
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
      let selected: boolean;
      const index = options.findIndex((opt) => optionComparer(opt, option));
      if (multiple) {
        selected = ((latestSelectedValue.current as TOption[]) ?? []).some(
          (value) => value != null && optionComparer(option, value),
        );
      } else {
        selected = optionComparer(option, latestSelectedValue.current as TOption);
      }

      const disabled = isOptionDisabled(option, index);

      return {
        selected,
        disabled,
        highlighted: highlightedIndexRef.current === index && index !== -1,
      };
    },
    [options, multiple, isOptionDisabled, optionComparer, latestSelectedValue],
  );

  const getOptionTabIndex = React.useCallback(
    (optionState: OptionState) => {
      if (focusManagement === 'activeDescendant') {
        return undefined;
      }

      if (!optionState.highlighted) {
        return -1;
      }

      if (optionState.disabled && !disabledItemsFocusable) {
        return -1;
      }

      return 0;
    },
    [focusManagement, disabledItemsFocusable],
  );

  const getOptionProps = React.useCallback(
    <TOther extends EventHandlers = {}>(
      option: TOption,
      otherHandlers: TOther = {} as TOther,
    ): UseListboxOptionSlotProps<TOther> => {
      const optionState = getOptionState(option);
      const index = options.findIndex((opt) => optionComparer(opt, option));

      return {
        ...otherHandlers,
        'aria-disabled': optionState.disabled || undefined,
        'aria-selected': optionState.selected,
        id: optionIdGenerator(option, index),
        onClick: createHandleOptionClick(option, otherHandlers),
        onPointerOver: createHandleOptionPointerOver(option, otherHandlers),
        role: 'option',
        tabIndex: getOptionTabIndex(optionState),
      };
    },
    [
      optionIdGenerator,
      createHandleOptionClick,
      createHandleOptionPointerOver,
      getOptionTabIndex,
      getOptionState,
      optionComparer,
      options,
    ],
  );

  React.useDebugValue({
    highlightedOption: options[highlightedIndex],
    selectedOption: selectedValue,
  });

  return {
    getRootProps,
    getOptionProps,
    getOptionState,
    highlightedOption: options[highlightedIndex] ?? null,
    selectedOption: selectedValue,
    setSelectedValue,
    setHighlightedValue,
  };
}
