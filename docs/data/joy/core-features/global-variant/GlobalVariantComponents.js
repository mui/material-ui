import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

export default function GlobalVariantComponents() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, minmax(0, 1fr))',
          sm: 'repeat(4, minmax(0, 1fr))',
        },
        gap: 2,
      }}
    >
      <Button variant="solid" color="primary">
        Solid
      </Button>
      <Button variant="soft" color="primary">
        Soft
      </Button>
      <Button variant="outlined" color="primary">
        Outlined
      </Button>
      <Button variant="plain" color="primary">
        Plain
      </Button>
    </Box>
  );
}
