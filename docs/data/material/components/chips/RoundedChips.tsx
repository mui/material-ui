import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function RoundedChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Rounded" rounded />
      <Chip label="Rounded" rounded variant="outlined" />
    </Stack>
  );
}