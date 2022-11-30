import * as React from 'react';
import { createTheme, ThemeProvider, Box } from '@mui/system';

const theme = createTheme({
  unstable_sxConfig: {
    // You can now use the background key in sx
    // by providing direct values from the palette
    background: {
      themeKey: 'palette',
    },
  },
  palette: {
    primary: {
      main: '#007FFF',
      contrastText: '#FFFFFF',
    },
  },
});

export default function ExtendSxProp() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: 'primary.main',
          color: 'primary.contrastText',
          p: 1,
          borderRadius: 2,
        }}
      >
        Primary main background
      </Box>
    </ThemeProvider>
  );
}
