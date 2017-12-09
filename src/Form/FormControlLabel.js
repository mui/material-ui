/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    // Remove grey highlight
    WebkitTapHighlightColor: theme.palette.common.transparent,
    marginLeft: -14,
    marginRight: theme.spacing.unit * 2, // used for row presentation of radio/checkbox
  },
  disabled: {
    color: theme.palette.text.disabled,
    cursor: 'default',
  },
  label: {
    userSelect: 'none',
  },
});

/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
function FormControlLabel(props, context) {
  const {
    checked,
    classes,
    className: classNameProp,
    control,
    disabled: disabledProp,
    inputRef,
    label,
    name,
    onChange,
    value,
    ...other
  } = props;

  const { muiFormControl } = context;
  let disabled = disabledProp;

  if (typeof control.props.disabled !== 'undefined') {
    if (typeof disabled === 'undefined') {
      disabled = control.props.disabled;
    }
  }

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  const className = classNames(
    classes.root,
    {
      [classes.disabled]: disabled,
    },
    classNameProp,
  );

  return (
    <label className={className} {...other}>
      {React.cloneElement(control, {
        disabled,
        checked: typeof control.props.checked === 'undefined' ? checked : control.props.checked,
        name: control.props.name || name,
        onChange: control.props.onChange || onChange,
        value: control.props.value || value,
        inputRef: control.props.inputRef || inputRef,
      })}
      <Typography component="span" className={classes.label}>
        {label}
      </Typography>
    </label>
  );
}

FormControlLabel.propTypes = {
  /**
   * If `true`, the component appears selected.
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: PropTypes.element,
  /**
   * If `true`, the control will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: PropTypes.func,
  /**
   * The text to be used in an enclosing label element.
   */
  label: PropTypes.node,
  /*
   * @ignore
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func,
  /**
   * The value of the component.
   */
  value: PropTypes.string,
};

FormControlLabel.contextTypes = {
  muiFormControl: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiFormControlLabel' })(FormControlLabel);
