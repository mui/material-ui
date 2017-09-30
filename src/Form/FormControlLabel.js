// @flow
/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import type { Node, Element } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = (theme: Object) => ({
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

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * If `true`, the component appears selected.
   */
  checked?: boolean | string,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: Element<any>,
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
  label: Node,
  /*
   * @ignore
   */
  name?: string,
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

/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
function FormControlLabel(props: ProvidedProps & Props) {
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
      [classes.disabled]: disabled,
    },
    classNameProp,
  );

  return (
    <label className={className} {...other}>
      {React.cloneElement(control, {
        disabled: typeof control.props.disabled === 'undefined' ? disabled : control.props.disabled,
        checked: typeof control.props.checked === 'undefined' ? checked : control.props.checked,
        name: control.props.name || name,
        onChange: control.props.onChange || onChange,
        value: control.props.value || value,
        inputRef: control.props.inputRef || inputRef,
      })}
      <Typography className={classes.label}>{label}</Typography>
    </label>
  );
}

FormControlLabel.defaultProps = {
  disabled: false,
};

export default withStyles(styles, { name: 'MuiFormControlLabel' })(FormControlLabel);
