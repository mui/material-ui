import React from 'react';
import ThemeContext from './ThemeContext';

export default function useTheme() {
  return React.useContext(ThemeContext);
}
