import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what the font-size on the html element is.
    htmlFontSize: 10,
  },
});

export default function FontSizeTheme() {
  return (
    <ThemeProvider theme={theme}>
      <Typography>body1</Typography>
    </ThemeProvider>
  );
}
