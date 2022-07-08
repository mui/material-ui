import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import rtlPluginSc from 'stylis-plugin-rtl-sc';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({ direction: 'rtl' });

export default function PositionedTooltips() {
  return (
    <StyleSheetManager stylisPlugins={[rtlPluginSc]}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Box sx={{ width: 500, margin: 10 }} dir="rtl">
            <Grid container justifyContent="center">
              <Grid item>
                <Tooltip title="Add" arrow open placement="top-start">
                  <Button>top-start</Button>
                </Tooltip>
                <Tooltip title="Add" arrow open placement="top">
                  <Button>top</Button>
                </Tooltip>
                <Tooltip title="Add" arrow open placement="top-end">
                  <Button>top-end</Button>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item xs={6}>
                <Tooltip title="Add" arrow open placement="left-start">
                  <Button>left-start</Button>
                </Tooltip>
                <br />
                <Tooltip title="Add" arrow open placement="left">
                  <Button>left</Button>
                </Tooltip>
                <br />
                <Tooltip title="Add" arrow open placement="left-end">
                  <Button>left-end</Button>
                </Tooltip>
              </Grid>
              <Grid item container xs={6} alignItems="flex-end" direction="column">
                <Grid item>
                  <Tooltip title="Add" arrow open placement="right-start">
                    <Button>right-start</Button>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Add" arrow open placement="right">
                    <Button>right</Button>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Add" arrow open placement="right-end">
                    <Button>right-end</Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <Tooltip title="Add" arrow open placement="bottom-start">
                  <Button>bottom-start</Button>
                </Tooltip>
                <Tooltip title="Add" arrow open placement="bottom">
                  <Button>bottom</Button>
                </Tooltip>
                <Tooltip title="Add" arrow open placement="bottom-end">
                  <Button>bottom-end</Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </StyleSheetManager>
  );
}
