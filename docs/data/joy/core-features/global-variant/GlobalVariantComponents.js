import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';

export default function GlobalVariantComponents() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
      <Button variant="plain" color="primary">
        Plain
      </Button>
      <Button variant="outlined" color="primary">
        Outlined
      </Button>
      <Button variant="soft" color="primary">
        Soft
      </Button>
      <Button variant="solid" color="primary">
        Solid
      </Button>
      <Sheet
        variant="text"
        sx={{
          gridColumn: 'span 4',
          fontSize: 'sm',
          color: 'text.tertiary',
          textAlign: 'center',
        }}
      >
        Example of Joy buttons applying the global variants.
      </Sheet>
    </Box>
  );
}
