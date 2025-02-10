import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const theme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: '[data-mui-color-scheme="%s"]',
  disableCssColorScheme: true,
});

export default function MaterialCssBaseline() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ width: 300, height: 100, overflow: 'scroll', bgcolor: 'background.paper' }}>
          {/* The scrollbar should be light */}
          <Box sx={{ height: 1000 }} />
        </Box>
        <Box
          data-mui-color-scheme="dark"
          sx={{ width: 300, height: 100, overflow: 'scroll', bgcolor: 'background.paper' }}
        >
          {/* The scrollbar should be dark */}
          <Box sx={{ height: 1000 }} />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
