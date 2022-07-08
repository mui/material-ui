import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/system';
import Grid from '@mui/system/Grid';

declare module '@mui/system' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});

<ThemeProvider theme={theme}>
  <Grid
    mobile={1}
    tablet={2}
    laptop={3}
    desktop={4}
    mobileOffset={1}
    tabletOffset={2}
    laptopOffset={3}
    desktopOffset={4}
  />
</ThemeProvider>;

<ThemeProvider theme={theme}>
  {/* @ts-expect-error unknow desk */}
  <Grid desk={4} />
</ThemeProvider>;

<ThemeProvider theme={theme}>
  {/* @ts-expect-error unknow deskOffset */}
  <Grid deskOffset={4} />
</ThemeProvider>;
