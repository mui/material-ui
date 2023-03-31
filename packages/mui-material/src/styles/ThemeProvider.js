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
  theme: PropTypes.object,
};
