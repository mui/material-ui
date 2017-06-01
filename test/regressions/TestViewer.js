// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';

const globalStyleSheet = createStyleSheet('global', theme => {
  const { palette } = theme;
  return {
    '@global': {
      html: {
        // Do the opposite of the docs in order to help catching issues.
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
    },
  };
});

const styleSheet = createStyleSheet('TestViewer', theme => {
  return {
    root: {
      padding: theme.spacing.unit,
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
