import * as React from 'react';
import { ThemeProvider, useTheme, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';

export default function BrandingProvider({ children }: { children: React.ReactNode }) {
  const upperTheme = useTheme();
  const mode = upperTheme.palette.mode;
  const theme = React.useMemo(() => {
    const designTokens = getDesignTokens(mode);
    let newTheme = createTheme(designTokens);
    newTheme = createTheme(newTheme, getThemedComponents(newTheme));
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
