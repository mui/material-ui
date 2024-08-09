import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
  },
});

export default function DarkThemeCssVariables() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.default',
          width: '100%',
          borderRadius: '4px',
          p: 2,
        }}
      >
        <Alert
          variant="outlined"
          severity="info"
          sx={{ p: 2, width: 'fit-content', mx: 'auto' }}
        >
          <Typography>You are seeing me in dark palette.</Typography>
        </Alert>
      </Box>
    </ThemeProvider>
  );
}
