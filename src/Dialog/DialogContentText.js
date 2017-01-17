// @flow weak

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('DialogContentText', (theme) => {
  return {
    root: {
      ...theme.typography.subheading,
      color: theme.palette.text.secondary,
      margin: 0,
    },
  };
});

export default function DialogContentText(props, context) {
  const {
    children,
    className,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);

  return (
    <p className={classNames(classes.root, className)} {...other}>
      {children}
    </p>
  );
}

DialogContentText.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

DialogContentText.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
