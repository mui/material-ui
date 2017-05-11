// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import { FormLabel } from '../Form';

export const styleSheet = createStyleSheet('MuiTextFieldLabel', (theme) => {
  return {
    root: {
      position: 'absolute',
      left: 0,
      top: 0,
      transform: 'translate(0, 18px) scale(1)',
      transformOrigin: 'top left',
    },
    shrink: {
      transform: 'translate(0, 0px) scale(0.75)',
    },
    animated: {
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
    },
  };
});

export default function TextFieldLabel(props, context) {
  const {
    disableAnimation,
    children,
    className: classNameProp,
    shrink,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  const className = classNames(classes.root, {
    [classes.animated]: !disableAnimation,
    [classes.shrink]: shrink,
  }, classNameProp);

  return (
    <FormLabel className={className} {...other}>
      {children}
    </FormLabel>
  );
}

TextFieldLabel.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the transition animation is disabled.
   */
  disableAnimation: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused.
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: PropTypes.bool,
};

TextFieldLabel.defaultProps = {
  disableAnimation: false,
  shrink: false,
};

TextFieldLabel.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

TextFieldLabel.muiName = 'TextFieldLabel';
