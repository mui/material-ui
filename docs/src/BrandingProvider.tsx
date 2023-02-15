import * as React from 'react';
import { createSpacing } from '@mui/system';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { brandingDarkTheme, brandingLightTheme } from 'docs/src/modules/brandingTheme';
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';
import SkipLink from 'docs/src/modules/components/SkipLink';
import MarkdownLinks from 'docs/src/modules/components/MarkdownLinks';

interface BrandingProviderProps {
  children: React.ReactNode;
  /**
   * If not `undefined`, the provider is considered nesting and does not render NextNProgressBar & CssBaseline
   */
  mode?: 'light' | 'dark';
  /**
   * If `true`, the `theme.spacing` produces narrow spacing.
   */
  dense?: boolean;
}

const denseBrandingLightTheme = { ...brandingLightTheme, spacing: createSpacing() };
const denseBrandingDarkTheme = { ...brandingDarkTheme, spacing: createSpacing() };

const themeMapping = {
  light: brandingLightTheme,
  dark: brandingDarkTheme,
  lightDense: denseBrandingLightTheme,
  darkDense: denseBrandingDarkTheme,
};

export default function BrandingProvider(props: BrandingProviderProps) {
  const { children, mode: modeProp, dense } = props;
  const upperTheme = useTheme();
  const mode = modeProp || upperTheme.palette.mode;
  const theme = themeMapping[`${mode}${dense ? 'Dense' : ''}`];
  return (
    <ThemeProvider theme={modeProp ? () => theme : theme}>
      {modeProp ? null : <NextNProgressBar />}
      {modeProp ? null : <CssBaseline />}
      {modeProp ? null : <SkipLink />}
      {modeProp ? null : <MarkdownLinks />}
      {children}
    </ThemeProvider>
  );
}
