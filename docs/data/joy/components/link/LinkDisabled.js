import * as React from 'react';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';

export default function LinkDisabled() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Link href="#disabled" disabled variant="solid">
        Solid
      </Link>
      <Link href="#disabled" disabled variant="soft">
        Soft
      </Link>
      <Link href="#disabled" disabled variant="outlined">
        Outlined
      </Link>
      <Link href="#disabled" disabled variant="plain">
        Plain
      </Link>
    </Box>
  );
}
