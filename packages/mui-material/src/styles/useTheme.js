'use client';
import * as React from 'react';
import { useTheme as useThemeSystem } from '@mui/system';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';

export default function useTheme() {
  const theme = useThemeSystem(defaultTheme);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  return theme[THEME_ID] || theme;
}
