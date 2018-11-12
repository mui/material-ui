import React from 'react';
import { ThemeContext } from './ThemeProvider';

export default function useTheme() {
  return React.useContext(ThemeContext);
}
