import * as React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
/**
 * how you used the components
 */
export default function Demo() {
  return (
    <div style={{ backgroundColor: '#ffefd5' }}>
      <AppBar position="static">
        <Typography>Light | Default</Typography>
      </AppBar>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Typography>Dark | Default</Typography>
        </AppBar>
      </ThemeProvider>
      <AppBar position="static" color="transparent">
        <Typography>Light | Transparent</Typography>
      </AppBar>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="transparent">
          <Typography>Dark | Transparent</Typography>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
