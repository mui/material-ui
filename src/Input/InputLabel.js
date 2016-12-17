// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { easing } from '../styles/transitions';
import { FormLabel } from '../Form';

export const styleSheet = createStyleSheet('InputLabel', (theme) => {
  return {
    root: {
      transformOrigin: 'top left',
    },
    formControl: {
      position: 'absolute',
      left: 0,
      top: 0,
      transform: 'translate(0, 18px) scale(1)',
    },
    shrink: {
      transform: 'translate(0, 0px) scale(0.75)',
      transformOrigin: 'top left',
    },
    animated: {
      transition: theme.transitions.create('transform', '200ms', null, easing.easeOut),
    },
  };
});

export default function InputLabel(props, context) {
  const {
    animated,
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
    [classes.animated]: animated,
    [classes.shrink]: shrink,
  }, classNameProp);

  return (
    <FormLabel className={className} {...other}>
      {children}
    </FormLabel>
  );
}

InputLabel.propTypes = {
  animated: PropTypes.bool,
  /**
   * The contents of the `InputLabel`.
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
   * Whether the input of this label is focused.
   */
  focused: PropTypes.bool,
  /**
   * Whether this label should indicate that the input is required.
   */
  required: PropTypes.bool,
  shrink: PropTypes.bool,
};

InputLabel.defaultProps = {
  animated: true,
};

InputLabel.contextTypes = {
  muiFormControl: PropTypes.object,
  styleManager: PropTypes.object.isRequired,
};
