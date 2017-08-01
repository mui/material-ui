// @flow
/* eslint-disable jsx-a11y/label-has-for */

import React, { cloneElement } from 'react';
import type { Element } from 'react';
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

export type Props = {
  /**
   * If `true`, the component appears selected.
   */
  checked?: boolean | string,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: Element<*>,
  /**
   * If `true`, the control will be disabled.
   */
  disabled?: boolean,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef?: Function,
  /**
   * The text to be used in an enclosing label element.
   */
  label: PropTypes.node.isRequired,
  /*
   * @ignore
   */
  name?: string | Element<*>,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange?: Function,
  /**
   * The value of the component.
   */
  value?: string,
};

function FormControlLabel(props: Props) {
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

FormControlLabel.defaultProps = {
  disabled: false,
};

export default withStyles(styleSheet)(FormControlLabel);
