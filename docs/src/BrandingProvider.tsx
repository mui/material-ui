import * as React from 'react';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';

interface BrandingProviderProps {
  children: React.ReactNode;
  /**
   * If not `undefined`, the provider is considered nesting and does not render NextNProgressBar & CssBaseline
   */
  mode?: 'light' | 'dark';
}

export default function BrandingProvider({ children, mode: modeProp }: BrandingProviderProps) {
  const upperTheme = useTheme();
  const mode = modeProp || upperTheme.palette.mode;
  const theme = React.useMemo(
    () =>
      createTheme({
        ...getDesignTokens(mode),
        ...getThemedComponents(),
      }),
    [mode],
  );
  return (
    <ThemeProvider theme={modeProp ? () => theme : theme}>
      {!modeProp && <NextNProgressBar />}
      {!modeProp && <CssBaseline />}
      {children}
    </ThemeProvider>
  );
}
