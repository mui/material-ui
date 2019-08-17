import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

export const styles = theme => ({
  /* Styles applied to the root element */
  root: {},
  /* Styles applied to the Paper component */
  paper: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  /* Styles applied to the MenuItem component */
  menuItem: {
    whiteSpace: 'normal',
  },
  /* Styled applied to the Popper component */
  popper: {
    zIndex: theme.zIndex.modal,
  },
});

const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
  // Basically <TextField /> props without select, selectProp, autoComplete and inputRef
  const {
    autoFocus,
    children,
    classes,
    className,
    component: Component = 'div',
    defaultValue,
    error,
    FormHelperTextProps,
    fullWidth,
    getSuggestions,
    getSuggestionValue,
    helperText,
    hiddenLabel,
    id,
    InputLabelProps,
    inputProps,
    InputProps,
    label,
    multiline,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    onSuggestionSelect,
    placeholder,
    required,
    rows,
    rowsMax,
    type,
    value,
    variant = 'standard',
    ...other
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [suggestions, setSuggestions] = React.useState([]);
  const [popperKey, setPopperKey] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleChange = e => {
    setSuggestions(getSuggestions(e.target.value));
    setPopperKey(popperKey + 1);

    if (onChange) onChange(e);
  };

  const handleFocus = e => {
    setSuggestions(getSuggestions(e.target.value));

    if (onFocus) onFocus(e);
  };

  const handleKeyDown = e => {
    if (onKeyDown) onKeyDown(e);
    if (!onSuggestionSelect) return;

    const keyCode = e.keyCode;
    const length = suggestions.length;

    if (!length || (keyCode !== 38 && keyCode !== 40 && keyCode !== 13 && keyCode !== 27)) return;

    e.preventDefault();

    let index;

    if (keyCode === 38) index = selectedIndex - 1;
    if (keyCode === 40) index = selectedIndex + 1;
    if (keyCode === 13 || keyCode === 27) {
      setSuggestions([]);

      return;
    }

    if (index < 0) index = length - 1;
    if (index > length - 1) index = 0;

    setSelectedIndex(index);
    onSuggestionSelect(getSuggestionValue(suggestions[index]));
  };

  const handleClickAway = e => {
    if (e.target === anchorEl || anchorEl.contains(e.target)) return;

    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = suggestionValue => () => {
    onSuggestionSelect(suggestionValue);
    setSuggestions([]);
  };

  const inputElement =
    typeof children === 'function' ? (
      children({
        ref: setAnchorEl,
        onChange: handleChange,
        onFocus: handleFocus,
        onKeyDown: handleKeyDown,
      })
    ) : (
      <TextField
        autoComplete="off"
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        error={error}
        FormHelperTextProps={FormHelperTextProps}
        fullWidth={fullWidth}
        helperText={helperText}
        hiddenLabel={hiddenLabel}
        id={id}
        InputLabelProps={InputLabelProps}
        inputProps={inputProps}
        InputProps={InputProps}
        inputRef={setAnchorEl}
        label={label}
        multiline={multiline}
        name={name}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        required={required}
        rows={rows}
        rowsMax={rowsMax}
        type={type}
        value={value}
        variant={variant}
      />
    );

  const suggestionPanelId = id ? `${id}-suggestion-panel` : undefined;

  return (
    <Component
      aria-haspopup="listbox"
      aria-owns={suggestionPanelId}
      className={clsx(className, classes.root)}
      ref={ref}
      role="combobox"
      {...other}
    >
      {inputElement}
      <ClickAwayListener onClickAway={handleClickAway}>
        <Popper
          anchorEl={anchorEl}
          className={classes.popper}
          open={Boolean(suggestions.length)}
          key={popperKey}
          style={{
            width: anchorEl && anchorEl.offsetWidth,
          }}
        >
          <Paper component="ul" role="listbox" id={suggestionPanelId} className={classes.paper}>
            {suggestions.map((suggestion, i) => {
              const suggestionValue = getSuggestionValue(suggestion);
              const selected = selectedIndex === i;

              return (
                <li
                  role="option"
                  aria-selected={selected}
                  key={`MuiAutosuggest-li-${suggestionValue}`}
                >
                  <MenuItem
                    component="div"
                    className={classes.menuItem}
                    selected={selected}
                    onClick={handleSuggestionClick(suggestionValue)}
                  >
                    {suggestionValue}
                  </MenuItem>
                </li>
              );
            })}
          </Paper>
        </Popper>
      </ClickAwayListener>
    </Component>
  );
});

Autocomplete.propTypes = {
  /**
   * If `true`, the `input` element will be focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.func,
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The default value of the `input` element.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the `input` element will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * Props applied to the [`FormHelperText`](/api/form-helper-text/) element.
   */
  FormHelperTextProps: PropTypes.object,
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,
  /**
   * Callback fired when input's value changes to get suggestions given the input value
   * @param {string} value - The input value
   */
  getSuggestions: PropTypes.func.isRequired,
  /**
   * The function that returns a value to display given a suggestion
   * @param {any} suggestion - The given suggestion
   */
  getSuggestionValue: PropTypes.func.isRequired,
  /**
   * The helper text content.
   */
  helperText: PropTypes.node,
  /**
   * @ignore
   */
  hiddenLabel: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The component used for the input element.
   * Either a string to use a DOM element or a component.
   */
  inputComponent: PropTypes.elementType,
  /**
   * Props applied to the [`InputLabel`](/api/input-label/) element.
   */
  InputLabelProps: PropTypes.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/api/filled-input/),
   * [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps: PropTypes.object,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * The label content.
   */
  label: PropTypes.node,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  /**
   * If `true`, a textarea element will be rendered instead of an input.
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * Callback fired when a [`MenuItem`](/api/menu-item) representing a suggestion is clicked or selected
   * @param {string} value The value of the suggestion, returned by `getSuggestionValue()`
   */
  onSuggestionSelect: PropTypes.func,
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * Props applied to the [`Popper`](/api/popper) element.
   */
  PopperProps: PropTypes.object,
  /**
   * If `true`, the label is displayed as required and the `input` element` will be required.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

export default withStyles(styles, { name: 'MuiAutocomplete' })(Autocomplete);
