import React from 'react';
import {
  ListboxState,
  UseListboxStrictProps,
  ListboxAction,
  ActionTypes,
} from './useListbox.types';

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

function getNewHighlightedOption<TOption>(
  options: TOption[],
  previouslyHighlightedOption: TOption | null,
  diff: number | 'reset' | 'start' | 'end',
  lookupDirection: 'previous' | 'next',
  highlightDisabled: boolean,
  isOptionDisabled: OptionPredicate<TOption>,
  wrapAround: boolean,
  optionComparer: (optionA: TOption, optionB: TOption) => boolean,
): TOption | null {
  const maxIndex = options.length - 1;
  const defaultHighlightedIndex = -1;
  let nextIndexCandidate: number;
  const previouslyHighlightedIndex =
    previouslyHighlightedOption == null
      ? -1
      : options.findIndex((option) => optionComparer(option, previouslyHighlightedOption));

  if (diff === 'reset') {
    return defaultHighlightedIndex === -1 ? null : options[defaultHighlightedIndex] ?? null;
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

  return options[nextIndex] ?? null;
}

function handleOptionSelection<TOption>(
  option: TOption,
  state: ListboxState<TOption>,
  props: UseListboxStrictProps<TOption>,
): ListboxState<TOption> {
  const { multiple, optionComparer = (o, v) => o === v, isOptionDisabled = () => false } = props;
  const { selectedValue } = state;

  const optionIndex = props.options.indexOf(option);

  if (isOptionDisabled(option, optionIndex)) {
    return state;
  }

  if (multiple) {
    const selectedValues = (selectedValue as TOption[]) ?? [];
    // if the option is already selected, remove it from the selection, otherwise add it
    const newSelectedValues = selectedValues.some((sv) => optionComparer(sv, option))
      ? (selectedValue as TOption[]).filter((v) => !optionComparer(v, option))
      : [...((selectedValue as TOption[]) ?? []), option];

    return {
      selectedValue: newSelectedValues,
      highlightedValue: option,
    };
  }

  if (selectedValue != null && optionComparer(option, selectedValue as TOption)) {
    return state;
  }

  return {
    selectedValue: option,
    highlightedValue: option,
  };
}

function handleKeyDown<TOption>(
  event: React.KeyboardEvent,
  state: Readonly<ListboxState<TOption>>,
  props: UseListboxStrictProps<TOption>,
): ListboxState<TOption> {
  const { options, isOptionDisabled, disableListWrap, disabledItemsFocusable, optionComparer } =
    props;

  const moveHighlight = (
    diff: number | 'reset' | 'start' | 'end',
    direction: 'next' | 'previous',
    wrapAround: boolean,
  ) => {
    return getNewHighlightedOption(
      options,
      state.highlightedValue,
      diff,
      direction,
      disabledItemsFocusable ?? false,
      isOptionDisabled ?? (() => false),
      wrapAround,
      optionComparer,
    );
  };

  switch (event.key) {
    case 'Home':
      return {
        ...state,
        highlightedValue: moveHighlight('start', 'next', false),
      };

    case 'End':
      return {
        ...state,
        highlightedValue: moveHighlight('end', 'previous', false),
      };

    case 'PageUp':
      return {
        ...state,
        highlightedValue: moveHighlight(-pageSize, 'previous', false),
      };

    case 'PageDown':
      return {
        ...state,
        highlightedValue: moveHighlight(pageSize, 'next', false),
      };

    case 'ArrowUp':
      // TODO: extend current selection with Shift modifier
      return {
        ...state,
        highlightedValue: moveHighlight(-1, 'previous', !(disableListWrap ?? false)),
      };

    case 'ArrowDown':
      // TODO: extend current selection with Shift modifier
      return {
        ...state,
        highlightedValue: moveHighlight(1, 'next', !(disableListWrap ?? false)),
      };

    case 'Enter':
    case ' ':
      if (state.highlightedValue === null) {
        return state;
      }

      return handleOptionSelection(state.highlightedValue, state, props);

    default:
      break;
  }

  return state;
}

function handleBlur<TOption>(state: ListboxState<TOption>): ListboxState<TOption> {
  return {
    ...state,
    highlightedValue: null,
  };
}

const textCriteriaMatches = <TOption>(
  nextFocus: TOption,
  searchString: string,
  stringifyOption: (option: TOption) => string | undefined,
) => {
  const text = stringifyOption(nextFocus)?.trim().toLowerCase();

  if (!text || text.length === 0) {
    // Make option not navigable if stringification fails or results in empty string.
    return false;
  }

  return text.indexOf(searchString) === 0;
};

function handleTextNavigation<TOption>(
  state: ListboxState<TOption>,
  searchString: string,
  props: UseListboxStrictProps<TOption>,
): ListboxState<TOption> {
  const {
    options,
    isOptionDisabled,
    disableListWrap,
    disabledItemsFocusable,
    optionComparer,
    optionStringifier,
  } = props;

  const moveHighlight = (previouslyHighlightedOption: TOption | null) => {
    return getNewHighlightedOption(
      options,
      previouslyHighlightedOption,
      1,
      'next',
      disabledItemsFocusable ?? false,
      isOptionDisabled ?? (() => false),
      !(disableListWrap ?? false),
      optionComparer,
    );
  };

  const startWithCurrentOption = searchString.length > 1;

  let nextOption = startWithCurrentOption
    ? state.highlightedValue
    : moveHighlight(state.highlightedValue);

  // use `for` instead of `while` prevent infinite loop
  for (let index = 0; index < options.length; index += 1) {
    // Return un-mutated state if looped back to the currently highlighted value
    if (!nextOption || (!startWithCurrentOption && state.highlightedValue === nextOption)) {
      return state;
    }

    if (
      textCriteriaMatches(nextOption, searchString, optionStringifier) &&
      (!isOptionDisabled(nextOption, options.indexOf(nextOption)) || disabledItemsFocusable)
    ) {
      // The nextOption is the element to be highlighted
      return {
        ...state,
        highlightedValue: nextOption,
      };
    }
    // Move to the next element.
    nextOption = moveHighlight(nextOption);
  }

  // No option match text search criteria
  return state;
}

function handleOptionsChange<TOption>(
  options: TOption[],
  previousOptions: TOption[],
  state: ListboxState<TOption>,
  props: UseListboxStrictProps<TOption>,
): ListboxState<TOption> {
  const { multiple, optionComparer } = props;

  const newHighlightedOption =
    state.highlightedValue == null
      ? null
      : options.find((option) => optionComparer(option, state.highlightedValue!)) ?? null;

  if (multiple) {
    // exclude selected values that are no longer in the options
    const selectedValues = (state.selectedValue as TOption[]) ?? [];
    const newSelectedValues = selectedValues.filter((selectedValue) =>
      options.some((option) => optionComparer(option, selectedValue)),
    );

    return {
      highlightedValue: newHighlightedOption,
      selectedValue: newSelectedValues,
    };
  }

  const newSelectedValue =
    options.find((option) => optionComparer(option, state.selectedValue as TOption)) ?? null;

  return {
    highlightedValue: newHighlightedOption,
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
      return handleOptionSelection(action.option, state, action.props);
    case ActionTypes.blur:
      return handleBlur(state);
    case ActionTypes.setValue:
      return {
        ...state,
        selectedValue: action.value,
      };
    case ActionTypes.setHighlight:
      return {
        ...state,
        highlightedValue: action.highlight,
      };
    case ActionTypes.textNavigation:
      return handleTextNavigation(state, action.searchString, action.props);
    case ActionTypes.optionsChange:
      return handleOptionsChange(action.options, action.previousOptions, state, action.props);
    default:
      return state;
  }
}
