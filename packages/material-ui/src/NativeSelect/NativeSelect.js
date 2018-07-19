// @inheritedComponent Input

import React from 'react';
import PropTypes from 'prop-types';
import NativeSelectInput from './NativeSelectInput';
import withStyles from '../styles/withStyles';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import Input from '../Input';

export const styles = theme => ({
  /* Styles applied to the `Input` component `root` class. */
  root: {
    position: 'relative',
    width: '100%',
  },
  /* Styles applied to the `Input` component `select` class. */
  select: {
    '-moz-appearance': 'none', // Reset
    '-webkit-appearance': 'none', // Reset
    // When interacting quickly, the text can end up selected.
    // Native select can't be selected either.
    userSelect: 'none',
    paddingRight: 32,
    width: 'calc(100% - 32px)',
    minWidth: 16, // So it doesn't collapse.
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
    '&$disabled': {
      cursor: 'default',
    },
  },
  /* Styles applied to the `Input` component `selectMenu` class. */
  selectMenu: {
    width: 'auto', // Fix Safari textOverflow
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    minHeight: '1.1875em', // Reset (19px), match the native input line-height
  },
  /* Styles applied to the `Input` component `disabled` class. */
  disabled: {},
  /* Styles applied to the `Input` component `icon` class. */
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

/**
 * An alternative to `<Select native />` with a much smaller dependency graph.
 */
function NativeSelect(props) {
  const { children, classes, IconComponent, input, inputProps, ...other } = props;

  return React.cloneElement(input, {
    // Most of the logic is implemented in `NativeSelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: NativeSelectInput,
    inputProps: {
      children,
      classes,
      IconComponent,
      type: undefined, // We render a select. We can ignore the type provided by the `Input`.
      ...inputProps,
      ...(input ? input.props.inputProps : {}),
    },
    ...other,
  });
}

NativeSelect.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: PropTypes.element,
  /**
   * Attributes applied to the `select` element.
   */
  inputProps: PropTypes.object,
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   */
  onChange: PropTypes.func,
  /**
   * The input value.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

NativeSelect.defaultProps = {
  IconComponent: ArrowDropDownIcon,
  input: <Input />,
};

NativeSelect.muiName = 'NativeSelect';

export default withStyles(styles, { name: 'MuiNativeSelect' })(NativeSelect);
