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
    size={{
      mobile: 1,
      tablet: 2,
      laptop: 3,
      desktop: 4,
    }}
    offset={{
      mobile: 1,
      tablet: 2,
      laptop: 3,
      desktop: 4,
    }}
  />
</ThemeProvider>;

<ThemeProvider theme={theme}>
  {/* @ts-expect-error unknown desk */}
  <Grid size={{ desk: 4 }} />
</ThemeProvider>;

<ThemeProvider theme={theme}>
  {/* @ts-expect-error unknown deskOffset */}
  <Grid offset={{ desk: 4 }} />
</ThemeProvider>;
