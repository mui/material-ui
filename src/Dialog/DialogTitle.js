// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import Text from '../Text';

export const styleSheet = createStyleSheet('DialogTitle', () => {
  const gutter = 24;
  return {
    root: {
      margin: 0,
      padding: `${gutter}px ${gutter}px 20px ${gutter}px`,
      flex: '0 0 auto',
    },
  };
});

export default function DialogTitle(props, context) {
  const {
    children,
    className,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);

  return (
    <div data-mui-test="DialogTitle" className={classNames(classes.root, className)} {...other}>
      {typeof children === 'string' ? (
        <Text type="title">{children}</Text>
      ) : children}
    </div>
  );
}

DialogTitle.propTypes = {
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

DialogTitle.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
