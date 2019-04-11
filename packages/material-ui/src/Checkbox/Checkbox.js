// @inheritedComponent IconButton

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { fade } from '../styles/colorManipulator';
import SwitchBase from '../internal/SwitchBase';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    '&:not($checked)': {
      color: theme.palette.text.secondary,
      '&:hover': {
        backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
      },
    },
  },
  /* Styles applied to the root element if `checked={true}`. */
  checked: {},
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `indeterminate={true}`. */
  indeterminate: {},
});

const Checkbox = React.forwardRef(function Checkbox(props, ref) {
  const {
    checkedIcon,
    classes,
    className,
    icon,
    indeterminate,
    indeterminateIcon,
    inputProps,
    ...other
  } = props;

  return (
    <SwitchBase
      type="checkbox"
      checkedIcon={indeterminate ? indeterminateIcon : checkedIcon}
      className={clsx(
        classes.root,
        {
          [classes.indeterminate]: indeterminate,
        },
        className,
      )}
      classes={{
        checked: classes.checked,
        disabled: classes.disabled,
      }}
      inputProps={{
        'data-indeterminate': indeterminate,
        ...inputProps,
      }}
      icon={indeterminate ? indeterminateIcon : icon}
      ref={ref}
      {...other}
    />
  );
});

Checkbox.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
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
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the input.
   */
  indeterminate: PropTypes.bool,
  /**
   * The icon to display when the component is indeterminate.
   */
  indeterminateIcon: PropTypes.node,
  /**
   * Properties applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * This property can be used to pass a ref callback to the `input` element.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.checked`.
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func,
  /**
   * The input component property `type`.
   */
  type: PropTypes.string,
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: PropTypes.any,
};

Checkbox.defaultProps = {
  checkedIcon: <CheckBoxIcon />,
  color: 'secondary',
  icon: <CheckBoxOutlineBlankIcon />,
  indeterminate: false,
  indeterminateIcon: <IndeterminateCheckBoxIcon />,
};

export default withStyles(styles, { name: 'MuiCheckbox' })(Checkbox);
