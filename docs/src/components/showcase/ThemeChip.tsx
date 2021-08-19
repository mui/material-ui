import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';

export default function ThemeChip() {
  return (
    <Stack direction="row" spacing={2}>
      <Chip label="React" color="primary" onDelete={() => {}} />
      <Chip label="Javascript" onDelete={() => {}} />
    </Stack>
  );
}
