// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import { FormLabel } from '../Form';

export const styleSheet = createStyleSheet('MuiInputLabel', theme => ({
  root: {
    transformOrigin: 'top left',
  },
  formControl: {
    position: 'absolute',
    left: 0,
    top: 0,
    transform: `translate(0, ${theme.spacing.unit * 5}px) scale(1)`,
  },
  shrink: {
    transform: `translate(0, ${theme.spacing.unit * 2 + 1.5}px) scale(0.75)`,
    transformOrigin: 'top left',
  },
  animated: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  disabled: {
    color: theme.palette.input.disabled,
  },
}));

function InputLabel(props, context) {
  const {
    disabled,
    disableAnimation,
    children,
    classes,
    className: classNameProp,
    shrink: shrinkProp,
    ...other
  } = props;

  const { muiFormControl } = context;
  let shrink = shrinkProp;

  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.dirty || muiFormControl.focused;
  }

  const className = classNames(
    classes.root,
    {
      [classes.formControl]: muiFormControl,
      [classes.animated]: !disableAnimation,
      [classes.shrink]: shrink,
      [classes.disabled]: disabled,
    },
    classNameProp,
  );

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
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the transition animation is disabled.
   */
  disableAnimation: PropTypes.bool,
  /**
   * If `true`, apply disabled class.
   */
  disabled: PropTypes.bool,
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
};

export default withStyles(styleSheet)(InputLabel);
