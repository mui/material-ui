import * as React from 'react';
import { AppBar, Box, Typography } from '@material-ui/core';
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
      <Box>
        <AppBar position="static">
          <Typography>Light | Default</Typography>
        </AppBar>
      </Box>
      <ThemeProvider theme={darkTheme}>
        <Box>
          <AppBar position="static">
            <Typography>Dark | Default</Typography>
          </AppBar>
        </Box>
      </ThemeProvider>
      <Box>
        <AppBar position="static" color="transparent">
          <Typography>Light | Transparent</Typography>
        </AppBar>
      </Box>
      <ThemeProvider theme={darkTheme}>
        <Box>
          <AppBar position="static" color="transparent">
            <Typography>Dark | Transparent</Typography>
          </AppBar>
        </Box>
      </ThemeProvider>
    </div>
  );
}
