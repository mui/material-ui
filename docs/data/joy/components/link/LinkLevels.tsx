import * as React from 'react';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';

export default function LinkLevels() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <Link href="#levels" level="h1">
        H1
      </Link>
      <Link href="#levels" level="h2">
        H2
      </Link>
      <Link href="#levels" level="h3">
        H3
      </Link>
      <Link href="#levels" level="h4">
        H4
      </Link>
      <Link href="#levels" level="h5">
        H5
      </Link>
      <Link href="#levels" level="h6">
        H6
      </Link>
      <Link href="#levels" level="body1">
        Body 1
      </Link>
      <Link href="#levels" level="body2">
        Body 2
      </Link>
      <Link href="#levels" level="body3">
        Body 3
      </Link>
    </Box>
  );
}
