import * as React from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import rtlPluginSc from 'stylis-plugin-rtl-sc';
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

export default function RTLVerticalTabs() {
  return (
    <StyleSheetManager stylisPlugins={[rtlPluginSc]}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
          <Box dir="rtl" sx={{ height: 200, display: 'flex' }}>
            <Tabs value={2} variant="scrollable" scrollButtons orientation="vertical">
              <Tab label="Tab A" />
              <Tab label="Tab B" />
              <Tab label="Tab C" />
              <Tab label="Tab D" />
              <Tab label="Tab E" />
            </Tabs>
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </StyleSheetManager>
  );
}
