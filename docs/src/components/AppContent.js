// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import MarkdownElement from 'docs/src/components/MarkdownElement';

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
  const {
    className,
    children: childrenProp,
    route,
  } = props;

  const classes = context.styleManager.render(styleSheet);
  let children = childrenProp;

  if (!children) {
    const text = `
# Summary

${route.childRoutes.map((childRoute) => (`- [${childRoute.title}](${childRoute.path})`)).join('\n')}
`;
    children = <MarkdownElement text={text} />;
  }

  return (
    <div className={classNames(classes.content, className)}>
      {children}
    </div>
  );
}

AppContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  route: PropTypes.object.isRequired,
};

AppContent.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
