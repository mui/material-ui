// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { easing } from '../styles/transitions';
import LabelBase from '../internal/LabelBase';

export const styleSheet = createStyleSheet('TextFieldLabel', (theme) => {
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
      transition: theme.transitions.create('transform', '200ms', null, easing.easeOut),
    },
  };
});

export default function TextFieldLabel(props, context) {
  const {
    animated,
    children,
    className: classNameProp,
    shrink,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  const className = classNames(classes.root, {
    [classes.animated]: animated,
    [classes.shrink]: shrink,
  }, classNameProp);

  return (
    <LabelBase className={className} {...other}>
      {children}
    </LabelBase>
  );
}

TextFieldLabel.propTypes = {
  animated: PropTypes.bool,
  /**
   * The contents of the `TextFieldLabel`.
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

TextFieldLabel.defaultProps = {
  animated: true,
};

TextFieldLabel.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

TextFieldLabel.muiName = 'TextFieldLabel';
