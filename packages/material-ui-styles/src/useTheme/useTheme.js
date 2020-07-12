import React from 'react';
import ThemeContext from './ThemeContext';

export default function useTheme() {
  const theme = React.useContext(ThemeContext);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  return theme;
}
