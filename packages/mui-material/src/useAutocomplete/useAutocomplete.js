'use client';

import * as React from 'react';
import contains from '@mui/utils/contains';
import setRef from '@mui/utils/setRef';
import useEventCallback from '@mui/utils/useEventCallback';
import useControlled from '@mui/utils/useControlled';
import useId from '@mui/utils/useId';
import usePreviousProps from '@mui/utils/usePreviousProps';

function areArraysSame({ array1, array2, parser = (value) => value }) {
  return (
    array1 &&
    array2 &&
    array1.length === array2.length &&
    array1.every((prevOption, index) => parser(prevOption) === parser(array2[index]))
  );
}

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
function stripDiacritics(string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = 'any',
    stringify,
    trim = false,
  } = config;

  return (options, { inputValue, getOptionLabel }) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }

    const filteredOptions = !input
      ? options
      : options.filter((option) => {
          let candidate = (stringify || getOptionLabel)(option);
          if (ignoreCase) {
            candidate = candidate.toLowerCase();
          }
          if (ignoreAccents) {
            candidate = stripDiacritics(candidate);
          }

          return matchFrom === 'start' ? candidate.startsWith(input) : candidate.includes(input);
        });

    return typeof limit === 'number' ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}

const defaultFilterOptions = createFilterOptions();

// Number of options to jump in list box when `Page Up` and `Page Down` keys are used.
const pageSize = 5;

const defaultIsActiveElementInListbox = (listboxRef) =>
  listboxRef.current !== null && contains(listboxRef.current.parentElement, document.activeElement);

const defaultIsOptionEqualToValue = (option, value) => option === value;

const MULTIPLE_DEFAULT_VALUE = [];

function getInputValue(value, multiple, getOptionLabel, renderValue) {
  if (multiple || value == null || renderValue) {
    return '';
  }
  const optionLabel = getOptionLabel(value);
  return typeof optionLabel === 'string' ? optionLabel : '';
}

