import * as React from 'react';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';

export default function BasicsLink() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Link href="#basics">Link</Link>
      <Link href="#basics" disabled>
        Disabled
      </Link>
    </Box>
  );
}
