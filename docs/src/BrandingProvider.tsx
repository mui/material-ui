import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { brandingDarkTheme } from 'docs/src/modules/brandingTheme';
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
  const { children, mode } = props;

  if (mode === 'dark') {
    return <ThemeProvider theme={() => brandingDarkTheme}>{children}</ThemeProvider>;
  }

  // TODO replace this with
  return (
    <React.Fragment>
      <NextNProgressBar />
      <CssBaseline />
      <SkipLink />
      {children}
    </React.Fragment>
  );
}
