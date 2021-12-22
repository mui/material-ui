import React from 'react';
import { ListboxState, UseListboxStrictProps, ListboxAction, ActionTypes } from './types';

type OptionPredicate<TOption> = (option: TOption, index: number) => boolean;

const pageSize = 5;

function findValidOptionToHighlight<TOption>(
  index: number,
  lookupDirection: 'next' | 'previous',
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
    // No valid options found
    if (
      (!wrapAround && lookupDirection === 'next' && nextFocus === options.length) ||
      (!wrapAround && lookupDirection === 'previous' && nextFocus === -1)
    ) {
      return -1;
    }

    const nextFocusDisabled = focusDisabled
      ? false
      : isOptionDisabled(options[nextFocus], nextFocus);
    if (nextFocusDisabled) {
      nextFocus += lookupDirection === 'next' ? 1 : -1;
      if (wrapAround) {
        nextFocus = (nextFocus + options.length) % options.length;
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
  lookupDirection: 'previous' | 'next',
  highlightDisabled: boolean,
  isOptionDisabled: OptionPredicate<TOption>,
  wrapAround: boolean,
) {
  const maxIndex = options.length - 1;
  const defaultHighlightedIndex = -1;
  let nextIndexCandidate: number;

  if (diff === 'reset') {
    return defaultHighlightedIndex;
  }

  if (diff === 'start') {
    nextIndexCandidate = 0;
  } else if (diff === 'end') {
    nextIndexCandidate = maxIndex;
  } else {
    const newIndex = previouslyHighlightedIndex + diff;

    if (newIndex < 0) {
      if ((!wrapAround && previouslyHighlightedIndex !== -1) || Math.abs(diff) > 1) {
        nextIndexCandidate = 0;
      } else {
        nextIndexCandidate = maxIndex;
      }
    } else if (newIndex > maxIndex) {
      if (!wrapAround || Math.abs(diff) > 1) {
        nextIndexCandidate = maxIndex;
      } else {
        nextIndexCandidate = 0;
      }
    } else {
      nextIndexCandidate = newIndex;
    }
  }

  const nextIndex = findValidOptionToHighlight(
    nextIndexCandidate,
    lookupDirection,
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
    optionComparer,
    multiple: selectMultiple,
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
    case ' ':
      if (state.highlightedIndex !== -1) {
        const option = options[state.highlightedIndex];
        const disabled = isOptionDisabled
          ? isOptionDisabled(option, state.highlightedIndex)
          : false;

        if (disabled) {
          return state;
        }

        if (selectMultiple) {
          if (((state.selectedValue as TOption[]) ?? []).some((o) => optionComparer(o, option))) {
            return {
              ...state,
              selectedValue: (state.selectedValue as TOption[]).filter(
                (o) => !optionComparer(o, option),
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

    default:
      break;
  }

  return state;
}

function handleOptionClick<TOption>(
  option: TOption,
  state: ListboxState<TOption>,
  props: UseListboxStrictProps<TOption>,
): ListboxState<TOption> {
  const {
    multiple: selectMultiple,
    optionComparer = (o, v) => o === v,
    isOptionDisabled = () => false,
  } = props;
  const { selectedValue } = state;

  const optionIndex = props.options.indexOf(option);

  if (isOptionDisabled(option, optionIndex)) {
    return state;
  }

  if (selectMultiple) {
    const newSelectedValue = ((selectedValue as TOption[]) ?? []).some((v) =>
      optionComparer(v, option),
    )
      ? (selectedValue as TOption[]).filter((v) => !optionComparer(v, option))
      : [...((selectedValue as TOption[]) ?? []), option];
    return {
      ...state,
      selectedValue: newSelectedValue,
      highlightedIndex: optionIndex,
    };
  }

  if (selectedValue != null && optionComparer(option, selectedValue as TOption)) {
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

function handleOptionsChange<TOption>(
  options: TOption[],
  previousOptions: TOption[],
  state: ListboxState<TOption>,
  props: UseListboxStrictProps<TOption>,
): ListboxState<TOption> {
  const highlightedOption = previousOptions[state.highlightedIndex];
  const hightlightedOptionNewIndex = options.findIndex((option) =>
    props.optionComparer(option, highlightedOption),
  );

  if (props.multiple) {
    // exclude selected values that are no longer in the options
    const newSelectedValues = ((state.selectedValue ?? []) as TOption[]).filter((selectedValue) =>
      options.some((option) => props.optionComparer(option, selectedValue)),
    );

    return {
      ...state,
      highlightedIndex: hightlightedOptionNewIndex,
      selectedValue: newSelectedValues,
    };
  }

  const newSelectedValue =
    options.find((option) => props.optionComparer(option, state.selectedValue as TOption)) ?? null;

  return {
    ...state,
    highlightedIndex: hightlightedOptionNewIndex,
    selectedValue: newSelectedValue,
  };
}

export default function defaultListboxReducer<TOption>(
  state: Readonly<ListboxState<TOption>>,
  action: ListboxAction<TOption>,
): Readonly<ListboxState<TOption>> {
  const { type } = action;

  switch (type) {
    case ActionTypes.keyDown:
      return handleKeyDown(action.event, state, action.props);
    case ActionTypes.optionClick:
      return handleOptionClick(action.option, state, action.props);
    case ActionTypes.blur:
      return handleBlur(state);
    case ActionTypes.setControlledValue:
      return {
        ...state,
        selectedValue: action.value,
      };
    case ActionTypes.optionsChange:
      return handleOptionsChange(action.options, action.previousOptions, state, action.props);
    default:
      return state;
  }
}
