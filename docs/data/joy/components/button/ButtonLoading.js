import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

export default function ButtonLoading() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button loading variant="solid">
        Solid
      </Button>
      <Button loading variant="soft">
        Soft
      </Button>
      <Button loading variant="outlined">
        Outlined
      </Button>
      <Button loading variant="plain">
        Plain
      </Button>
    </Box>
  );
}