function useAutocomplete(props) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_isActiveElementInListbox = defaultIsActiveElementInListbox,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_classNamePrefix = 'Mui',
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    componentName = 'useAutocomplete',
    defaultValue = props.multiple ? MULTIPLE_DEFAULT_VALUE : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled: disabledProp,
    disabledItemsFocusable = false,
    disableListWrap = false,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionKey,
    getOptionLabel: getOptionLabelProp = (option) => option.label ?? option,
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    isOptionEqualToValue = defaultIsOptionEqualToValue,
    multiple = false,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open: openProp,
    openOnFocus = false,
    options,
    readOnly = false,
    renderValue,
    resetHighlightOnMouseLeave = false,
    selectOnFocus = !props.freeSolo,
    value: valueProp,
  } = props;

  const id = useId(idProp);

  let getOptionLabel = getOptionLabelProp;

  getOptionLabel = (option) => {
    const optionLabel = getOptionLabelProp(option);
    if (typeof optionLabel !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        const erroneousReturn =
          optionLabel === undefined ? 'undefined' : `${typeof optionLabel} (${optionLabel})`;
        console.error(
          `MUI: The \`getOptionLabel\` method of ${componentName} returned ${erroneousReturn} instead of a string for ${JSON.stringify(
            option,
          )}.`,
        );
      }
      return String(optionLabel);
    }
    return optionLabel;
  };

  const ignoreFocus = React.useRef(false);
  const firstFocus = React.useRef(true);
  const inputRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const windowLostFocus = React.useRef(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [focusedItem, setFocusedItem] = React.useState(-1);
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = React.useRef(defaultHighlighted);

  // Tracks how the current highlight was set:
  // - 'keyboard' — arrow keys, Home/End, PageUp/PageDown
  // - 'mouse'    — handleOptionMouseMove
  // - 'touch'    — handleOptionTouchStart
  // - null       — programmatic (autoHighlight, value sync)
  //
  // This lets handleBlur and the Enter handler distinguish intentional
  // interactions from incidental ones — e.g. autoSelect should not commit
  // a highlight that came from a casual mouse hover.
  /** @type {React.RefObject<AutocompleteHighlightChangeReason | null>} */
  const highlightReasonRef = React.useRef(null);

  const touchScrolledRef = React.useRef(false);
  const isTouchRef = React.useRef(false);

  // Calculate the initial inputValue on mount only.
  // useRef ensures it doesn't update dynamically with defaultValue or value props.
  const initialInputValue = React.useRef(
    getInputValue(defaultValue ?? valueProp, multiple, getOptionLabel),
  ).current;

  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName,
  });
  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: initialInputValue,
    name: componentName,
    state: 'inputValue',
  });

  const [focused, setFocused] = React.useState(false);

  const resetInputValue = React.useCallback(
    (event, newValue, reason) => {
      // Retain the current `inputValue` when no new option is selected and `clearOnBlur` is false.
      // In `multiple` mode, `newValue` is the next value array, so only length growth counts as a selection.
      const isOptionSelected = multiple ? value.length < newValue.length : newValue !== null;
      // A controlled single-value `freeSolo` reset to `null` should still clear the input.
      const shouldClearOnReset = reason === 'reset' && freeSolo && !multiple && newValue === null;
      if (!isOptionSelected && !clearOnBlur && !shouldClearOnReset) {
        return;
      }
      const newInputValue = getInputValue(newValue, multiple, getOptionLabel, renderValue);

      if (inputValue === newInputValue) {
        return;
      }

      setInputValueState(newInputValue);

      if (onInputChange) {
        onInputChange(event, newInputValue, reason);
      }
    },
    [
      getOptionLabel,
      inputValue,
      multiple,
      onInputChange,
      setInputValueState,
      clearOnBlur,
      freeSolo,
      value,
      renderValue,
    ],
  );

  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: 'open',
  });

  const [inputPristine, setInputPristine] = React.useState(true);

  const inputValueIsSelectedValue =
    !multiple && value != null && inputValue === getOptionLabel(value);

  const popupOpen = open && !readOnly;
  const selectedValues = React.useMemo(() => {
    if (multiple) {
      return value;
    }

    if (value != null) {
      return [value];
    }

    return [];
  }, [multiple, value]);
  const selectedValuesSet = React.useMemo(() => {
    // Fast path for the default strict equality comparator to avoid O(n^2) option checks.
    if (isOptionEqualToValue !== defaultIsOptionEqualToValue || selectedValues.length === 0) {
      return null;
    }

    return new Set(selectedValues);
  }, [isOptionEqualToValue, selectedValues]);
  const isOptionSelected = React.useCallback(
    (option) => {
      if (selectedValuesSet) {
        return selectedValuesSet.has(option);
      }

      return selectedValues.some(
        (value2) => value2 != null && isOptionEqualToValue(option, value2),
      );
    },
    [isOptionEqualToValue, selectedValues, selectedValuesSet],
  );

  const filteredOptions = popupOpen
    ? filterOptions(
        options.filter((option) => {
          if (filterSelectedOptions && isOptionSelected(option)) {
            return false;
          }
          return true;
        }),
        // we use the empty string to manipulate `filterOptions` to not filter any options
        // i.e. the filter predicate always returns true
        {
          inputValue: inputValueIsSelectedValue && inputPristine ? '' : inputValue,
          getOptionLabel,
        },
      )
    : [];

  const previousProps = usePreviousProps({
    filteredOptions,
    value,
    inputValue,
  });

  React.useEffect(() => {
    const valueChange = value !== previousProps.value;

    if (focused && !valueChange) {
      return;
    }

    // Only reset the input's value when freeSolo if the component's value changes.
    if (freeSolo && !valueChange) {
      return;
    }

    resetInputValue(null, value, 'reset');
  }, [value, resetInputValue, focused, previousProps.value, freeSolo]);

  const listboxAvailable = open && filteredOptions.length > 0 && !readOnly;

  const focusItem = useEventCallback((itemToFocus) => {
    if (itemToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-item-index="${itemToFocus}"]`).focus();
    }
  });

  // Ensure the focusedItem is never inconsistent
  React.useEffect(() => {
    if (multiple && focusedItem > value.length - 1) {
      setFocusedItem(-1);
      focusItem(-1);
    }
  }, [value, multiple, focusedItem, focusItem]);

  function validOptionIndex(index, direction) {
    if (!listboxRef.current || index < 0 || index >= filteredOptions.length) {
      return -1;
    }

    let nextFocus = index;

    while (true) {
      const option = listboxRef.current.querySelector(`[data-option-index="${nextFocus}"]`);

      // Same logic as MenuList.js
      const nextFocusDisabled = disabledItemsFocusable
        ? false
        : !option || option.disabled || option.getAttribute('aria-disabled') === 'true';

      if (option && option.hasAttribute('tabindex') && !nextFocusDisabled) {
        // The next option is available
        return nextFocus;
      }

      // The next option is disabled, move to the next element.
      // with looped index
      if (direction === 'next') {
        nextFocus = (nextFocus + 1) % filteredOptions.length;
      } else {
        nextFocus = (nextFocus - 1 + filteredOptions.length) % filteredOptions.length;
      }

      // We end up with initial index, that means we don't have available options.
      // All of them are disabled
      if (nextFocus === index) {
        return -1;
      }
    }
  }

  const syncHighlightedIndexToDOM = useEventCallback(
    ({ index, reason, preserveScroll = false }) => {
      // does the index exist?
      if (index === -1) {
        inputRef.current.removeAttribute('aria-activedescendant');
      } else {
        inputRef.current.setAttribute('aria-activedescendant', `${id}-option-${index}`);
      }

      if (!listboxRef.current) {
        return;
      }

      const prev = listboxRef.current.querySelector(
        `[role="option"].${unstable_classNamePrefix}-focused`,
      );
      if (prev) {
        prev.classList.remove(`${unstable_classNamePrefix}-focused`);
        prev.classList.remove(`${unstable_classNamePrefix}-focusVisible`);
      }

      let listboxNode = listboxRef.current;
      if (listboxRef.current.getAttribute('role') !== 'listbox') {
        listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]');
      }

      // "No results"
      if (!listboxNode) {
        return;
      }

      if (index === -1) {
        if (!preserveScroll) {
          listboxNode.scrollTop = 0;
        }
        return;
      }

      const option = listboxRef.current.querySelector(`[data-option-index="${index}"]`);

      if (!option) {
        return;
      }

      option.classList.add(`${unstable_classNamePrefix}-focused`);
      if (reason === 'keyboard') {
        option.classList.add(`${unstable_classNamePrefix}-focusVisible`);
      }

      // Scroll active descendant into view.
      // Logic copied from https://www.w3.org/WAI/content-assets/wai-aria-practices/patterns/combobox/examples/js/select-only.js
      // In case of mouse clicks and touch (in mobile devices) we avoid scrolling the element and keep both behaviors same.
      // Consider this API instead once it has a better browser support:
      // .scrollIntoView({ scrollMode: 'if-needed', block: 'nearest' });
      if (
        listboxNode.scrollHeight > listboxNode.clientHeight &&
        reason !== 'mouse' &&
        reason !== 'touch'
      ) {
        const element = option;

        const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
        const elementBottom = element.offsetTop + element.offsetHeight;
        if (elementBottom > scrollBottom) {
          listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
        } else if (
          element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) <
          listboxNode.scrollTop
        ) {
          listboxNode.scrollTop = element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
        }
      }
    },
  );

  const setHighlightedIndex = useEventCallback(
    ({ event, index, reason, preserveScroll = false }) => {
      highlightedIndexRef.current = index;
      highlightReasonRef.current = reason ?? null;

      if (onHighlightChange && ['mouse', 'keyboard', 'touch'].includes(reason)) {
        onHighlightChange(event, index === -1 ? null : filteredOptions[index], reason);
      }

      syncHighlightedIndexToDOM({ index, reason, preserveScroll });
    },
  );

  const setHighlightedIndexFromSync = useEventCallback(({ index }) => {
    highlightedIndexRef.current = index;
    syncHighlightedIndexToDOM({
      index,
      reason: highlightReasonRef.current,
    });
  });

  const changeHighlightedIndex = useEventCallback(
    ({ event, diff, direction = 'next', reason, preserveScroll }) => {
      if (!popupOpen) {
        return;
      }

      if (reason === 'keyboard') {
        touchScrolledRef.current = false;
        isTouchRef.current = false;
      }

      const getNextIndex = () => {
        const maxIndex = filteredOptions.length - 1;

        if (diff === 'reset') {
          return defaultHighlighted;
        }

        if (diff === 'start') {
          return 0;
        }

        if (diff === 'end') {
          return maxIndex;
        }

        const newIndex = highlightedIndexRef.current + diff;

        if (newIndex < 0) {
          if (newIndex === -1 && includeInputInList) {
            return -1;
          }

          if ((disableListWrap && highlightedIndexRef.current !== -1) || Math.abs(diff) > 1) {
            return 0;
          }

          return maxIndex;
        }

        if (newIndex > maxIndex) {
          if (newIndex === maxIndex + 1 && includeInputInList) {
            return -1;
          }

          if (disableListWrap || Math.abs(diff) > 1) {
            return maxIndex;
          }

          return 0;
        }

        return newIndex;
      };

      const nextIndex = validOptionIndex(getNextIndex(), direction);
      setHighlightedIndex({ index: nextIndex, reason, event, preserveScroll });

      // Sync the content of the input with the highlighted option.
      if (autoComplete && diff !== 'reset') {
        if (nextIndex === -1) {
          inputRef.current.value = inputValue;
        } else {
          const option = getOptionLabel(filteredOptions[nextIndex]);
          inputRef.current.value = option;

          // The portion of the selected suggestion that has not been typed by the user,
          // a completion string, appears inline after the input cursor in the textbox.
          const index = option.toLowerCase().indexOf(inputValue.toLowerCase());
          if (index === 0 && inputValue.length > 0) {
            inputRef.current.setSelectionRange(inputValue.length, option.length);
          }
        }
      }
    },
  );

  const filteredOptionsChanged = !areArraysSame({
    array1: previousProps.filteredOptions,
    array2: filteredOptions,
    parser: getOptionLabel,
  });

  const getPreviousHighlightedOptionIndex = () => {
    const isSameValue = (value1, value2) => {
      const label1 = value1 ? getOptionLabel(value1) : '';
      const label2 = value2 ? getOptionLabel(value2) : '';
      return label1 === label2;
    };

    if (
      highlightedIndexRef.current !== -1 &&
      !areArraysSame({
        array1: previousProps.filteredOptions,
        array2: filteredOptions,
        parser: getOptionLabel,
      }) &&
      previousProps.inputValue === inputValue &&
      (multiple
        ? value.length === previousProps.value.length &&
          previousProps.value.every((val, i) => getOptionLabel(value[i]) === getOptionLabel(val))
        : isSameValue(previousProps.value, value))
    ) {
      const previousHighlightedOption = previousProps.filteredOptions[highlightedIndexRef.current];

      if (previousHighlightedOption) {
        return filteredOptions.findIndex((option) => {
          return getOptionLabel(option) === getOptionLabel(previousHighlightedOption);
        });
      }
    }
    return -1;
  };

  const syncHighlightedIndex = React.useCallback(() => {
    if (!popupOpen) {
      return;
    }

    // Check if the previously highlighted option still exists in the updated filtered options list and if the value and inputValue haven't changed
    // If it exists and the value and the inputValue haven't changed, just update its index, otherwise continue execution
    const previousHighlightedOptionIndex = getPreviousHighlightedOptionIndex();
    if (previousHighlightedOptionIndex !== -1) {
      // Keep the original highlight reason while re-syncing the DOM state.
      // The highlighted option still exists after the filteredOptions array changed
      // (e.g. async fetch returns new options while the user is mid-navigation),
      // so the original interaction reason (keyboard, mouse, etc.) still applies.
      setHighlightedIndexFromSync({ index: previousHighlightedOptionIndex });
      return;
    }

    const valueItem = multiple ? value[0] : value;

    // The popup is empty, reset
    if (filteredOptions.length === 0 || valueItem == null) {
      // Preserve scroll when new options are appended without changing the current filter.
      const isAppendOnly =
        filteredOptionsChanged &&
        previousProps.inputValue === inputValue &&
        previousProps.filteredOptions?.length > 0 &&
        filteredOptions.length > previousProps.filteredOptions.length &&
        previousProps.filteredOptions.every(
          (option, index) => getOptionLabel(option) === getOptionLabel(filteredOptions[index]),
        );

      changeHighlightedIndex({ diff: 'reset', preserveScroll: isAppendOnly });
      return;
    }

    if (!listboxRef.current) {
      return;
    }

    // Synchronize the value with the highlighted index
    if (valueItem != null) {
      const currentOption = filteredOptions[highlightedIndexRef.current];

      // Keep the current selected highlight while the popup stays open;
      // on reopen, resync from the selected value.
      if (
        multiple &&
        currentOption &&
        value.findIndex((val) => isOptionEqualToValue(currentOption, val)) !== -1 &&
        previousProps.filteredOptions?.length > 0
      ) {
        setHighlightedIndexFromSync({ index: highlightedIndexRef.current });
        return;
      }

      const itemIndex = filteredOptions.findIndex((optionItem) =>
        isOptionEqualToValue(optionItem, valueItem),
      );
      if (itemIndex === -1) {
        changeHighlightedIndex({ diff: 'reset' });
      } else {
        setHighlightedIndex({ index: itemIndex });
      }
      return;
    }

    // Prevent the highlighted index to leak outside the boundaries.
    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex({ index: filteredOptions.length - 1 });
      return;
    }

    // Restore the focus to the previous index.
    setHighlightedIndex({ index: highlightedIndexRef.current });
    // Ignore filteredOptions (and options, isOptionEqualToValue, getOptionLabel) not to break the scroll position
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // Only sync the highlighted index when the option switch between empty and not
    filteredOptions.length,
    // Don't sync the highlighted index with the value when multiple
    // eslint-disable-next-line react-hooks/exhaustive-deps
    multiple ? false : value,
    changeHighlightedIndex,
    setHighlightedIndex,
    setHighlightedIndexFromSync,
    popupOpen,
    inputValue,
    multiple,
  ]);

  const handleListboxRef = useEventCallback((node) => {
    setRef(listboxRef, node);

    if (!node) {
      return;
    }

    syncHighlightedIndex();
  });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (!inputRef.current || inputRef.current.nodeName !== 'INPUT') {
        if (inputRef.current && inputRef.current.nodeName === 'TEXTAREA') {
          console.warn(
            [
              `A textarea element was provided to ${componentName} where input was expected.`,
              `This is not a supported scenario but it may work under certain conditions.`,
              `A textarea keyboard navigation may conflict with Autocomplete controls (for example enter and arrow keys).`,
              `Make sure to test keyboard navigation and add custom event handlers if necessary.`,
            ].join('\n'),
          );
        } else {
          console.error(
            [
              `MUI: Unable to find the input element. It was resolved to ${inputRef.current} while an HTMLInputElement was expected.`,
              `Instead, ${componentName} expects an input element.`,
              '',
              componentName === 'useAutocomplete'
                ? 'Make sure you have bound getInputProps correctly and that the normal ref/effect resolutions order is guaranteed.'
                : 'Make sure you have customized the input component correctly.',
            ].join('\n'),
          );
        }
      }
    }, [componentName]);
  }

  React.useEffect(() => {
    if (filteredOptionsChanged || (popupOpen && !disableCloseOnSelect)) {
      syncHighlightedIndex();
    }
  }, [syncHighlightedIndex, filteredOptionsChanged, popupOpen, disableCloseOnSelect]);

  // Listen for browser window blur to detect when the user switches tabs or windows.
  // This helps prevent the popup from reopening automatically when the window regains focus.
  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleWindowBlur = () => {
      windowLostFocus.current = true;
    };

    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  const handleOpen = (event) => {
    if (open) {
      return;
    }

    setOpenState(true);
    setInputPristine(true);
    isTouchRef.current = false;

    if (onOpen) {
      onOpen(event);
    }
  };

  const handleClose = (event, reason) => {
    if (!open) {
      return;
    }

    setOpenState(false);
    touchScrolledRef.current = false;
    highlightReasonRef.current = null;

    if (onClose) {
      onClose(event, reason);
    }
  };

  const handleValue = (event, newValue, reason, details) => {
    if (multiple) {
      if (value.length === newValue.length && value.every((val, i) => val === newValue[i])) {
        return;
      }
    } else if (value === newValue) {
      return;
    }

    if (onChange) {
      onChange(event, newValue, reason, details);
    }

    setValueState(newValue);
  };

  const selectNewValue = (event, option, reasonProp = 'selectOption', origin = 'options') => {
    let reason = reasonProp;
    let newValue = option;

    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];

      if (process.env.NODE_ENV !== 'production') {
        const matches = newValue.filter((val) => isOptionEqualToValue(option, val));

        if (matches.length > 1) {
          console.error(
            [
              `MUI: The \`isOptionEqualToValue\` method of ${componentName} does not handle the arguments correctly.`,
              `The component expects a single value to match a given option but found ${matches.length} matches.`,
            ].join('\n'),
          );
        }
      }

      const itemIndex = newValue.findIndex((valueItem) => isOptionEqualToValue(option, valueItem));

      if (itemIndex === -1) {
        newValue.push(option);
      } else if (origin !== 'freeSolo') {
        newValue.splice(itemIndex, 1);
        reason = 'removeOption';
      }
    }

    resetInputValue(event, newValue, reason);

    handleValue(event, newValue, reason, { option });
    if (!disableCloseOnSelect && (!event || (!event.ctrlKey && !event.metaKey))) {
      handleClose(event, reason);
    }

    if (
      blurOnSelect === true ||
      (blurOnSelect === 'touch' && isTouchRef.current) ||
      (blurOnSelect === 'mouse' && !isTouchRef.current)
    ) {
      inputRef.current.blur();
    }
  };

  function validItemIndex(index, direction) {
    if (index === -1) {
      return -1;
    }

    let nextFocus = index;

    while (true) {
      // Out of range
      if (
        (direction === 'next' && nextFocus === value.length) ||
        (direction === 'previous' && nextFocus === -1)
      ) {
        return -1;
      }

      const option = anchorEl.querySelector(`[data-item-index="${nextFocus}"]`);

      // Same logic as MenuList.js
      if (
        !option ||
        !option.hasAttribute('tabindex') ||
        option.disabled ||
        option.getAttribute('aria-disabled') === 'true'
      ) {
        nextFocus += direction === 'next' ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }

  const handleFocusItem = (event, direction) => {
    if (!multiple) {
      return;
    }

    if (inputValue === '') {
      handleClose(event, 'toggleInput');
    }

    let nextItem = focusedItem;

    // When moving focus from the input to tags with ArrowLeft,
    // always jump to the last tag (if any) from the input.
    if (focusedItem === -1 && direction === 'previous') {
      nextItem = value.length - 1;
      // In freeSolo, clear any draft text so it doesn't "come back" later.
      if (freeSolo && inputValue !== '') {
        setInputValueState('');
        if (onInputChange) {
          onInputChange(event, '', 'reset');
        }
      }
    } else {
      nextItem += direction === 'next' ? 1 : -1;

      if (nextItem < 0) {
        nextItem = 0;
      }

      if (nextItem === value.length) {
        nextItem = -1;
      }
    }

    nextItem = validItemIndex(nextItem, direction);

    setFocusedItem(nextItem);
    focusItem(nextItem);
  };

  const handleClear = (event) => {
    setInputValueState('');

    if (onInputChange) {
      onInputChange(event, '', 'clear');
    }

    handleValue(event, multiple ? [] : null, 'clear');
  };

  const handleKeyDown = (other) => (event) => {
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }

    if (event.defaultMuiPrevented) {
      return;
    }

    if (focusedItem !== -1 && !['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      setFocusedItem(-1);
      focusItem(-1);
    }

    // Wait until IME is settled.
    if (event.which !== 229) {
      switch (event.key) {
        case 'Home':
          if (popupOpen && handleHomeEndKeys) {
            // Prevent scroll of the page
            event.preventDefault();
            changeHighlightedIndex({ diff: 'start', direction: 'next', reason: 'keyboard', event });
          }
          break;
        case 'End':
          if (popupOpen && handleHomeEndKeys) {
            // Prevent scroll of the page
            event.preventDefault();
            changeHighlightedIndex({
              diff: 'end',
              direction: 'previous',
              reason: 'keyboard',
              event,
            });
          }
          break;
        case 'PageUp':
          // Prevent scroll of the page
          event.preventDefault();
          changeHighlightedIndex({
            diff: -pageSize,
            direction: 'previous',
            reason: 'keyboard',
            event,
          });
          handleOpen(event);
          break;
        case 'PageDown':
          // Prevent scroll of the page
          event.preventDefault();
          changeHighlightedIndex({ diff: pageSize, direction: 'next', reason: 'keyboard', event });
          handleOpen(event);
          break;
        case 'ArrowDown':
          // Prevent cursor move
          event.preventDefault();
          changeHighlightedIndex({ diff: 1, direction: 'next', reason: 'keyboard', event });
          handleOpen(event);
          break;
        case 'ArrowUp':
          // Prevent cursor move
          event.preventDefault();
          changeHighlightedIndex({ diff: -1, direction: 'previous', reason: 'keyboard', event });
          handleOpen(event);
          break;
        case 'ArrowLeft': {
          const input = inputRef.current;
          // Only handle ArrowLeft when the caret is at the start of the input.
          // Otherwise let the browser move the caret normally.
          const caretAtStart = input && input.selectionStart === 0 && input.selectionEnd === 0;

          if (!caretAtStart) {
            // Let the browser handle normal cursor movement
            return;
          }

          // Single-value rendering: move focus from input to the single tag.
          if (!multiple && renderValue && value != null) {
            // Moving from input to single tag; clear freeSolo draft text,
            // so it doesn't reappear when we move back.
            if (freeSolo && inputValue !== '') {
              setInputValueState('');
              if (onInputChange) {
                onInputChange(event, '', 'reset');
              }
            }
            setFocusedItem(0);
            focusItem(0);
          } else {
            // Multi-value: delegate to tag navigation helper.
            handleFocusItem(event, 'previous');
          }
          break;
        }
        case 'ArrowRight':
          if (!multiple && renderValue) {
            setFocusedItem(-1);
            focusItem(-1);
          } else {
            handleFocusItem(event, 'next');
          }
          break;
        case 'Enter': {
          // In freeSolo, only select the highlighted option if the user hasn't
          // typed new text (inputPristine) or explicitly interacted with an option
          // (keyboard, mouse, or touch — any non-null reason). This lets typed
          // text win over a programmatic highlight (reason=null, e.g. from
          // syncHighlightedIndex matching a previous value) while still honoring
          // deliberate user interactions like hovering a suggestion then pressing Enter.
          const shouldSelectHighlighted =
            !freeSolo || inputPristine || highlightReasonRef.current !== null;

          if (
            highlightedIndexRef.current !== -1 &&
            popupOpen &&
            shouldSelectHighlighted &&
            // After a touch-scroll the highlight is stale (the user scrolled
            // past it), so skip selection until the next deliberate interaction.
            !touchScrolledRef.current
          ) {
            const option = filteredOptions[highlightedIndexRef.current];
            const disabled = getOptionDisabled ? getOptionDisabled(option) : false;

            // Avoid early form validation, let the end-users continue filling the form.
            event.preventDefault();

            if (disabled) {
              return;
            }

            selectNewValue(event, option, 'selectOption');

            // Move the selection to the end.
            if (autoComplete) {
              inputRef.current.setSelectionRange(
                inputRef.current.value.length,
                inputRef.current.value.length,
              );
            }
          } else if (freeSolo && inputValue !== '' && inputValueIsSelectedValue === false) {
            if (multiple) {
              // Allow people to add new values before they submit the form.
              event.preventDefault();
            }
            selectNewValue(event, inputValue, 'createOption', 'freeSolo');
          } else if (popupOpen && touchScrolledRef.current) {
            // The highlight is stale from a touch-scroll - close without selecting.
            event.preventDefault();
            // This happens on Enter, but re-using "escape" as the closest `AutocompleteCloseReason`
            // to avoid creating a new reason
            handleClose(event, 'escape');
          }
          break;
        }
        case 'Escape':
          if (popupOpen) {
            // Avoid Opera to exit fullscreen mode.
            event.preventDefault();
            // Avoid the Modal to handle the event.
            event.stopPropagation();
            handleClose(event, 'escape');
          } else if (
            clearOnEscape &&
            (inputValue !== '' || (multiple && value.length > 0) || renderValue)
          ) {
            // Avoid Opera to exit fullscreen mode.
            event.preventDefault();
            // Avoid the Modal to handle the event.
            event.stopPropagation();
            handleClear(event);
          }
          break;
        case 'Backspace':
          // Remove the value on the left of the "cursor"
          if (multiple && !readOnly && inputValue === '' && value.length > 0) {
            const index = focusedItem === -1 ? value.length - 1 : focusedItem;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, 'removeOption', {
              option: value[index],
            });
          }
          if (!multiple && renderValue && !readOnly && inputValue === '') {
            handleValue(event, null, 'removeOption', { option: value });
          }
          break;
        case 'Delete':
          // Remove the value on the right of the "cursor"
          if (
            multiple &&
            !readOnly &&
            inputValue === '' &&
            value.length > 0 &&
            focusedItem !== -1
          ) {
            const index = focusedItem;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, 'removeOption', {
              option: value[index],
            });
          }
          if (!multiple && renderValue && !readOnly && inputValue === '') {
            // Single-value rendering: Delete on empty input removes
            // the single rendered option, same "removeOption" reason as multiple.
            handleValue(event, null, 'removeOption', { option: value });
          }
          break;
        default:
      }
    }
  };

  const handleFocus = (event) => {
    setFocused(true);

    // When focusing the input, ensure any previously focused item (chip)
    // is cleared so the input receives the visible caret and the
    // input-focused styling is applied.
    if (focusedItem !== -1) {
      setFocusedItem(-1);
      // Ensure DOM focus lands on the input
      focusItem(-1);
    }

    // If the window previously lost focus while the popup was open,
    // ignore this focus event to prevent unintended reopening.
    // Reset the flag so normal focus behavior resumes.
    if (windowLostFocus.current) {
      windowLostFocus.current = false;
      return;
    }

    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };

  const handleBlur = (event) => {
    // Ignore the event when using the scrollbar with IE 11
    if (unstable_isActiveElementInListbox(listboxRef)) {
      inputRef.current.focus();
      return;
    }

    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;

    // Auto-select the highlighted option on blur, but only if the highlight
    // came from keyboard navigation or was set programmatically (autoHighlight).
    // Mouse hover and touch should not trigger selection — the user may have
    // moved the pointer over an option without intending to commit to it.
    if (
      autoSelect &&
      highlightedIndexRef.current !== -1 &&
      popupOpen &&
      highlightReasonRef.current !== 'mouse' &&
      highlightReasonRef.current !== 'touch'
    ) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], 'blur');
    } else if (autoSelect && freeSolo && inputValue !== '') {
      selectNewValue(event, inputValue, 'blur', 'freeSolo');
    } else if (clearOnBlur) {
      resetInputValue(event, value, 'blur');
    }

    handleClose(event, 'blur');
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    const valueChanged = inputValue !== newValue;

    if (valueChanged) {
      setInputValueState(newValue);
      touchScrolledRef.current = false;

      if (onInputChange) {
        onInputChange(event, newValue, 'input');
      }
    }

    if (newValue === '') {
      // For normal single-select, clearing the input clears the value.
      // For renderValue (chip-style single), only Backspace/Delete clear the value.
      if (!disableClearable && !multiple && !renderValue) {
        handleValue(event, null, 'clear');
      }
    } else {
      handleOpen(event);
    }

    // Called after handleOpen so it overrides handleOpen's setInputPristine(true)
    // when the first keystroke also opens the popup.
    if (valueChanged) {
      setInputPristine(false);
    }
  };

  const handleOptionMouseMove = (event) => {
    const index = Number(event.currentTarget.getAttribute('data-option-index'));
    if (highlightedIndexRef.current !== index) {
      setHighlightedIndex({
        event,
        index,
        reason: 'mouse',
      });
    } else {
      // The option is already highlighted (e.g. programmatically via autoHighlight),
      // but the user moved the mouse over it — mark as mouse-initiated so
      // autoSelect on blur correctly treats this as incidental hover.
      highlightReasonRef.current = 'mouse';
    }
    // Don't clear the touch-scroll guard while touch state is still latched.
    // After a touch gesture, browsers may fire compatibility mousemove
    // events; if those cleared the guard immediately, later compat events in
    // the same sequence could be misclassified as a real mouse interaction.
    // Touch state is cleared by the next deliberate interaction
    // (keyboard nav, handleOptionClick, or handleOpen).
    if (!isTouchRef.current) {
      touchScrolledRef.current = false;
    }
  };

  const handleListboxMouseLeave = (event) => {
    if (
      !resetHighlightOnMouseLeave ||
      highlightedIndexRef.current === -1 ||
      highlightReasonRef.current !== 'mouse' ||
      isTouchRef.current
    ) {
      return;
    }

    setHighlightedIndex({
      event,
      index: -1,
      reason: 'mouse',
      preserveScroll: true,
    });
  };

  const handleOptionTouchStart = (event) => {
    touchScrolledRef.current = false;
    setHighlightedIndex({
      event,
      index: Number(event.currentTarget.getAttribute('data-option-index')),
      reason: 'touch',
    });
    isTouchRef.current = true;
  };

  const handleOptionClick = (event) => {
    const index = Number(event.currentTarget.getAttribute('data-option-index'));
    selectNewValue(event, filteredOptions[index], 'selectOption');

    isTouchRef.current = false;
  };

  const handleItemDelete = (index) => (event) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    handleValue(event, newValue, 'removeOption', {
      option: value[index],
    });
  };

  const handleSingleItemDelete = (event) => {
    handleValue(event, null, 'removeOption', {
      option: value,
    });
  };

  const handlePopupIndicator = (event) => {
    if (open) {
      handleClose(event, 'toggleInput');
    } else {
      handleOpen(event);
    }
  };

  // Prevent input blur when interacting with the combobox
  const handleMouseDown = (event) => {
    // Prevent focusing the input if click is anywhere outside the Autocomplete
    if (!contains(event.currentTarget, event.target)) {
      return;
    }
    // Don't interfere with interactions outside the input area (e.g. helper text)
    if (anchorEl && !contains(anchorEl, event.target)) {
      return;
    }
    if (event.target.getAttribute('id') !== id) {
      event.preventDefault();
    }
  };

  // Focus the input when interacting with the combobox
  const handleClick = (event) => {
    // Prevent focusing the input if click is anywhere outside the Autocomplete
    if (!contains(event.currentTarget, event.target)) {
      return;
    }
    // Don't interfere with interactions outside the input area (e.g. helper text)
    if (anchorEl && !contains(anchorEl, event.target)) {
      return;
    }
    inputRef.current.focus();

    if (
      selectOnFocus &&
      firstFocus.current &&
      inputRef.current.selectionEnd - inputRef.current.selectionStart === 0
    ) {
      inputRef.current.select();
    }

    firstFocus.current = false;
  };

  const handleInputMouseDown = (event) => {
    if (
      !disabledProp &&
      (inputValue === '' || !open) &&
      // Only handle event when the main button is pressed (left click).
      event.button === 0
    ) {
      handlePopupIndicator(event);
    }
  };

  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);

  let groupedOptions = filteredOptions;
  if (groupBy) {
    // used to keep track of key and indexes in the result array
    const indexBy = new Map();
    let warn = false;

    groupedOptions = filteredOptions.reduce((acc, option, index) => {
      const group = groupBy(option);

      if (acc.length > 0 && acc[acc.length - 1].group === group) {
        acc[acc.length - 1].options.push(option);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          if (indexBy.get(group) && !warn) {
            console.warn(
              `MUI: The options provided combined with the \`groupBy\` method of ${componentName} returns duplicated headers.`,
              'You can solve the issue by sorting the options with the output of `groupBy`.',
            );
            warn = true;
          }
          indexBy.set(group, true);
        }

        acc.push({
          key: index,
          index,
          group,
          options: [option],
        });
      }

      return acc;
    }, []);
  }

  if (disabledProp && focused) {
    handleBlur();
  }

  return {
    getRootProps: (other = {}) => ({
      ...other,
      onKeyDown: handleKeyDown(other),
      onMouseDown: handleMouseDown,
      onClick: handleClick,
    }),
    getInputLabelProps: () => ({
      id: `${id}-label`,
      htmlFor: id,
    }),
    getInputProps: () => ({
      id,
      value: inputValue,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onChange: handleInputChange,
      onMouseDown: handleInputMouseDown,
      // if open then this is handled imperatively so don't let react override
      // only have an opinion about this when closed
      'aria-activedescendant': popupOpen ? '' : null,
      'aria-autocomplete': autoComplete ? 'both' : 'list',
      'aria-controls': listboxAvailable ? `${id}-listbox` : undefined,
      'aria-expanded': listboxAvailable,
      // Disable browser's suggestion that might overlap with the popup.
      // Handle autocomplete but not autofill.
      autoComplete: 'off',
      ref: inputRef,
      autoCapitalize: 'none',
      spellCheck: 'false',
      role: 'combobox',
      disabled: disabledProp,
    }),
    getClearProps: () => ({
      tabIndex: -1,
      type: 'button',
      onClick: (event) => {
        ignoreFocus.current = true;
        handleClear(event);
      },
    }),
    getItemProps: ({ index = 0 } = {}) => ({
      ...(multiple && { key: index }),
      'data-item-index': index,
      tabIndex: -1,
      ...(!readOnly && { onDelete: multiple ? handleItemDelete(index) : handleSingleItemDelete }),
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      type: 'button',
      onClick: handlePopupIndicator,
    }),
    getListboxProps: () => ({
      role: 'listbox',
      id: `${id}-listbox`,
      'aria-labelledby': `${id}-label`,
      'aria-multiselectable': multiple || undefined,
      ref: handleListboxRef,
      onMouseDown: (event) => {
        // Prevent blur
        event.preventDefault();
      },
      onScroll: () => {
        if (isTouchRef.current) {
          touchScrolledRef.current = true;
        }
      },
      onMouseLeave: handleListboxMouseLeave,
    }),
    getOptionProps: ({ index, option }) => {
      const selected = isOptionSelected(option);
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;

      return {
        key: getOptionKey?.(option) ?? getOptionLabel(option),
        tabIndex: -1,
        role: 'option',
        id: `${id}-option-${index}`,
        onMouseMove: handleOptionMouseMove,
        onClick: handleOptionClick,
        onTouchStart: handleOptionTouchStart,
        'data-option-index': index,
        'aria-disabled': disabled,
        'aria-selected': selected,
      };
    },
    id,
    inputValue,
    value,
    dirty,
    expanded: popupOpen && anchorEl,
    popupOpen,
    focused: focused || focusedItem !== -1,
    anchorEl,
    setAnchorEl,
    focusedItem,
    groupedOptions,
  };
}

export default useAutocomplete;
