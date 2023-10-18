import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import colors from '@mui/joy/colors';
import Box from '@mui/joy/Box';
import ScopedCssBaseline from '@mui/joy/ScopedCssBaseline';

const theme = extendTheme({
  colorSchemes: {
    forest: {
      palette: {
        mode: 'dark',
        background: {
          body: colors.green[200],
        },
      },
    },
  },
});

export default function JoyScopedCssBaseline() {
  return (
    <CssVarsProvider theme={theme}>
      <ScopedCssBaseline
        data-joy-color-scheme="forest"
        sx={{ width: 300, height: 100, overflow: 'scroll', bgcolor: 'background.body' }}
      >
        {/* The scrollbar should be dark */}
        <Box sx={{ height: 1000 }} />
      </ScopedCssBaseline>
    </CssVarsProvider>
  );
}
