import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import * as React from 'react';

export default function SimpleSheet() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > div': {
          m: 2,
          width: 128,
          height: 128,
        },
      }}
    >
      <Sheet elevation="sm" />
      <Sheet elevation="md" />
      <Sheet elevation="lg" />
    </Box>
  );
}
