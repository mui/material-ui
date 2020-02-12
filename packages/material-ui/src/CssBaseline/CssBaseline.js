import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '../styles/makeStyles';
import { exactProp } from '@material-ui/utils';

const useGlobalStyles = makeStyles(
  theme => ({
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
      'strong, b': {
        fontWeight: 'bolder',
      },
      body: {
        margin: 0, // Remove the margin in all browsers.
        color: theme.palette.text.primary,
        ...theme.typography.body2,
        backgroundColor: theme.palette.background.default,
        '@media print': {
          // Save printer ink.
          backgroundColor: theme.palette.common.white,
        },
        // Add support for document.body.requestFullScreen().
        // Other elements, if background transparent, are not supported.
        '&::backdrop': {
          backgroundColor: theme.palette.background.default,
        },
      },
    },
  }),
  { name: 'MuiCssBaseline' },
);

const useScopedStyles = makeStyles(
  theme => ({
    root: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      // Change from `box-sizing: content-box` so that `width`
      // is not affected by `padding` or `border`.
      boxSizing: 'border-box',
      '& *, & *::before, & *::after': {
        boxSizing: 'inherit',
      },
      '& strong, & b': {
        fontWeight: 'bolder',
      },
      color: theme.palette.text.primary,
      ...theme.typography.body2,
      backgroundColor: theme.palette.background.default,
      '@media print': {
        // Save printer ink.
        backgroundColor: theme.palette.common.white,
      },
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      '&::backdrop': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }),
  { name: 'MuiCssBaseline' },
);

const createUseStyles = scopeToChildren => {
  if (scopeToChildren) {
    return useScopedStyles;
  }

  return useGlobalStyles;
};

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssBaseline(props) {
  const { children = null, scopeToChildren = false } = props;
  const useStyles = createUseStyles(scopeToChildren);
  const classes = useStyles(props);

  if (scopeToChildren) {
    return <div className={classes.root}>{children}</div>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

CssBaseline.propTypes = {
  /**
   * You can wrap a node.
   */
  children: PropTypes.node,
  /**
   * If true the css baseline is only applied to the children
   */
  scopeToChildren: PropTypes.bool,
};

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  CssBaseline['propTypes' + ''] = exactProp(CssBaseline.propTypes);
}

export default CssBaseline;
