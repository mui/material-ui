import React from 'react';
import ThemeContext from './ThemeContext';

export default function useTheme() {
  const theme = React.useContext(ThemeContext);

  if (process.env.NODE_ENV !== 'production') {
    React.useDebugValue(theme);
  }

  return theme;
}
