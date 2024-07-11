import * as React from 'react';
import { CssVarsProvider, extendTheme, createTheme } from '@mui/material/styles';
import { cyan } from '@mui/material/colors';
import Box from '@mui/material/Box';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

const ocean = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: cyan[200],
    },
  },
});

const theme = extendTheme({
  colorSchemeSelector: '[data-mui-color-scheme="%s"]',
  disableCssColorScheme: true,
  colorSchemes: {
    ocean: {
      palette: ocean.palette,
    },
  },
});

export default function MaterialScopedCssBaseline() {
  return (
    <CssVarsProvider theme={theme}>
      <ScopedCssBaseline
        enableColorScheme
        data-mui-color-scheme="ocean"
        sx={{ width: 300, height: 100, overflow: 'scroll', bgcolor: 'background.paper' }}
      >
        {/* The scrollbar should be dark */}
        <Box sx={{ height: 1000 }} />
      </ScopedCssBaseline>
    </CssVarsProvider>
  );
}
