import { useTheme as useThemeWithoutDefault } from '@material-ui/styles';
import React from 'react';
import defaultTheme from './defaultTheme';

export default function useTheme() {
  const theme = useThemeWithoutDefault() || defaultTheme;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  return theme;
}
