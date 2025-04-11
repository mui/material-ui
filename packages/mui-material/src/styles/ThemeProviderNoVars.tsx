'use client';
import * as React from 'react';
import { ThemeProvider as SystemThemeProvider, DefaultTheme } from '@mui/system';
import THEME_ID from './identifier';

export interface ThemeProviderNoVarsProps<Theme = DefaultTheme> {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
}

let warnedOnceNoSsr = false;

export default function ThemeProviderNoVars<Theme = DefaultTheme>({
  theme: themeInput,
  ...props
}: ThemeProviderNoVarsProps<Theme>): React.ReactElement<ThemeProviderNoVarsProps<Theme>> {
  const scopedTheme = THEME_ID in themeInput ? themeInput[THEME_ID] : undefined;
  if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    if (process.env.NODE_ENV !== 'test' && props.noSsr && !warnedOnceNoSsr) {
      console.error(
        [
          'MUI: The `noSsr` prop must be used with the theme that contains light and dark colorSchemes.',
          'See https://mui.com/material-ui/customization/dark-mode/#built-in-support for more details.',
        ].join('\n'),
      );
      warnedOnceNoSsr = true;
    }
  }
  return (
    <SystemThemeProvider
      {...props}
      themeId={scopedTheme ? THEME_ID : undefined}
      theme={scopedTheme || themeInput}
    />
  );
}
