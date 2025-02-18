import * as React from 'react';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';

export default function LinkUnderline() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Link href="#underline" underline="always">
        Always
      </Link>
      <Link href="#underline" underline="hover">
        Hover
      </Link>
      <Link href="#underline" underline="none">
        None
      </Link>
    </Box>
  );
}
