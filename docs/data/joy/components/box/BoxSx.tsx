import * as React from 'react';
import { Box, ThemeProvider } from '@mui/joy';

export default function BoxSx() {
  return (
    <ThemeProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              primary: {
                400: '#38bdf8',
                700: '#0369a1',
              },
            },
          },
        },
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          bgcolor: 'primary.700',
          '&:hover': {
            bgcolor: 'primary.400',
          },
        }}
      />
    </ThemeProvider>
  );
}
