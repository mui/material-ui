import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

export default function DisabledButtons() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button disabled variant="solid">
        Solid
      </Button>
      <Button disabled variant="soft">
        Soft
      </Button>
      <Button disabled variant="outlined">
        Outlined
      </Button>
      <Button disabled variant="plain">
        Plain
      </Button>
    </Box>
  );
}
