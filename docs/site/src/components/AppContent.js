// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('AppContent', (theme) => {
  return {
    content: theme.mixins.gutters({
      paddingTop: 80,
      flex: '1 1 100%',
      maxWidth: '100%',
      margin: '0 auto',
    }),
    [theme.breakpoints.up(948)]: {
      content: {
        maxWidth: 900,
      },
    },
  };
});

export default function AppContent(props, context) {
  const { className, children } = props;
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classNames(classes.content, className)}>
      {children}
    </div>
  );
}

AppContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

AppContent.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
