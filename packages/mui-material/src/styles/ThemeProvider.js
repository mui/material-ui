'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import THEME_ID from './identifier';

export default function ThemeProvider({ theme: themeInput, ...props }) {
  const scopedTheme = themeInput[THEME_ID];
  let finalTheme = scopedTheme || themeInput;
  if (typeof themeInput !== 'function') {
    if (scopedTheme && !scopedTheme.vars) {
      finalTheme = { ...scopedTheme, vars: null };
    } else if (themeInput && !themeInput.vars) {
      finalTheme = { ...themeInput, vars: null };
    }
  }
  return (
    <SystemThemeProvider
      {...props}
      themeId={scopedTheme ? THEME_ID : undefined}
      theme={finalTheme}
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
