import * as React from 'react';
import { deepmerge } from '@mui/utils';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';

export default function BrandingProvider({ children }: { children: React.ReactNode }) {
  const upperTheme = useTheme();
  const mode = upperTheme.palette.mode;
  const theme = React.useMemo(() => {
    const designTokens = getDesignTokens(mode);
    let newTheme = createTheme(designTokens);
    newTheme = deepmerge(newTheme, getThemedComponents(newTheme));
    return newTheme;
  }, [mode]);
  return (
    <ThemeProvider theme={theme}>
      <NextNProgressBar />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
