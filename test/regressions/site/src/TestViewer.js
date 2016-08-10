// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';

export const styleSheet = createStyleSheet('TestViewer', (theme) => {
  const { palette, typography } = theme;
  return {
    '@raw html': { boxSizing: 'border-box' },
    '@raw *, *:before, *:after': { boxSizing: 'inherit' },
    '@raw body': {
      margin: 0,
      background: palette.background.default,
      fontFamily: typography.fontFamily,
      color: palette.text.primary,
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased',
    },
    '@raw a': {
      color: palette.accent.A400,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '@raw p': {
      lineHeight: '1.6',
    },
    root: {
      display: 'flex',
      width: '100%',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    },
    info: {
      position: 'absolute',
      top: 20,
      right: 20,
      fontSize: 12,
      fontWeight: 500,
      color: palette.error[500],
    },
  };
});

export default class TestViewer extends Component {
  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func,
    routes: PropTypes.array,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

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
