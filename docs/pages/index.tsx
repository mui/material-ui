import * as React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import darkScrollbar from '@material-ui/core/darkScrollbar';
console.log(darkScrollbar());
const theme = createMuiTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          ${darkScrollbar()}
        }  
      `,
    },
  },
});

export default () => {
  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <div style={{ height: '900px', border: '1px solid black' }}>
      Hi!
    </div>
  </ThemeProvider>
}