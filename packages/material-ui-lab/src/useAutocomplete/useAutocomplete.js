/* eslint-disable no-constant-condition */
import React from 'react';
import PropTypes from 'prop-types';
import { setRef, useEventCallback } from '@material-ui/core/utils';

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
// Give up on IE 11 support for this feature
function stripDiacritics(string) {
  return typeof string.normalize !== 'undefined'
    ? string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    : string;
}

function defaultStringify(value) {
  if (value == null) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object') {
    return Object.keys(value)
      .map(key => value[key])
      .join(' ');
  }

  return JSON.stringify(value);
}

export function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    matchFrom = 'any',
    stringify = defaultStringify,
    trim = false,
  } = config;

  return (options, { inputValue }) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }

    return options.filter(option => {
      let candidate = stringify(option);
      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }
      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }

      return matchFrom === 'start' ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
  };
}

const defaultFilterOptions = createFilterOptions();

// Number of options to jump in list box when pageup and pagedown keys are used.
const pageSize = 5;

export default function useAutocomplete(props) {
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    clearOnEscape = false,
    debug = false,
    defaultValue,
    disableClearable = false,
    disableCloseOnSelect = false,
    disableListWrap = false,
    disableOpenOnFocus = false,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionLabel = x => x,
    getOptionSelected = (option, value) => option === value,
    groupBy,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    multiple = false,
    onChange,
    onClose,
    onOpen,
    onInputChange,
    open: openProp,
    options = [],
    value: valueProp,
  } = props;

  const [defaultId, setDefaultId] = React.useState();
  const id = idProp || defaultId;
  React.useEffect(() => {
    // Fallback to this default id when possible.
    // Use the random value for client-side rendering only.
    // We can't use it server-side.
    setDefaultId(`mui-autocomplete-${Math.round(Math.random() * 1e5)}`);
  }, []);

  const firstFocus = React.useRef(true);
  const inputRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [focusedTag, setFocusedTag] = React.useState(-1);
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = React.useRef(defaultHighlighted);
  const selectedIndexRef = React.useRef(-1);

  function setHighlightedIndex(index, mouse = false) {
    highlightedIndexRef.current = index;
    // does the index exist?
    if (index === -1) {
      inputRef.current.removeAttribute('aria-activedescendant');
    } else {
      inputRef.current.setAttribute('aria-activedescendant', `${id}-option-${index}`);
    }

    if (!listboxRef.current) {
      return;
    }

    const prev = listboxRef.current.querySelector('[data-focus]');
    if (prev) {
      prev.removeAttribute('data-focus');
    }

    const listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]');

    // "No results"
    if (!listboxNode) {
      return;
    }

    if (index === -1) {
      listboxNode.scrollTop = 0;
      return;
    }

    const option = listboxRef.current.querySelector(`[data-option-index="${index}"]`);

    if (!option) {
      return;
    }

    option.setAttribute('data-focus', 'true');

    // Scroll active descendant into view.
    // Logic copied from https://www.w3.org/TR/wai-aria-practices/examples/listbox/js/listbox.js
    //
    // Consider this API instead once it has a better browser support:
    // .scrollIntoView({ scrollMode: 'if-needed', block: 'nearest' });
    if (listboxNode.scrollHeight > listboxNode.clientHeight && !mouse) {
      const element = option;

      const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;
      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
      } else if (element.offsetTop < listboxNode.scrollTop) {
        listboxNode.scrollTop = element.offsetTop;
      }
    }
  }

  const { current: isControlled } = React.useRef(valueProp !== undefined);
  const [valueState, setValue] = React.useState(() => {
    return !isControlled ? defaultValue || (multiple ? [] : null) : null;
  });
  const value = isControlled ? valueProp : valueState;

  const { current: isInputValueControlled } = React.useRef(inputValueProp != null);
  const [inputValueState, setInputValue] = React.useState('');
  const inputValue = isInputValueControlled ? inputValueProp : inputValueState;

  const [focused, setFocused] = React.useState(false);

  const resetInputValue = useEventCallback((event, newValue) => {
    let newInputValue;
    if (multiple) {
      newInputValue = '';
    } else if (newValue == null) {
      newInputValue = '';
    } else {
      const optionLabel = getOptionLabel(newValue);

      if (process.env.NODE_ENV !== 'production') {
        if (typeof optionLabel !== 'string') {
          console.error(
            [
              'Material-UI: the `getOptionLabel` method of useAutocomplete do not handle the options correctly.',
              `The component expect a string but received ${typeof optionLabel}.`,
              `For the input option: ${JSON.stringify(
                newValue,
              )}, \`getOptionLabel\` returns: ${newInputValue}.`,
            ].join('\n'),
          );
        }
      }

      newInputValue = typeof optionLabel === 'string' ? optionLabel : '';
    }

    if (inputValue === newInputValue) {
      return;
    }

    setInputValue(newInputValue);

    if (onInputChange) {
      onInputChange(event, newInputValue);
    }
  });

  React.useEffect(() => {
    resetInputValue(null, value);
  }, [value, resetInputValue]);

  const { current: isOpenControlled } = React.useRef(openProp != null);
  const [openState, setOpenState] = React.useState(false);
  const open = isOpenControlled ? openProp : openState;

  const inputValueFilter =
    !multiple && value && inputValue === getOptionLabel(value) ? '' : inputValue;

  let popupOpen = open;

  const filteredOptions = popupOpen
    ? filterOptions(
        options.filter(option => {
          if (
            filterSelectedOptions &&
            (multiple ? value : [value]).some(
              value2 => value2 !== null && getOptionSelected(option, value2),
            )
          ) {
            return false;
          }
          return true;
        }),
        { inputValue: inputValueFilter },
      )
    : [];

  popupOpen = freeSolo && filteredOptions.length === 0 ? false : popupOpen;

  const focusTag = useEventCallback(tagToFocus => {
    if (tagToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-tag-index="${tagToFocus}"]`).focus();
    }
  });

  // Ensure the focusedTag is never inconsistent
  React.useEffect(() => {
    if (multiple && focusedTag > value.length - 1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
  }, [value, multiple, focusedTag, focusTag]);

  function validOptionIndex(index, direction) {
    if (!listboxRef.current || index === -1) {
      return -1;
    }

    let nextFocus = index;

    while (true) {
      // Out of range
      if (
        (direction === 'next' && nextFocus === filteredOptions.length) ||
        (direction === 'previous' && nextFocus === -1)
      ) {
        return -1;
      }

      const option = listboxRef.current.querySelector(`[data-option-index="${nextFocus}"]`);

      // Same logic as MenuList.js
      if (
        option &&
        (!option.hasAttribute('tabindex') ||
          option.disabled ||
          option.getAttribute('aria-disabled') === 'true')
      ) {
        nextFocus += direction === 'next' ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }

  const changeHighlightedIndex = (diff, direction) => {
    if (!popupOpen) {
      return;
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
    setHighlightedIndex(nextIndex);
    selectedIndexRef.current = nextIndex;

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
  };

  React.useEffect(() => {
    changeHighlightedIndex('reset', 'next');
  }, [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpen = event => {
    if (open) {
      return;
    }

    if (onOpen) {
      onOpen(event);
    }
    if (!isOpenControlled) {
      setOpenState(true);
    }
  };

  const handleClose = event => {
    if (!open) {
      return;
    }

    if (onClose) {
      onClose(event);
    }
    if (!isOpenControlled) {
      setOpenState(false);
    }
  };

  const handleValue = (event, newValue) => {
    if (value === newValue) {
      return;
    }

    if (onChange) {
      onChange(event, newValue);
    }
    if (!isControlled) {
      setValue(newValue);
    }
  };

  const selectNewValue = (event, newValue) => {
    if (multiple) {
      const item = newValue;
      newValue = Array.isArray(value) ? [...value] : [];

      let itemIndex = -1;
      // To replace with .findIndex() once we stop IE 11 support.
      for (let i = 0; i < newValue.length; i += 1) {
        if (getOptionSelected(item, newValue[i])) {
          itemIndex = i;
        }
      }

      if (itemIndex === -1) {
        newValue.push(item);
      } else {
        newValue.splice(itemIndex, 1);
      }
    }
    handleValue(event, newValue);
    if (!disableCloseOnSelect) {
      handleClose(event);
    }

    resetInputValue(event, newValue);

    selectedIndexRef.current = -1;
  };

  function validTagIndex(index, direction) {
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

      const option = anchorEl.querySelector(`[data-tag-index="${nextFocus}"]`);

      // Same logic as MenuList.js
      if (
        option &&
        (!option.hasAttribute('tabindex') ||
          option.disabled ||
          option.getAttribute('aria-disabled') === 'true')
      ) {
        nextFocus += direction === 'next' ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }

  const handleFocusTag = (event, direction) => {
    if (!multiple) {
      return;
    }

    handleClose(event);

    let nextTag = focusedTag;

    if (focusedTag === -1) {
      if (inputValue === '' && direction === 'previous') {
        nextTag = value.length - 1;
      }
    } else {
      nextTag += direction === 'next' ? 1 : -1;

      if (nextTag < 0) {
        nextTag = 0;
      }

      if (nextTag === value.length) {
        nextTag = -1;
      }
    }

    nextTag = validTagIndex(nextTag, direction);

    setFocusedTag(nextTag);
    focusTag(nextTag);
  };

  const handleClear = event => {
    handleValue(event, multiple ? [] : null);
    if (disableOpenOnFocus) {
      handleClose();
    }
    setInputValue('');
  };

  const handleKeyDown = event => {
    if (focusedTag !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf(event.key) === -1) {
      setFocusedTag(-1);
      focusTag(-1);
    }

    switch (event.key) {
      case 'Home':
        if (popupOpen) {
          // Prevent scroll of the page
          event.preventDefault();
          changeHighlightedIndex('start', 'next');
        }
        break;
      case 'End':
        if (popupOpen) {
          // Prevent scroll of the page
          event.preventDefault();
          changeHighlightedIndex('end', 'previous');
        }
        break;
      case 'PageUp':
        // Prevent scroll of the page
        event.preventDefault();
        changeHighlightedIndex(-pageSize, 'previous');
        handleOpen(event);
        break;
      case 'PageDown':
        // Prevent scroll of the page
        event.preventDefault();
        changeHighlightedIndex(pageSize, 'next');
        handleOpen(event);
        break;
      case 'ArrowDown':
        // Prevent cursor move
        event.preventDefault();
        changeHighlightedIndex(1, 'next');
        handleOpen(event);
        break;
      case 'ArrowUp':
        // Prevent cursor move
        event.preventDefault();
        changeHighlightedIndex(-1, 'previous');
        handleOpen(event);
        break;
      case 'ArrowLeft':
        handleFocusTag(event, 'previous');
        break;
      case 'ArrowRight':
        handleFocusTag(event, 'next');
        break;
      case 'Enter':
        if (highlightedIndexRef.current !== -1 && popupOpen) {
          // We don't want to validate the form.
          event.preventDefault();
          selectNewValue(event, filteredOptions[highlightedIndexRef.current]);

          // Move the selection to the end.
          if (autoComplete) {
            inputRef.current.setSelectionRange(
              inputRef.current.value.length,
              inputRef.current.value.length,
            );
          }
        } else if (freeSolo && inputValue !== '') {
          selectNewValue(event, inputValue);
        }
        break;
      case 'Escape':
        if (popupOpen) {
          // Avoid Opera to exit fullscreen mode.
          event.preventDefault();
          // Avoid the Modal to handle the event.
          event.stopPropagation();
          handleClose(event);
        } else if (clearOnEscape && inputValue !== '') {
          // Avoid Opera to exit fullscreen mode.
          event.preventDefault();
          // Avoid the Modal to handle the event.
          event.stopPropagation();
          handleClear(event);
        }
        break;
      case 'Backspace':
        if (multiple && inputValue === '' && value.length > 0) {
          const index = focusedTag === -1 ? value.length - 1 : focusedTag;
          const newValue = [...value];
          newValue.splice(index, 1);
          handleValue(event, newValue);
        }
        break;
      default:
    }
  };

  const handleFocus = event => {
    setFocused(true);

    if (!disableOpenOnFocus) {
      handleOpen(event);
    }
  };

  const handleBlur = event => {
    setFocused(false);
    firstFocus.current = true;

    if (debug && inputValue !== '') {
      return;
    }

    if (autoSelect && selectedIndexRef.current !== -1) {
      handleValue(event, filteredOptions[selectedIndexRef.current]);
    } else if (!freeSolo) {
      resetInputValue(event, value);
    }

    handleClose(event);
  };

  const handleInputChange = event => {
    const newValue = event.target.value;

    if (newValue === '') {
      if (disableOpenOnFocus) {
        handleClose(event);
      }

      if (!disableClearable && !multiple) {
        handleValue(event, null);
      }
    } else {
      handleOpen(event);
    }

    if (inputValue === newValue) {
      return;
    }

    setInputValue(newValue);

    if (onInputChange) {
      onInputChange(event, newValue);
    }
  };

  const handleOptionMouseOver = event => {
    const index = Number(event.currentTarget.getAttribute('data-option-index'));
    setHighlightedIndex(index, 'mouse');
  };

  const handleOptionClick = event => {
    const index = Number(event.currentTarget.getAttribute('data-option-index'));
    selectNewValue(event, filteredOptions[index]);
  };

  const handleTagDelete = index => event => {
    const newValue = [...value];
    newValue.splice(index, 1);
    handleValue(event, newValue);
  };

  const handleListboxRef = useEventCallback(node => {
    setRef(listboxRef, node);

    if (!node) {
      return;
    }

    // Restore the focus to the correct option.
    setHighlightedIndex(highlightedIndexRef.current);
  });

  const handlePopupIndicator = event => {
    inputRef.current.focus();

    if (open) {
      handleClose(event);
    } else {
      handleOpen(event);
    }
  };

  const handleMouseDown = event => {
    if (event.target.nodeName !== 'INPUT') {
      // Prevent blur
      event.preventDefault();
    }
  };

  const handleClick = () => {
    if (
      firstFocus.current &&
      inputRef.current.selectionEnd - inputRef.current.selectionStart === 0
    ) {
      inputRef.current.focus();
      inputRef.current.select();
    }

    firstFocus.current = false;
  };

  const handleInputMouseDown = event => {
    if (inputValue === '' && (!disableOpenOnFocus || inputRef.current === document.activeElement)) {
      handlePopupIndicator(event);
    }
  };

  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);

  let groupedOptions = filteredOptions;
  if (groupBy) {
    groupedOptions = filteredOptions.reduce((acc, option, index) => {
      const key = groupBy(option);

      if (acc.length > 0 && acc[acc.length - 1].key === key) {
        acc[acc.length - 1].options.push(option);
      } else {
        acc.push({
          key,
          index,
          options: [option],
        });
      }

      return acc;
    }, []);
  }

  return {
    getRootProps: () => ({
      'aria-owns': popupOpen ? `${id}-popup` : null,
      role: 'combobox',
      'aria-expanded': popupOpen,
      onKeyDown: handleKeyDown,
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
      // if open then this is handled imperativeley so don't let react override
      // only have an opinion about this when closed
      'aria-activedescendant': popupOpen ? '' : null,
      'aria-autocomplete': autoComplete ? 'both' : 'list',
      'aria-controls': popupOpen ? `${id}-popup` : null,
      // Disable browser's suggestion that might overlap with the popup.
      // Handle autocomplete but not autofill.
      autoComplete: 'off',
      ref: inputRef,
      autoCapitalize: 'none',
      spellCheck: 'false',
    }),
    getClearProps: () => ({
      tabIndex: -1,
      onClick: handleClear,
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      onClick: handlePopupIndicator,
    }),
    getTagProps: ({ index }) => ({
      key: index,
      'data-tag-index': index,
      tabIndex: -1,
      onDelete: handleTagDelete(index),
    }),
    getListboxProps: () => ({
      role: 'listbox',
      id: `${id}-popup`,
      'aria-labelledby': `${id}-label`,
      ref: handleListboxRef,
      onMouseDown: event => {
        // Prevent blur
        event.preventDefault();
      },
    }),
    getOptionProps: ({ index, option }) => {
      const selected = (multiple ? value : [value]).some(
        value2 => value2 != null && getOptionSelected(option, value2),
      );
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;

      return {
        key: index,
        tabIndex: -1,
        role: 'option',
        id: `${id}-option-${index}`,
        onMouseOver: handleOptionMouseOver,
        onClick: handleOptionClick,
        'data-option-index': index,
        'aria-disabled': disabled,
        'aria-selected': selected,
      };
    },
    id,
    inputValue,
    value,
    dirty,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    groupedOptions,
  };
}

useAutocomplete.propTypes = {
  /**
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   */
  autoComplete: PropTypes.bool,
  /**
   * If `true`, the first option is automatically highlighted.
   */
  autoHighlight: PropTypes.bool,
  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   */
  autoSelect: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   */
  clearOnEscape: PropTypes.bool,
  /**
   * If `true`, the popup will ignore the blur event if the input if filled.
   * You can inspect the popup markup with your browser tools.
   * Consider this option when you need to customize the component.
   */
  debug: PropTypes.bool,
  /**
   * The default input value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the input can't be cleared.
   */
  disableClearable: PropTypes.bool,
  /**
   * If `true`, the popup won't close when a value is selected.
   */
  disableCloseOnSelect: PropTypes.bool,
  /**
   * If `true`, the list box in the popup will not wrap focus.
   */
  disableListWrap: PropTypes.bool,
  /**
   * If `true`, the popup won't open on input focus.
   */
  disableOpenOnFocus: PropTypes.bool,
  /**
   * A filter function that determins the options that are eligible.
   *
   * @param {any} options The options to render.
   * @param {object} state The state of the component.
   * @returns {boolean}
   */
  filterOptions: PropTypes.func,
  /**
   * If `true`, hide the selected options from the list box.
   */
  filterSelectedOptions: PropTypes.bool,
  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   */
  freeSolo: PropTypes.bool,
  /**
   * Used to determine the disabled state for a given option.
   */
  getOptionDisabled: PropTypes.func,
  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   */
  getOptionLabel: PropTypes.func,
  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {any} options The option to group.
   * @returns {string}
   */
  groupBy: PropTypes.func,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * If `true`, the highlight can move to the input.
   */
  includeInputInList: PropTypes.bool,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: PropTypes.bool,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * Control the popup` open state.
   */
  open: PropTypes.bool,
  /**
   * Array of options.
   */
  options: PropTypes.array,
  /**
   * The input value.
   */
  value: PropTypes.any,
};
