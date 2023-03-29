import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import IDENTIFIER from './identifier';

export default function ThemeProvider({ theme: themeInput, ...props }) {
  const scopedTheme = themeInput[IDENTIFIER];
  return (
    <SystemThemeProvider
      {...props}
      identifier={scopedTheme ? IDENTIFIER : undefined}
      theme={scopedTheme || themeInput}
    />
  );
}

ThemeProvider.propTypes = {
  theme: PropTypes.object,
};
