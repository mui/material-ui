import * as React from 'react';
import { Box } from '@mui/joy';
import Button from '@mui/joy/Button';

export default function BoxComponent() {
  return (
    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
      <Button>Save</Button>
    </Box>
  );
}
