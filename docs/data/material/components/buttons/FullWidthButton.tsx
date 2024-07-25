import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function FullWidthButton() {
  return (
    <Box
      sx={{
        width: '300px',
        border: '1px solid gray',
        borderRadius: '5px',
        padding: '5px',
      }}
    >
      <Button variant="contained" fullWidth>
        Full width button
      </Button>
    </Box>
  );
}
