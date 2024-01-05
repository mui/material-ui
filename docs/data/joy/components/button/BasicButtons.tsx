import * as React from 'react';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

export default function BasicButtons() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button>Button</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </Box>
  );
}
