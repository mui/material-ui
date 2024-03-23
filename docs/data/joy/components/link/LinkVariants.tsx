import * as React from 'react';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';

export default function LinkVariants() {
  return (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      <Link href="#variants">Link</Link>
      <Link href="#variants" variant="plain">
        Link
      </Link>
      <Link href="#variants" variant="soft">
        Link
      </Link>
      <Link href="#variants" variant="outlined">
        Link
      </Link>
      <Link href="#variants" variant="solid">
        Link
      </Link>
    </Box>
  );
}
