import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';

export default function ColorChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Primary" color="primary" />
      <Chip label="Primary" color="primary" variant="outlined" />
    </Stack>
  );
}
