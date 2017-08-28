// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = (theme: Object) => ({
  '@global': {
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      // Do the opposite of the docs in order to help catching issues.
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
      // Disable transitions to avoid flaky screenshots
      transition: 'none !important',
      animation: 'none !important',
    },
    body: {
      margin: 0,
      overflowX: 'hidden',
    },
  },
  root: {
    background: theme.palette.background.default,
    padding: theme.spacing.unit,
  },
});

class TestViewer extends Component<$FlowFixMeProps> {
  getChildContext() {
    return {
      url: {
        pathname: '/',
      },
    };
  }

  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.root}>
        {children}
      </div>
    );
  }
}

TestViewer.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

TestViewer.childContextTypes = {
  url: PropTypes.object,
};

export default withStyles(styles)(TestViewer);
