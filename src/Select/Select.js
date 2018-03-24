// @inheritedComponent Input

import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from './SelectInput';
import withStyles from '../styles/withStyles';
import Input from '../Input'; // Import to enforce the CSS injection order

export const styles = theme => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  select: {
    '-moz-appearance': 'none', // Reset
    '-webkit-appearance': 'none', // Reset
    // When interacting quickly, the text can end up selected.
    // Native select can't be selected either.
    userSelect: 'none',
    paddingRight: theme.spacing.unit * 4,
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    minWidth: theme.spacing.unit * 2, // So it doesn't collapse.
    cursor: 'pointer',
    '&:focus': {
      // Show that it's not an text input
      background:
        theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
      borderRadius: 0, // Reset Chrome style
    },
    // Remove Firefox focus border
    '&:-moz-focusring': {
      color: 'transparent',
      textShadow: '0 0 0 #000',
    },
    // Remove IE11 arrow
    '&::-ms-expand': {
      display: 'none',
    },
  },
  selectMenu: {
    width: 'auto', // Fix Safari textOverflow
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    minHeight: '1.1875em', // Reset (19px), match the native input line-height
  },
  disabled: {
    cursor: 'default',
  },
  icon: {
    // We use a position absolute over a flexbox in order to forward the pointer events
    // to the input.
    position: 'absolute',
    right: 0,
    top: 'calc(50% - 12px)', // Center vertically
    color: theme.palette.action.active,
    'pointer-events': 'none', // Don't block pointer events on the select under the icon.
  },
});

function Select(props) {
  const {
    autoWidth,
    children,
    classes,
    displayEmpty,
    input,
    inputProps,
    MenuProps,
    multiple,
    native,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    ...other
  } = props;

  return React.cloneElement(input, {
    // Most of the logic is implemented in `SelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: SelectInput,
    inputProps: {
      autoWidth,
      children,
      classes,
      displayEmpty,
      MenuProps,
      multiple,
      native,
      onClose,
      onOpen,
      open,
      renderValue,
      SelectDisplayProps,
      type: undefined, // We render a select. We can ignore the type provided by the `Input`.
      ...inputProps,
      ...(input ? input.props.inputProps : {}),
    },
    ...other,
  });
}

Select.propTypes = {
  /**
   * If true, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: PropTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   * You can only use it when the `native` property is `false` (default).
   */
  displayEmpty: PropTypes.bool,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: PropTypes.element,
  /**
   * Properties applied to the `input` element.
   * When `native` is `true`, the properties are applied on the `select` element.
   */
  inputProps: PropTypes.object,
  /**
   * Properties applied to the `Menu` element.
   */
  MenuProps: PropTypes.object,
  /**
   * If true, `value` must be an array and the menu will support multiple selections.
   * You can only use it when the `native` property is `false` (default).
   */
  multiple: PropTypes.bool,
  /**
   * If `true`, the component will be using a native `select` element.
   */
  native: PropTypes.bool,
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Useful in controlled mode (see open).
   *
   * @param {object} event The event source of the callback
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Useful in controlled mode (see open).
   *
   * @param {object} event The event source of the callback
   */
  onOpen: PropTypes.func,
  /**
   * Control `select` open state.
   * You can only use it when the `native` property is `false` (default).
   */
  open: PropTypes.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` property is `false` (default).
   *
   * @param {*} value The `value` provided to the component.
   * @returns {ReactElement}
   */
  renderValue: PropTypes.func,
  /**
   * Properties applied to the clickable div element.
   */
  SelectDisplayProps: PropTypes.object,
  /**
   * The input value.
   * This property is required when the `native` property is `false` (default).
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
};

Select.defaultProps = {
  autoWidth: false,
  displayEmpty: false,
  input: <Input />,
  multiple: false,
  native: false,
};

Select.muiName = 'Select';

export default withStyles(styles, { name: 'MuiSelect' })(Select);
