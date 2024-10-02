import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { createM3Theme, Button, TextField } from '@mui/material/unstable_m3';

const m3Theme = createM3Theme();

export default function M3ThemePage() {
  return (
    <ThemeProvider theme={m3Theme}>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          p: 2,
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        }}
      >
        <Button>Hello</Button>
        <TextField label="Label" helperText="Helper Text" />
        <TextField variant="filled" label="Label" helperText="Helper Text" />
        <TextField variant="outlined" label="Label" helperText="Helper Text" />
      </Box>
    </ThemeProvider>
  );
}
