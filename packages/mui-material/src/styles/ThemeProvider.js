import * as React from 'react';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';

export default function ThemeProvider(props) {
  return <SystemThemeProvider {...props} identifier="$$material" />;
}
