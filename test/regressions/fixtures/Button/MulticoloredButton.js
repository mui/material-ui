import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const theme = createTheme({});

export default function MulticoloredButton() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            p: 3,
          }}
        >
          <Button variant="contained" color="inherit">
            Button
          </Button>
        </Box>
      </ThemeProvider>
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            p: 3,
          }}
        >
          <Button variant="contained" color="inherit">
            Button
          </Button>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}
