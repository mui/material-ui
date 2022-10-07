import * as React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

export default function JoyCssBaseline() {
  return (
    <CssVarsProvider>
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
        <ScopedCssBaseline
          enableColorScheme
          data-mui-color-scheme="dark"
          sx={{ width: 300, height: 100, overflow: 'scroll', bgcolor: 'background.paper' }}
        >
          {/* The scrollbar should be dark */}
          <Box sx={{ height: 1000 }} />
        </ScopedCssBaseline>
      </Box>
    </CssVarsProvider>
  );
}
