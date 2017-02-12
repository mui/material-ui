// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';

const globalStyleSheet = createStyleSheet('global', (theme) => {
  const { palette, typography } = theme;
  return {
    '@global': {
      html: {
        boxSizing: 'border-box',
      },
      '*, *:before, *:after': {
        boxSizing: 'inherit',
        transition: 'none !important',
        animation: 'none !important',
      },
      body: {
        margin: 0,
        background: palette.background.default,
        fontFamily: typography.fontFamily,
        color: palette.text.primary,
        lineHeight: '1.2',
        overflowX: 'hidden',
        WebkitFontSmoothing: 'antialiased',
      },
      a: {
        color: palette.accent.A400,
        textDecoration: 'none',
      },
      'a:hover': {
        textDecoration: 'underline',
      },
      p: {
        lineHeight: '1.6',
      },
    },
  };
});

const styleSheet = createStyleSheet('TestViewer', () => {
  return {
    root: {
      display: 'inline-block',
      padding: 10,
    },
  };
});

export default class TestViewer extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  componentWillMount() {
    this.context.styleManager.render(globalStyleSheet);
  }

  render() {
    const { children } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div className={classes.root}>
        {children}
      </div>
    );
  }
}
