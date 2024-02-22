import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ColorMixPage() {
  return (
    <CssVarsProvider
      disableNestedContext
      theme={extendTheme({
        colorSpace: 'oklch',
        colorSchemes: {
          light: {
            palette: { primary: { main: 'oklch(80% 0.30 50)', contrastText: '#fff' } },
          },
        },
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100lvh',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="text" color="primary">
            Text
          </Button>
          <Button variant="contained" color="primary">
            Contained
          </Button>
          <Button variant="outlined" color="primary">
            Outlined
          </Button>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
