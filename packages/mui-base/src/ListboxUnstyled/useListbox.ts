import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import {
  UseListboxParameters,
  UseListboxStrictProps,
  ActionTypes,
  OptionState,
  UseListboxOptionSlotProps,
  UseListboxRootSlotProps,
  TextCriteria,
} from './useListbox.types';
import defaultReducer from './defaultListboxReducer';
import useControllableReducer from './useControllableReducer';
import areArraysEqual from '../utils/areArraysEqual';
import { EventHandlers } from '../utils/types';

const defaultOptionComparer = <TOption>(optionA: TOption, optionB: TOption) => optionA === optionB;
const defaultIsOptionDisabled = () => false;

const textCriteriaMatches = <TOption>(
  nextFocus: TOption,
  textCriteria: TextCriteria,
  stringifyOption: (option: TOption) => string,
) => {
  const text = stringifyOption(nextFocus).trim().toLowerCase();

  if (text.length === 0) {
    return false;
  }
  if (textCriteria.repeating) {
    return text[0] === textCriteria.keys[0];
  }
  return text.indexOf(textCriteria.keys.join('')) === 0;
};

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
    optionStringifier,
    options,
    stateReducer: externalReducer,
  } = props;

  const id = useId(idProp);

  function defaultIdGenerator(_: TOption, index: number) {
    return `${id}-option-${index}`;
  }

  const optionIdGenerator = props.optionIdGenerator ?? defaultIdGenerator;

  const propsWithDefaults: UseListboxStrictProps<TOption> = {
    ...props,
    disabledItemsFocusable,
    disableListWrap,
    focusManagement,
    isOptionDisabled,
    multiple,
    optionComparer,
  };

  const listboxRef = React.useRef<HTMLUListElement>(null);
  const handleRef = useForkRef(externalListboxRef, listboxRef);

  const textCriteriaRef = React.useRef<TextCriteria>({
    keys: [],
    repeating: true,
    previousKeyMatched: true,
    lastTime: null,
  });

  const [{ highlightedValue, selectedValue }, dispatch] = useControllableReducer(
    defaultReducer,
    externalReducer,
    propsWithDefaults,
  );

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
      options,
      previousOptions: previousOptions.current,
      props: propsWithDefaults,
    });

    previousOptions.current = options;

    // No need to re-run this effect if props change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, optionComparer, dispatch]);

  const setSelectedValue = React.useCallback(
    (option: TOption | TOption[] | null) => {
      dispatch({
        type: ActionTypes.setValue,
        value: option,
      });
    },
    [dispatch],
  );

  const setHighlightedValue = React.useCallback(
    (option: TOption | null) => {
      dispatch({
        type: ActionTypes.setHighlight,
        highlight: option,
      });
    },
    [dispatch],
  );

  const createHandleOptionClick =
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
        props: propsWithDefaults,
      });
    };

  const createHandleOptionMouseOver =
    (option: TOption, other: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent) => {
      other.onMouseOver?.(event);
      if (event.defaultPrevented) {
        return;
      }

      dispatch({
        type: ActionTypes.optionHover,
        option,
        event,
        props: propsWithDefaults,
      });
    };

  const createHandleKeyDown =
    (other: Record<string, React.EventHandler<any>>) =>
    (event: React.KeyboardEvent<HTMLElement>) => {
      other.onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      const keysToPreventDefault = [
        ' ',
        'Enter',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
        'PageUp',
        'PageDown',
      ];

      if (keysToPreventDefault.includes(event.key)) {
        event.preventDefault();
      }

      dispatch({
        type: ActionTypes.keyDown,
        event,
        props: propsWithDefaults,
      });

      // Handle text navigation
      if (event.key.length === 1) {
        const textCriteria = textCriteriaRef.current;
        const lowerKey = event.key.toLowerCase();
        const currentTime = performance.now();
        if (textCriteria.keys.length > 0) {
          // Reset text criteria ref
          if (textCriteria.lastTime && currentTime - textCriteria.lastTime > 500) {
            textCriteria.keys = [];
            textCriteria.repeating = true;
            textCriteria.previousKeyMatched = true;
          } else if (textCriteria.repeating && lowerKey !== textCriteria.keys[0]) {
            textCriteria.repeating = false;
          }
        }

        textCriteria.lastTime = currentTime;
        textCriteria.keys.push(lowerKey);

        const keepFocusOnCurrent =
          highlightedValue &&
          !textCriteria.repeating &&
          textCriteriaMatches(highlightedValue, textCriteria, optionStringifier);

        if (textCriteria.previousKeyMatched) {
          if (!keepFocusOnCurrent) {
            dispatch({
              type: ActionTypes.textNavigation,
              props: propsWithDefaults,
              isMatch: (value) => textCriteriaMatches(value, textCriteria, optionStringifier),
              startWithCurrentOption: !textCriteria.repeating,
            });
          }
        } else {
          textCriteria.previousKeyMatched = false;
        }
      }
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
        props: propsWithDefaults,
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

  const getOptionState = (option: TOption): OptionState => {
    let selected: boolean;
    const index = options.findIndex((opt) => optionComparer(opt, option));
    if (multiple) {
      selected = ((selectedValue as TOption[]) ?? []).some(
        (value) => value != null && optionComparer(option, value),
      );
    } else {
      selected = optionComparer(option, selectedValue as TOption);
    }

    const disabled = isOptionDisabled(option, index);

    return {
      selected,
      disabled,
      highlighted: highlightedIndex === index,
    };
  };

  const getOptionTabIndex = (optionState: OptionState) => {
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
  };

  const getOptionProps = <TOther extends EventHandlers = {}>(
    option: TOption,
    otherHandlers: TOther = {} as TOther,
  ): UseListboxOptionSlotProps<TOther> => {
    const optionState = getOptionState(option);
    const index = options.findIndex((opt) => optionComparer(opt, option));

    return {
      ...otherHandlers,
      'aria-disabled': optionState.disabled || undefined,
      'aria-selected': optionState.selected,
      tabIndex: getOptionTabIndex(optionState),
      id: optionIdGenerator(option, index),
      onClick: createHandleOptionClick(option, otherHandlers),
      onMouseOver: createHandleOptionMouseOver(option, otherHandlers),
      role: 'option',
    };
  };

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
