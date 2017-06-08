// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiFormHelperText', theme => ({
  root: {
    color: theme.palette.input.helperText,
    fontFamily: theme.typography.fontFamily,
    fontSize: 12,
    lineHeight: 1.4,
    minHeight: 16,
    margin: 0,
  },
  error: {
    color: theme.palette.error.A400,
  },
  disabled: {
    color: theme.palette.input.disabled,
  },
}));

function FormHelperText(props, context) {
  const {
    children,
    classes,
    className: classNameProp,
    disabled: disabledProp,
    error: errorProp,
    ...other
  } = props;
  const { muiFormControl } = context;

  let disabled = disabledProp;
  let error = errorProp;

  if (muiFormControl && typeof disabled === 'undefined') {
    disabled = muiFormControl.disabled;
  }

  if (muiFormControl && typeof error === 'undefined') {
    error = muiFormControl.error;
  }

  const className = classNames(
    classes.root,
    {
      [classes.disabled]: disabled,
      [classes.error]: error,
    },
    classNameProp,
  );

  return (
    <p className={className} {...other}>
      {children}
    </p>
  );
}

FormHelperText.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: PropTypes.bool,
};

FormHelperText.contextTypes = {
  muiFormControl: PropTypes.object,
};

export default withStyles(styleSheet)(FormHelperText);
