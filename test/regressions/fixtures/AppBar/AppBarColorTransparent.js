import * as React from 'react';
import { AppBar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
