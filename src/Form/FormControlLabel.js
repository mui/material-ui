// @flow weak
/* eslint-disable jsx-a11y/label-has-for */

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiFormControlLabel', theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    // Remove Gray Highlight
    WebkitTapHighlightColor: theme.palette.common.transparent,
  },
  disabled: {
    color: theme.palette.text.disabled,
    cursor: 'default',
  },
  hasLabel: {
    marginLeft: -12,
    marginRight: theme.spacing.unit * 2, // used for row presentation of radio/checkbox
  },
  label: {
    fontFamily: theme.typography.fontFamily,
    userSelect: 'none',
  },
}));

function FormControlLabel(props) {
  const {
    checked,
    classes,
    className: classNameProp,
    control,
    disabled,
    inputRef,
    label,
    name,
    onChange,
    value,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    {
      [classes.hasLabel]: label && label.length,
      [classes.disabled]: disabled,
    },
    classNameProp,
  );

  return (
    <label className={className} {...other}>
      {cloneElement(control, {
        disabled: typeof control.props.disabled === 'undefined' ? disabled : control.props.disabled,
        checked: typeof control.props.checked === 'undefined' ? checked : control.props.checked,
        name: control.props.name || name,
        onChange: control.props.onChange || onChange,
        value: control.props.value || value,
        inputRef: control.props.inputRef || inputRef,
      })}
      <span className={classes.label}>
        {label}
      </span>
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
  control: PropTypes.element.isRequired,
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
  label: PropTypes.node.isRequired,
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

FormControlLabel.defaultProps = {
  disabled: false,
};

export default withStyles(styleSheet)(FormControlLabel);
