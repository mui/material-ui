import React from 'react';
import { ListboxState, UseListboxStrictProps, ListboxAction } from './types';

type OptionPredicate<TOption> = (option: TOption, index: number) => boolean;

const pageSize = 5;

function findValidOptionToHighlight<TOption>(
  index: number,
  direction: 'next' | 'previous',
  options: TOption[],
  focusDisabled: boolean,
  isOptionDisabled: OptionPredicate<TOption>,
  wrapAround: boolean,
): number {
  if (options.length === 0 || options.every((o, i) => isOptionDisabled(o, i))) {
    return -1;
  }

  let nextFocus = index;

  for (;;) {
    // Out of range
    if (
      (!wrapAround && direction === 'next' && nextFocus === options.length) ||
      (direction === 'previous' && nextFocus === -1)
    ) {
      return -1;
    }

    const nextFocusDisabled = focusDisabled
      ? false
      : isOptionDisabled(options[nextFocus], nextFocus);
    if (nextFocusDisabled) {
      nextFocus += direction === 'next' ? 1 : -1;
      if (wrapAround) {
        nextFocus %= options.length;
      }
    } else {
      return nextFocus;
    }
  }
}

function getNewHighlightedIndex<TOption>(
  options: TOption[],
  previouslyHighlightedIndex: number,
  diff: number | 'reset' | 'start' | 'end',
  direction: 'previous' | 'next',
  highlightDisabled: boolean,
  isOptionDisabled: OptionPredicate<TOption>,
  wrapAround: boolean,
) {
  const getNextIndex = () => {
    const maxIndex = options.length - 1;
    const defaultHighlightedIndex = -1;

    if (diff === 'reset') {
      return defaultHighlightedIndex;
    }

    if (diff === 'start') {
      return 0;
    }

    if (diff === 'end') {
      return maxIndex;
    }

    const newIndex = previouslyHighlightedIndex + diff;

    if (newIndex < 0) {
      if ((!wrapAround && previouslyHighlightedIndex !== -1) || Math.abs(diff) > 1) {
        return 0;
      }

      return maxIndex;
    }

    if (newIndex > maxIndex) {
      if (newIndex === maxIndex + 1) {
        return -1;
      }

      if (!wrapAround || Math.abs(diff) > 1) {
        return maxIndex;
      }

      return 0;
    }

    return newIndex;
  };

  const nextIndex = findValidOptionToHighlight(
    getNextIndex(),
    direction,
    options,
    highlightDisabled,
    isOptionDisabled,
    wrapAround,
  );
  return nextIndex;
}

function handleKeyDown<TOption>(
  event: React.KeyboardEvent,
  state: Readonly<ListboxState<TOption>>,
  props: UseListboxStrictProps<TOption>,
): ListboxState<TOption> {
  const {
    options,
    isOptionDisabled,
    disableListWrap,
    disabledItemsFocusable,
    isOptionEqualToValue,
    selectMultiple,
  } = props;

  const moveHighlight = (
    diff: number | 'reset' | 'start' | 'end',
    direction: 'next' | 'previous',
    wrapAround: boolean,
  ) => {
    return getNewHighlightedIndex(
      options,
      state.highlightedIndex,
      diff,
      direction,
      disabledItemsFocusable ?? false,
      isOptionDisabled ?? (() => false),
      wrapAround,
    );
  };

  switch (event.key) {
    case 'Home':
      return {
        ...state,
        highlightedIndex: moveHighlight('start', 'next', false),
      };

    case 'End':
      return {
        ...state,
        highlightedIndex: moveHighlight('end', 'previous', false),
      };

    case 'PageUp':
      return {
        ...state,
        highlightedIndex: moveHighlight(-pageSize, 'previous', false),
      };

    case 'PageDown':
      return {
        ...state,
        highlightedIndex: moveHighlight(pageSize, 'next', false),
      };

    case 'ArrowUp':
      // TODO: extend current selection with Shift modifier
      return {
        ...state,
        highlightedIndex: moveHighlight(-1, 'previous', !(disableListWrap ?? false)),
      };

    case 'ArrowDown':
      // TODO: extend current selection with Shift modifier
      return {
        ...state,
        highlightedIndex: moveHighlight(1, 'next', !(disableListWrap ?? false)),
      };

    case 'Enter':
      if (state.highlightedIndex !== -1) {
        const option = options[state.highlightedIndex];
        const disabled = isOptionDisabled
          ? isOptionDisabled(option, state.highlightedIndex)
          : false;

        if (disabled) {
          return state;
        }

        if (selectMultiple) {
          if (
            ((state.selectedValue as TOption[]) ?? []).some((o) => isOptionEqualToValue(o, option))
          ) {
            return {
              ...state,
              selectedValue: (state.selectedValue as TOption[]).filter(
                (o) => !isOptionEqualToValue(o, option),
              ),
            };
          }

          return {
            ...state,
            selectedValue: [...((state.selectedValue as TOption[]) ?? []), option],
          };
        }

        return {
          ...state,
          selectedValue: option,
        };
      }
      break;

    case ' ': {
      if (!props.selectMultiple || state.highlightedIndex === -1) {
        return state;
      }

      const option = options[state.highlightedIndex];
      if (isOptionDisabled ? isOptionDisabled(option, state.highlightedIndex) : false) {
        return state;
      }

      if (((state.selectedValue as TOption[]) ?? []).some((o) => isOptionEqualToValue(o, option))) {
        return {
          ...state,
          selectedValue: (state.selectedValue as TOption[]).filter(
            (o) => !isOptionEqualToValue(o, option),
          ),
        };
      }

      return {
        ...state,
        selectedValue: [...((state.selectedValue as TOption[]) ?? []), option],
      };
    }

    default:
      break;
  }

  return state;
}

function handleOptionClick<TOption>(
  option: TOption,
  optionIndex: number,
  state: ListboxState<TOption>,
  props: UseListboxStrictProps<TOption>,
): ListboxState<TOption> {
  const {
    selectMultiple,
    isOptionEqualToValue = (o, v) => o === v,
    isOptionDisabled = () => false,
  } = props;
  const { selectedValue } = state;

  if (isOptionDisabled(option, optionIndex)) {
    return state;
  }

  if (selectMultiple) {
    const newSelectedValue = ((selectedValue as TOption[]) ?? []).some((v) =>
      isOptionEqualToValue(v, option),
    )
      ? (selectedValue as TOption[]).filter((v) => !isOptionEqualToValue(v, option))
      : [...((selectedValue as TOption[]) ?? []), option];
    return {
      ...state,
      selectedValue: newSelectedValue,
      highlightedIndex: optionIndex,
    };
  }

  if (selectedValue != null && isOptionEqualToValue(option, selectedValue as TOption)) {
    return state;
  }

  return {
    ...state,
    selectedValue: option,
    highlightedIndex: optionIndex,
  };
}

function handleBlur<TOption>(state: ListboxState<TOption>): ListboxState<TOption> {
  return {
    ...state,
    highlightedIndex: -1,
  };
}

export default function defaultStateReducer<TOption>(
  state: Readonly<ListboxState<TOption>>,
  action: ListboxAction<TOption>,
): Readonly<ListboxState<TOption>> {
  const { type } = action;

  switch (type) {
    case 'keyDown':
      return handleKeyDown(action.event, state, action.props);
    case 'itemClick':
      return handleOptionClick(action.option, action.optionIndex, state, action.props);
    case 'blur':
      return handleBlur(state);
    case 'setControlledValue':
      return {
        ...state,
        selectedValue: action.value,
      };
    default:
      return state;
  }
}
