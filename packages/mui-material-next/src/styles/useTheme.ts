'use client';
import * as React from 'react';
import { useTheme as useSystemTheme } from '@mui/system';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';
import { Theme } from './Theme.types';

export default function useTheme(): Theme {
  const theme = useSystemTheme(defaultTheme);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  // @ts-ignore internal logic
  return theme[THEME_ID] || theme;
}
