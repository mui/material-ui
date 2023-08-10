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
      <Link href="#levels" level="title-lg">
        Title Large
      </Link>
      <Link href="#levels" level="title-md">
        Title Medium
      </Link>
      <Link href="#levels" level="title-sm">
        Title Small
      </Link>
      <Link href="#levels" level="title-lg">
        Body Large
      </Link>
      <Link href="#levels">Body Medium</Link>
      <Link href="#levels" level="body-sm">
        Body Small
      </Link>
      <Link href="#levels" level="body-xs">
        Body Extra Small
      </Link>
    </Box>
  );
}
