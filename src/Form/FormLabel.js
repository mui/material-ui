// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import LabelBase from '../internal/LabelBase';

export const styleSheet = createStyleSheet('FormLabel', () => {
  return {
    root: {}, // expected to be used
  };
});

export default function FormLabel(props, context) {
  const {
    children,
    className: classNameProp,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  const className = classNames(classes.root, classNameProp);

  return (
    <LabelBase className={className} {...other}>
      {children}
    </LabelBase>
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
   * Whether the inputs this label refers to are focused.
   */
  focused: PropTypes.bool,
  /**
   * Whether this label should indicate that a response is required.
   */
  required: PropTypes.bool,
};

FormLabel.defaultProps = {
  error: false,
  required: false,
};

FormLabel.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

FormLabel.muiName = 'FormLabel';
