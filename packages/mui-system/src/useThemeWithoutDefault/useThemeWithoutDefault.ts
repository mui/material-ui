'use client';
import * as React from 'react';
import { ThemeContext } from '@mui/styled-engine';

function isObjectEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

function useThemeWithoutDefault<T = null>(defaultTheme: T = null as any): T {
  const contextTheme = React.useContext(ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme as T;
}

export default useThemeWithoutDefault;
