// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

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
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

DialogContentText.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
