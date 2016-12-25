// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('FormLabel', (theme) => {
  const focusColor = theme.palette.accent.A200;
  return {
    root: {
      color: theme.palette.text.secondary,
      lineHeight: 1,
    },
    focused: {
      color: focusColor,
    },
    error: {
      color: theme.palette.error[500],
    },
  };
});

export default function FormLabel(props, context) {
  const {
    children,
    className: classNameProp,
    error: errorProp,
    focused: focusedProp,
    required: requiredProp,
    ...other
  } = props;

  const { muiFormControl, styleManager } = context;
  const classes = styleManager.render(styleSheet);

  let required = requiredProp;
  let focused = focusedProp;
  let error = errorProp;

  if (muiFormControl) {
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }
    if (typeof focused === 'undefined') {
      focused = muiFormControl.focused;
    }
    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }
  }

  const className = classNames(classes.root, {
    [classes.focused]: focused,
    [classes.error]: error,
  }, classNameProp);

  const asteriskClassName = classNames({
    [classes.error]: error,
  });

  return (
    <label className={className} {...other}>
      {children}
      {required && (
        <span className={asteriskClassName} data-mui-test="FormLabelAsterisk">
          {'\u2009*'}
        </span>
      )}
    </label>
  );
}

FormLabel.propTypes = {
  /**
   * The contents of the `FormLabel`.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Whether the label should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * Whether the input of this label is focused (used by `Group` components).
   */
  focused: PropTypes.bool,
  /**
   * Whether this label should indicate that the input.
   * is required.
   */
  required: PropTypes.bool,
};

FormLabel.contextTypes = {
  muiFormControl: PropTypes.object,
  styleManager: PropTypes.object.isRequired,
};
