import * as React from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({ direction: 'rtl' });

export default function ChipRtl() {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Box dir="rtl" sx={{ width: 500 }}>
            <Stack direction="row" spacing={1}>
              <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
              <Chip avatar={<Avatar>N</Avatar>} label="Avatar" variant="outlined" />
            </Stack>
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </StyleSheetManager>
  );
}
