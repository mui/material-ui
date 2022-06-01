import * as React from 'react';
import Box from '@mui/material/Box';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import rtlPluginSc from 'stylis-plugin-rtl-sc';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import Snackbar from '@mui/material/Snackbar';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({ direction: 'rtl' });

export default function PositionedSnackbar() {
  return (
    <StyleSheetManager stylisPlugins={[rtlPluginSc]}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Box dir="rtl" sx={{ width: window?.innerWidth, height: '100vh' }}>
            <Snackbar
              key="left"
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              message="Snackbar should show right (RTL)"
              open
            />
            <Snackbar
              key="right"
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              message="Snackbar should show left (RTL)"
              open
            />
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </StyleSheetManager>
  );
}
