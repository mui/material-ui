import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

export default function CustomResponsiveFontSizes() {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h3">Responsive h3</Typography>
    </ThemeProvider>
  );
}
