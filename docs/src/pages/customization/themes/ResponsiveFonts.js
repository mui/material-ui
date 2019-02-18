import React from 'react';
import { createMuiTheme, responsiveTypography } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const defaultTheme = createMuiTheme();

const theme = {
  ...defaultTheme,
  typography: responsiveTypography(defaultTheme.typography, {
    maxScale: 2.0,
    breakpointSettings: defaultTheme.breakpoints,
    breakpoints: ['sm', 'lg'],
  }),
};

function ResponsiveTheme() {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h6">I am responsive.</Typography>
    </ThemeProvider>
  );
}

export default ResponsiveTheme;
