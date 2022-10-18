import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';

const customTheme = extendTheme({
  typography: {
    display1: {
      background:
        'linear-gradient(-30deg, var(--joy-palette-primary-700), var(--joy-palette-primary-400))',
      // `Webkit*` properties must come later.
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
});

export default function CustomTypographyLevel() {
  return (
    <CssVarsProvider theme={customTheme}>
      <Box sx={(theme) => theme.typography.display1}>Gradient text</Box>
    </CssVarsProvider>
  );
}
