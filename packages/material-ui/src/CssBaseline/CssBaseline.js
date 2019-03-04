/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '../styles';
import { exactProp } from '@material-ui/utils';

const styles = theme => ({
  '@global': {
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      // Change from `box-sizing: content-box` so that `width`
      // is not affected by `padding` or `border`.
      boxSizing: 'border-box',
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0, // Remove the margin in all browsers.
      backgroundColor: theme.palette.background.default,
      '@media print': {
        // Save printer ink.
        backgroundColor: theme.palette.common.white,
      },
      ...theme.typography.body2,
    },
  },
});

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
class CssBaseline extends React.Component {
  render() {
    return this.props.children;
  }
}

CssBaseline.propTypes = {
  /**
   * You can wrap a node.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  CssBaseline.propTypes = exactProp(CssBaseline.propTypes);
}

CssBaseline.defaultProps = {
  children: null,
};

export default withStyles(styles, { name: 'MuiCssBaseline' })(CssBaseline);
