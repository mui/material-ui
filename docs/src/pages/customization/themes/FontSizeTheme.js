import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});

function FontSizeTheme() {
  return (
    <MuiThemeProvider theme={theme}>
      <Typography>body1</Typography>
    </MuiThemeProvider>
  );
}

export default FontSizeTheme;
