import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '../styles';
import exactProp from '../utils/exactProp';

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
  },
});

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
class Reboot extends React.Component {
  render() {
    return this.props.children;
  }
}

Reboot.propTypes = {
  /**
   * You can only provide a single element with react@15, a node with react@16.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
};

Reboot.propTypes = exactProp(Reboot.propTypes, 'Reboot');

Reboot.defaultProps = {
  children: null,
};

export default withStyles(styles, { name: 'MuiReboot' })(Reboot);
