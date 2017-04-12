// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import { FormLabel } from '../Form';

export const styleSheet = createStyleSheet('MuiInputLabel', (theme) => {
  const { transitions } = theme;
  return {
    root: {
      transformOrigin: 'top left',
      fontSmoothing: 'antialiased',
    },
    formControl: {
      position: 'absolute',
      left: 0,
      top: 0,
      transform: 'translate(0, 40px)',
    },
    shrink: {
      fontSize: 12,
      transform: 'translate(0, 18px)',
      transformOrigin: 'top left',
    },
    animated: {
      transition: transitions.create(['transform', 'font-size'], {
        duration: transitions.duration.shorter,
        easing: transitions.easing.easeOut,
      }),
    },
    disabled: {
      color: theme.palette.input.disabled,
    },
  };
});

export default function InputLabel(props, context) {
  const {
    disabled,
    disableAnimation,
    children,
    className: classNameProp,
    shrink: shrinkProp,
    ...other
  } = props;

  const { muiFormControl, styleManager } = context;
  const classes = styleManager.render(styleSheet);

  let shrink = shrinkProp;

  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.dirty || muiFormControl.focused;
  }

  const className = classNames(classes.root, {
    [classes.formControl]: muiFormControl,
    [classes.animated]: !disableAnimation,
    [classes.shrink]: shrink,
    [classes.disabled]: disabled,
  }, classNameProp);

  return (
    <FormLabel className={className} {...other}>
      {children}
    </FormLabel>
  );
}

InputLabel.propTypes = {
  /**
   * The contents of the `InputLabel`.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If `true`, apply disabled class.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the transition animation is disabled.
   */
  disableAnimation: PropTypes.bool,
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused.
   */
  focused: PropTypes.bool,
  /**
   * if `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: PropTypes.bool,
};

InputLabel.defaultProps = {
  disabled: false,
  disableAnimation: false,
};

InputLabel.contextTypes = {
  muiFormControl: PropTypes.object,
  styleManager: customPropTypes.muiRequired,
};
