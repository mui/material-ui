import * as React from 'react';
import PropTypes from 'prop-types';
import useThemeProps from '../styles/useThemeProps';
import GlobalStyles from '../GlobalStyles';

export const html = {
  WebkitFontSmoothing: 'antialiased', // Antialiasing.
  MozOsxFontSmoothing: 'grayscale', // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box',
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: '100%',
};

export const body = (theme) => ({
  color: theme.palette.text.primary,
  ...theme.typography.body1,
  backgroundColor: theme.palette.background.default,
  '@media print': {
    // Save printer ink.
    backgroundColor: theme.palette.common.white,
  },
});

export const styles = (theme) => {
  let defaultStyles = {
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
  };

  const themeOverrides = theme.components?.MuiCssBaseline?.styleOverrides;
  if (themeOverrides) {
    defaultStyles = [defaultStyles, themeOverrides];
  }

  return defaultStyles;
};

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssBaseline(inProps) {
  const props = useThemeProps({ props: inProps, name: 'MuiCssBaseline' });
  const { children } = props;
  return (
    <React.Fragment>
      <GlobalStyles styles={styles} />
      {children}
    </React.Fragment>
  );
}

CssBaseline.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * You can wrap a node.
   */
  children: PropTypes.node,
};

export default CssBaseline;
