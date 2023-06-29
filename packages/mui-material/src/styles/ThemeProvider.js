import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import THEME_ID from './identifier';

export default function ThemeProvider({ theme: themeInput, ...props }) {
  const scopedTheme = themeInput[THEME_ID];
  return (
    <SystemThemeProvider
      {...props}
      themeId={scopedTheme ? THEME_ID : undefined}
      theme={scopedTheme || themeInput}
    />
  );
}

ThemeProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
