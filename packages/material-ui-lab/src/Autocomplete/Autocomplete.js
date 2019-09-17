/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-duplicate-props */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import { useEventCallback, capitalize } from '@material-ui/core/utils';
import CloseIcon from '../internal/svg-icons/Close';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';

const styles = theme => ({
  root: {
    '&:hover $clearIndicatorDirty, &$focused $clearIndicatorDirty': {
      visibility: 'visible',
    },
  },
  focused: {},
  chip: {
    margin: theme.spacing(0.5),
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputRootOutlined: {
    padding: 8,
    '& $inputInput': {
      padding: '10.5px 6px',
    },
  },
  inputRootFilled: {
    paddingTop: 18,
    '& $inputInput': {
      paddingTop: 10,
    },
  },
  inputInput: {
    width: 0,
    minWidth: 30,
    flexGrow: 1,
    opacity: 0,
    textOverflow: 'ellipsis',
  },
  inputInputFocused: {
    opacity: 1,
  },
  clearIndicator: {
    marginRight: -2,
    padding: 4,
    color: theme.palette.action.active,
    visibility: 'hidden',
  },
  clearIndicatorDirty: {},
  popupIndicator: {
    padding: 2,
    marginRight: -2,
    color: theme.palette.action.active,
  },
  popupIndicatorOpen: {
    transform: 'rotate(180deg)',
  },
  popper: {
    zIndex: 1,
  },
  paper: {
    margin: '4px 0',
    '& > ul': {
      maxHeight: '40vh',
      overflow: 'auto',
    },
  },
  option: {
    ...theme.typography.body1,
    minHeight: 48,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    paddingTop: 6,
    outline: 'none',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto',
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
    '&$selected': {
      backgroundColor: theme.palette.action.selected,
    },
    '&:active': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  selected: {},
  loading: {
    ...theme.typography.body1,
    color: theme.palette.text.secondary,
    padding: '14px 16px',
  },
  noOptions: {
    ...theme.typography.body1,
    color: theme.palette.text.secondary,
    padding: '14px 16px',
  },
  groupLabel: {
    backgroundColor: theme.palette.background.paper,
    top: -8,
  },
  groupUl: {
    padding: 0,
  },
});

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
// Give up on IE 11 support for this feature
function stripDiacritics(string) {
  return typeof string.normalize !== 'undefined'
    ? string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    : string;
}

export function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    matchFrom = 'any',
    stringify = JSON.stringify,
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

const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
  const {
    autoComplete = false,
    autoHightlight = false,
    autoSelect = false,
    classes,
    className,
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
    getOptionLabel = x => x,
    groupBy,
    id: idProp,
    includeInputInList = false,
    ListComponent = List,
    loading = false,
    loadingText = 'Loading…',
    multiple = false,
    noOptionsText = 'No options',
    onChange,
    onClose,
    onOpen,
    open: openProp,
    options = [],
    renderGroup: renderGroupProp,
    renderOption: renderOptionProp,
    renderValue,
    TextFieldProps: { InputProps = {}, ...TextFieldProps } = {},
    value: valueProp,
    ...other
  } = props;

  const defaultRenderOption = params => (
    <li key={params.key}>
      <ListSubheader className={classes.groupLabel} component="div">
        {params.key}
      </ListSubheader>
      <ul className={classes.groupUl}>{params.children}</ul>
    </li>
  );

  const renderGroup = renderGroupProp || defaultRenderOption;
  const renderOption = renderOptionProp || getOptionLabel;
  const [defaultId, setDefaultId] = React.useState();
  const id = idProp || defaultId;

  React.useEffect(() => {
    // Fallback to this default id when possible.
    // Use the random value for client-side rendering only.
    // We can't use it server-side.
    setDefaultId(`mui-autocomplete-${Math.round(Math.random() * 1e5)}`);
  }, []);

  const inputRef = React.useRef(null);
  const paperRef = React.useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [focusedValue, setFocusedValue] = React.useState('input');
  const defaultHighlighted = autoHightlight ? 0 : -1;
  const highlightedIndexRef = React.useRef(defaultHighlighted);
  const selectedIndexRef = React.useRef(-1);

  function setHighlightedIndex(index, mouse = false) {
    highlightedIndexRef.current = index;
    inputRef.current.setAttribute('aria-activedescendant', `${id}-option-${index}`);

    if (!paperRef.current) {
      return;
    }

    const prev = paperRef.current.querySelector('[data-focus]');
    if (prev) {
      prev.removeAttribute('data-focus');
    }

    const listboxNode = paperRef.current.querySelector('ul');

    // "No results"
    if (!listboxNode) {
      return;
    }

    if (index === -1) {
      listboxNode.scrollTop = 0;
      return;
    }

    const option = paperRef.current.querySelector(`[data-option-index="${index}"]`);

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

  const [inputValue, setInputValue] = React.useState('');
  const [focused, setFocused] = React.useState(false);

  const resetInputValue = useEventCallback(newValue => {
    setInputValue(newValue != null ? getOptionLabel(newValue) : '');
  });

  React.useEffect(() => {
    if (!multiple) {
      resetInputValue(value);
    }
  }, [value, multiple, resetInputValue]);

  const { current: isOpenControlled } = React.useRef(openProp != null);
  const [openState, setOpenState] = React.useState(false);
  const open = isOpenControlled ? openProp : openState;

  const inputValueFilter =
    !multiple && value && inputValue === getOptionLabel(value) ? '' : inputValue;

  let popupOpen = Boolean(open && anchorEl);

  const filteredOptions = popupOpen
    ? filterOptions(
        options.filter(option => {
          if (
            filterSelectedOptions &&
            (multiple ? value.indexOf(option) !== -1 : value === option)
          ) {
            return false;
          }
          return true;
        }),
        { inputValue: inputValueFilter },
      )
    : [];

  popupOpen = freeSolo && filteredOptions.length === 0 ? false : popupOpen;

  const focusFocusedValue = useEventCallback(focusedValue2 => {
    if (focusedValue2 === 'input') {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-value-index="${focusedValue2}"]`).focus();
    }
  });

  // Ensure the focusedValue is never inconsistent
  React.useEffect(() => {
    if (multiple && focusedValue > value.length - 1) {
      setFocusedValue('input');
      focusFocusedValue('input');
    }
  }, [value, multiple, focusedValue, focusFocusedValue]);

  const changeHighlightedIndex = diff => {
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

        if (disableListWrap || Math.abs(diff) > 1) {
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

    const nextIndex = getNextIndex();
    setHighlightedIndex(nextIndex);
    selectedIndexRef.current = nextIndex;

    if (autoComplete && diff !== 'reset') {
      inputRef.current.value =
        nextIndex === -1 ? inputValue : getOptionLabel(filteredOptions[nextIndex]);
    }
  };

  React.useEffect(() => {
    changeHighlightedIndex('reset');
  }, [filteredOptions.length]); // eslint-disable-line react-hooks/exhaustive-deps

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
      const itemIndex = value.indexOf(item);
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

    if (multiple) {
      setInputValue('');
    } else {
      setInputValue(getOptionLabel(newValue));
    }

    selectedIndexRef.current = -1;
  };

  const handleFocusedValue = (event, direction) => {
    if (!multiple) {
      return;
    }

    handleClose(event);

    let nextValue = focusedValue;

    if (focusedValue === 'input') {
      if (inputValue === '' && direction === 'previous') {
        nextValue = value.length - 1;
      }
    } else {
      nextValue += direction === 'next' ? 1 : -1;

      if (nextValue === value.length) {
        nextValue = 'input';
      }

      if (nextValue < 0) {
        nextValue = 0;
      }
    }

    setFocusedValue(nextValue);
    focusFocusedValue(nextValue);
  };

  const handleClear = event => {
    handleValue(event, multiple ? [] : null);
    if (disableOpenOnFocus) {
      handleClose();
    }
    setInputValue('');
  };

  const handleKeyDown = event => {
    if (TextFieldProps.onKeyDown) {
      TextFieldProps.onKeyDown(event);
    }

    if (['ArrowLeft', 'ArrowRight'].indexOf(event.key) === -1) {
      setFocusedValue('input');
      focusFocusedValue('input');
    }

    switch (event.key) {
      case 'Home':
        // Prevent scroll of the page
        event.preventDefault();
        changeHighlightedIndex('start');
        break;
      case 'End':
        // Prevent scroll of the page
        event.preventDefault();
        changeHighlightedIndex('end');
        break;
      case 'PageUp':
        // Prevent scroll of the page
        event.preventDefault();
        changeHighlightedIndex(-pageSize);
        handleOpen(event);
        break;
      case 'PageDown':
        // Prevent scroll of the page
        event.preventDefault();
        changeHighlightedIndex(pageSize);
        handleOpen(event);
        break;
      case 'ArrowDown':
        // Prevent cursor move
        event.preventDefault();
        changeHighlightedIndex(1);
        handleOpen(event);
        break;
      case 'ArrowUp':
        // Prevent cursor move
        event.preventDefault();
        changeHighlightedIndex(-1);
        handleOpen(event);
        break;
      case 'ArrowLeft':
        handleFocusedValue(event, 'previous');
        break;
      case 'ArrowRight':
        handleFocusedValue(event, 'next');
        break;
      case 'Enter':
        if (highlightedIndexRef.current !== -1) {
          // We don't want to validate the form.
          event.preventDefault();
          selectNewValue(event, filteredOptions[highlightedIndexRef.current]);
        } else if (freeSolo) {
          selectNewValue(event, inputValue);
        }
        break;
      case 'Escape':
        if (popupOpen) {
          event.stopPropagation();
          handleClose(event);
        } else if (clearOnEscape) {
          event.stopPropagation();
          handleClear(event);
        }
        break;
      case 'Backspace':
        if (multiple && inputValue === '' && value.length > 0) {
          const index = focusedValue === 'input' ? value.length - 1 : focusedValue;
          const newValue = [...value];
          newValue.splice(index, 1);
          handleValue(event, newValue);
        }
        break;
      default:
    }
  };

  const handleFocus = event => {
    if (TextFieldProps.onFocus) {
      TextFieldProps.onFocus(event);
    }

    setFocused(true);

    if (!disableOpenOnFocus) {
      handleOpen(event);
    }
  };

  const handleBlur = event => {
    if (TextFieldProps.onBlur) {
      TextFieldProps.onBlur(event);
    }

    setFocused(false);

    if (debug && inputValue !== '') {
      return;
    }

    if (autoSelect && selectedIndexRef.current !== -1) {
      handleValue(event, filteredOptions[selectedIndexRef.current]);
    } else if (!freeSolo) {
      setInputValue((value && getOptionLabel(value)) || '');
    }

    handleClose(event);
  };

  const handleInputChange = event => {
    if (TextFieldProps.onChange) {
      TextFieldProps.onChange(event);
    }

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

    setInputValue(newValue);
  };

  // input
  // arrow down
  // popup
  // list box

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  const handleOptionMouseOver = event => {
    const index = Number(event.currentTarget.getAttribute('data-option-index'));
    setHighlightedIndex(index, 'mouse');
  };

  const handleOptionClick = event => {
    selectNewValue(event, filteredOptions[highlightedIndexRef.current]);
  };

  const handleChipDelete = event => {
    const index = Number(event.currentTarget.getAttribute('data-value-index'));
    const newValue = [...value];
    newValue.splice(index, 1);
    handleValue(event, newValue);
  };

  const handlePopupRef = useEventCallback(node => {
    if (!node) {
      return;
    }

    // Restore the focus to the correct option.
    setHighlightedIndex(highlightedIndexRef.current);
  });

  let startAdornment;

  if (multiple && value.length > 0) {
    const valueProps = {
      onDelete: handleChipDelete,
      className: classes.chip,
    };

    if (renderValue) {
      startAdornment = renderValue(value, { ...valueProps, focused });
    } else {
      startAdornment = value.map((option, index) => (
        <Chip
          key={index}
          data-value-index={index}
          tabIndex={-1}
          label={getOptionLabel(option)}
          {...valueProps}
        />
      ));
    }
  }

  const handlePopupIndicator = event => {
    inputRef.current.focus();

    if (open) {
      handleClose(event);
    } else {
      handleOpen(event);
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

  const renderListOption = (option, index) => {
    const selected = multiple ? value.indexOf(option) !== -1 : value === option;
    return (
      <li
        tabIndex={-1}
        role="option"
        id={`${id}-option-${index}`}
        onMouseOver={handleOptionMouseOver}
        onClick={handleOptionClick}
        data-option-index={index}
        className={clsx(classes.option, {
          [classes.selected]: selected,
        })}
        aria-selected={selected}
        key={index}
      >
        {renderOption(option, {
          selected,
          inputValue,
        })}
      </li>
    );
  };

  return (
    <div
      ref={ref}
      role="combobox"
      aria-expanded={popupOpen}
      className={clsx(
        classes.root,
        {
          [classes.focused]: focused,
        },
        className,
      )}
      aria-owns={popupOpen ? `${id}-popup` : null}
      {...other}
      /* aria-haspopup="listbox" is the default value, no need to specify it */
    >
      <TextField
        variant="standard"
        id={id}
        value={inputValue}
        {...TextFieldProps}
        ref={setAnchorEl}
        inputRef={inputRef}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        InputLabelProps={{
          id: `${id}-label`,
          ...TextFieldProps.InputLabelProps,
        }}
        InputProps={{
          className: clsx(classes.inputRoot, {
            [classes[`inputRoot${capitalize(TextFieldProps.variant)}`]]: TextFieldProps.variant,
          }),
          startAdornment,
          ...InputProps,
          endAdornment: (
            <React.Fragment>
              {InputProps.endAdornment}
              {disableClearable ? null : (
                <IconButton
                  tabIndex={-1}
                  onClick={handleClear}
                  onMouseDown={event => {
                    event.preventDefault();
                  }}
                  title="Clear"
                  className={clsx(classes.clearIndicator, {
                    [classes.clearIndicatorDirty]: dirty,
                  })}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
              {freeSolo ? null : (
                <IconButton
                  tabIndex={-1}
                  onClick={handlePopupIndicator}
                  onMouseDown={event => {
                    event.preventDefault();
                  }}
                  title={popupOpen ? 'Close popup' : 'Open popup'}
                  className={clsx(classes.popupIndicator, {
                    [classes.popupIndicatorOpen]: popupOpen,
                  })}
                >
                  <ArrowDropDownIcon />
                </IconButton>
              )}
            </React.Fragment>
          ),
        }}
        inputProps={{
          className: clsx(classes.inputInput, {
            [classes.inputInputFocused]: focusedValue === 'input',
          }),
          'aria-autocomplete': autoComplete ? 'both' : 'list',
          'aria-controls': `${id}-listbox`,
          // Disable browser's suggestion that might overlap with the popup.
          autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'none',
          spellCheck: 'false',
          ...TextFieldProps.inputProps,
        }}
      />
      <Popper
        className={classes.popper}
        ref={handlePopupRef}
        popperRef={popperRef}
        anchorEl={anchorEl}
        open={popupOpen}
        role="presentation"
        id={`${id}-popup`}
      >
        {popupOpen ? (
          <Paper
            ref={paperRef}
            style={{
              width: anchorEl ? anchorEl.clientWidth : null,
            }}
            className={classes.paper}
          >
            {loading ? <div className={classes.loading}>{loadingText}</div> : null}
            {groupedOptions.length === 0 && !freeSolo && !loading ? (
              <div className={classes.noOptions}>{noOptionsText}</div>
            ) : null}
            {groupedOptions.length > 0 ? (
              <ListComponent
                role="listbox"
                id={`${id}-listbox`}
                aria-labelledby={`${id}-label`}
                onMouseDown={event => {
                  event.preventDefault();
                }}
              >
                {groupedOptions.map((option, index) => {
                  if (groupBy) {
                    return renderGroup({
                      key: option.key,
                      children: option.options.map((option2, index2) =>
                        renderListOption(option2, option.index + index2),
                      ),
                    });
                  }

                  return renderListOption(option, index);
                })}
              </ListComponent>
            ) : null}
          </Paper>
        ) : (
          <div />
        )}
      </Popper>
    </div>
  );
});

Autocomplete.propTypes = {
  /**
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   */
  autoComplete: PropTypes.bool,
  /**
   * If `true`, the first option is automatically highlighted.
   */
  autoHightlight: PropTypes.bool,
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
  classes: PropTypes.object.isRequired,
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
   * The component used for the ul element.
   */
  ListComponent: PropTypes.elementType,
  /**
   * If `true`, the component is in a loading state.
   */
  loading: PropTypes.bool,
  /**
   * Text to display when in a loading state.
   */
  loadingText: PropTypes.node,
  /**
   * If true, `value` must be an array and the menu will support multiple selections.
   */
  multiple: PropTypes.bool,
  /**
   * Text to display when there are no options.
   */
  noOptionsText: PropTypes.node,
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
   * Callback fired when the input value changes.
   */
  onInputChange: PropTypes.func,
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
   * Render the group.
   *
   * @param {any} option The group to render.
   * @returns {ReactNode}
   */
  renderGroup: PropTypes.func,
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {any} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption: PropTypes.func,
  /**
   * Render the selected value.
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: PropTypes.func,
  /**
   * Props applied to the [`TextField`](/api/text-field/) element.
   */
  TextFieldProps: PropTypes.object,
  /**
   * The input value.
   */
  value: PropTypes.any,
};

export default withStyles(styles)(Autocomplete);
