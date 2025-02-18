'use client';
import * as React from 'react';
import { ThemeContext } from '@mui/styled-engine';

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function useTheme(defaultTheme = null) {
  const contextTheme = React.useContext(ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}

export default useTheme;
