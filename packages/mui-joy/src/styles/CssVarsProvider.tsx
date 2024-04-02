'use client';
// do not remove the following import (https://github.com/microsoft/TypeScript/issues/29808#issuecomment-1320713018)
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import * as React from 'react';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import defaultTheme from './defaultTheme';
import type { SupportedColorScheme } from './types';
import THEME_ID from './identifier';

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  SupportedColorScheme,
  typeof THEME_ID
>({
  themeId: THEME_ID,
  theme: defaultTheme,
  attribute: 'data-joy-color-scheme',
  modeStorageKey: 'joy-mode',
  colorSchemeStorageKey: 'joy-color-scheme',
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
