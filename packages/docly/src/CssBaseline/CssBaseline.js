/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '../styles';
import exactProp from '../material-core/utils/exactProp';

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
    },
    ':root': {
      '--spacing-xt': '8px',
      '--spacing-t': '12px',
      '--spacing-xs': '16px',
      '--spacing-s': '24px',
      '--spacing-m': '32px',
      '--spacing-l': '48px',
      '--spacing-xl': '64px',
      '--spacing-xxl': '64px',
    },
    // tablet: @media(min-width: 600px)
    [theme.breakpoints.up('sm')]: {
      ':root': {
        '--spacing-xt': '8px',
        '--spacing-t': '12px',
        '--spacing-xs': '16px',
        '--spacing-s': '24px',
        '--spacing-m': '32px',
        '--spacing-l': '52px',
        '--spacing-xl': '72px',
        '--spacing-xxl': '72px',
      },
    },
    // desktop small: @media(min-width: 960px)
    [theme.breakpoints.up('md')]: {
      ':root': {
        '--spacing-xt': '12px',
        '--spacing-t': '16px',
        '--spacing-xs': '20px',
        '--spacing-s': '28px',
        '--spacing-m': '36px',
        '--spacing-l': '60px',
        '--spacing-xl': '84px',
        '--spacing-xxl': '84px',
      },
    },
    // desktop large: @media(min-width: 1280px)
    [theme.breakpoints.up('lg')]: {
      ':root': {
        '--spacing-xt': '12px',
        '--spacing-t': '16px',
        '--spacing-xs': '24px',
        '--spacing-s': '32px',
        '--spacing-m': '40px',
        '--spacing-l': '64px',
        '--spacing-xl': '96px',
        '--spacing-xxl': '160px',
      },
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

CssBaseline.propTypes = exactProp(CssBaseline.propTypes);

CssBaseline.defaultProps = {
  children: null,
};

export default withStyles(styles, { name: 'MuiCssBaseline' })(CssBaseline);
