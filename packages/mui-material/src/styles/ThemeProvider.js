import * as React from 'react';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import IDENTIFIER from './identifier';

export default function ThemeProvider(props) {
  return <SystemThemeProvider {...props} identifier={IDENTIFIER} />;
}
