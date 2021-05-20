import * as React from 'react';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

// testing docs/src/pages/customization/breakpoints/breakpoints.md

declare module '@material-ui/core/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
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
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'laptop',
      },
    },
  },
});

function MyContainer() {
  return (
    <ThemeProvider theme={theme}>
      hello
      <Container maxWidth="tablet">yooo</Container>
      <Dialog open maxWidth="tablet">
        <div />
      </Dialog>
    </ThemeProvider>
  );
}
