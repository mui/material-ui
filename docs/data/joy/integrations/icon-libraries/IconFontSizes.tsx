import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Person from '@mui/icons-material/Person';

export default function IconFontSizes() {
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ gridColumn: '1 / -1', alignItems: 'center', justifyContent: 'center' }}
    >
      <Person fontSize="xs" />
      <Person fontSize="sm" />
      <Person fontSize="md" />
      <Person fontSize="lg" />
      <Person fontSize="xl" />
      <Person fontSize="xl2" />
      <Person fontSize="xl3" />
      <Person fontSize="xl4" />
    </Stack>
  );
}
