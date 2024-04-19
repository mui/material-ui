import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';

export default function ButtonDisabled() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button disabled variant="solid" startDecorator={<Add />}>
        Solid
      </Button>
      <Button disabled color="neutral" variant="soft" startDecorator={<Add />}>
        Soft
      </Button>
      <Button disabled color="success" variant="outlined" startDecorator={<Add />}>
        Outlined
      </Button>
      <Button disabled color="danger" variant="plain" startDecorator={<Add />}>
        Plain
      </Button>
    </Box>
  );
}
