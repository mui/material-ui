// @flow weak
/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiFormHelperText', (theme) => {
  return {
    root: {
      color: theme.palette.input.helperText,
      fontSize: 12,
      lineHeight: 1.33333333,
      margin: 0,
    },
    error: {
      color: theme.palette.error.A400,
    },
  };
});

export default function FormHelperText(props, context) {
  const {
    children,
    className: classNameProp,
    error: errorProp,
    ...other
  } = props;

  const { muiFormControl, styleManager } = context;
  const classes = styleManager.render(styleSheet);

  let error = errorProp;

  if (muiFormControl && typeof error === 'undefined') {
    error = muiFormControl.error;
  }

  const className = classNames(classes.root, {
    [classes.error]: error,
  }, classNameProp);

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
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Whether the helper text should be displayed in an error state.
   */
  error: PropTypes.bool,
};

FormHelperText.contextTypes = {
  muiFormControl: PropTypes.object,
  styleManager: customPropTypes.muiRequired,
};
