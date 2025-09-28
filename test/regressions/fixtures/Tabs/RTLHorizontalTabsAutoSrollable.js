import * as React from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { StyleSheetManager } from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function RTLHorizontalTabsAutoSrollable() {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
          <Box dir="rtl" sx={{ width: 300, display: 'flex' }}>
            <Tabs value={2} variant="scrollable" scrollButtons="auto" orientation="horizontal">
              <Tab label="Tab A" />
              <Tab label="Tab B" />
              <Tab label="Tab C" />
              <Tab label="Tab D" />
              <Tab label="Tab E" />
              <Tab label="Tab F" />
              <Tab label="Tab G" />
            </Tabs>
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </StyleSheetManager>
  );
}
