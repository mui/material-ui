import * as React from 'react';
import { deepmerge } from '@mui/utils';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';
import SkipLink from 'docs/src/modules/components/SkipLink';

interface BrandingProviderProps {
  children: React.ReactNode;
  /**
   * If not `undefined`, the provider is considered nesting and does not render NextNProgressBar & CssBaseline
   */
  mode?: 'light' | 'dark';
}

export default function BrandingProvider(props: BrandingProviderProps) {
  const { children, mode: modeProp } = props;
  const upperTheme = useTheme();
  const mode = modeProp || upperTheme.palette.mode;
  const theme = React.useMemo(() => {
    const designTokens = getDesignTokens(mode);
    let newTheme = createTheme(designTokens);
    newTheme = deepmerge(newTheme, getThemedComponents(newTheme));
    return newTheme;
  }, [mode]);
  return (
    <ThemeProvider theme={modeProp ? () => theme : theme}>
      {modeProp ? null : <NextNProgressBar />}
      {modeProp ? null : <CssBaseline />}
      {modeProp ? null : <SkipLink />}
      {children}
    </ThemeProvider>
  );
}
