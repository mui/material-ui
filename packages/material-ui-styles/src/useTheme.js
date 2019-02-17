import React from 'react';
import warning from 'warning';
import ThemeContext from './ThemeContext';

export default function useTheme(_) {
  warning(!_, "Material-UI: useTheme() doesn't accept any argument.");
  return React.useContext(ThemeContext);
}
