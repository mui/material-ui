// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('AppContent', (theme) => {
  return {
    content: theme.mixins.gutters({
      paddingTop: 80,
      flex: '1 1 100%',
      maxWidth: 900,
      margin: '0 auto',
      '@raw h1': {
        ...theme.typography.display2,
        color: theme.palette.text.secondary,
        margin: '1em 0 0.7em',
      },
      '@raw h2': {
        ...theme.typography.display1,
        color: theme.palette.text.secondary,
        margin: '1em 0 0.7em',
      },
      '@raw p, @raw ul': {
        lineHeight: '1.6',
      },
      '@raw p code, @raw ul code': {
        fontSize: 14,
      },
    }),
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
