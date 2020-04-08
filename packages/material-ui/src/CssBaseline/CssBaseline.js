import * as React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { exactProp } from '@material-ui/utils';

export const html = {
  WebkitFontSmoothing: 'antialiased', // Antialiasing.
  MozOsxFontSmoothing: 'grayscale', // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box',
};

export const body = (theme) => ({
  color: theme.palette.text.primary,
  ...theme.typography.body2,
  backgroundColor: theme.palette.background.default,
  '@media print': {
    // Save printer ink.
    backgroundColor: theme.palette.common.white,
  },
});

export const styles = (theme) => ({
  '@global': {
    html,
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },
    'strong, b': {
      fontWeight: theme.typography.fontWeightBold,
    },
    body: {
      margin: 0, // Remove the margin in all browsers.
      ...body(theme),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      '&::backdrop': {
        backgroundColor: theme.palette.background.default,
      },
    },
  },
});

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssBaseline(props) {
  /* eslint-disable no-unused-vars */
  const { children = null, classes } = props;
  /* eslint-enable no-unused-vars */
  return <React.Fragment>{children}</React.Fragment>;
}

CssBaseline.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * You can wrap a node.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  CssBaseline['propTypes' + ''] = exactProp(CssBaseline.propTypes);
}

export default withStyles(styles, { name: 'MuiCssBaseline' })(CssBaseline);
