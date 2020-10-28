import * as React from 'react';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}

const theme = createMuiTheme({
  breakpoints: {
    values: {
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});

export default function BreakpointsAsArray() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: {
            tablet: 100,
            laptop: 300,
            desktop: 500,
          },
        }}
      >
        This box has a responsive width
      </Box>
    </ThemeProvider>
  );
}
