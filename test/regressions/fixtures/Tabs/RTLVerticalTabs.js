import * as React from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

export default function RTLVerticalTabs() {
  return (
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
  );
}
