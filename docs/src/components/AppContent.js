// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import MarkdownElement from 'docs/src/components/MarkdownElement';

const styleSheet = createStyleSheet('AppContent', (theme) => {
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

function AppContent(props) {
  const {
    className,
    classes,
    children: childrenProp,
    route,
  } = props;

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
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  route: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(AppContent);
