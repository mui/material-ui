import * as React from 'react';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

export default function ButtonsSimple() {
  return (
    <Box>
      <Button>Button</Button>
      <Button disabled>Disabled</Button>
    </Box>
  );
}
