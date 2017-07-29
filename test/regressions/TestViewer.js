// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet, withStyles } from 'material-ui/styles';

const styleSheet = createStyleSheet(theme => {
  return {
    '@global': {
      html: {
        // Do the opposite of the docs in order to help catching issues.
        boxSizing: 'border-box',
      },
      // Disable transitions to avoid flaky screenshots
      '*, *:before, *:after': {
        boxSizing: 'inherit',
        transition: 'none !important',
        animation: 'none !important',
      },
      body: {
        margin: 0,
        background: theme.palette.background.default,
        overflowX: 'hidden',
        WebkitFontSmoothing: 'antialiased',
      },
    },
    root: {
      padding: theme.spacing.unit,
    },
  };
});

function TestViewer(props) {
  const { children, classes } = props;

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
}

TestViewer.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TestViewer);
