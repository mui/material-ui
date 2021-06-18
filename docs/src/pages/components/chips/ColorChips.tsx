import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';

export default function ColorChips() {
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        <Chip label="primary" color="primary" />
        <Chip label="secondary" color="secondary" />
        <Chip label="error" color="error" />
        <Chip label="info" color="info" />
        <Chip label="success" color="success" />
        <Chip label="warning" color="warning" />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label="primary" color="primary" variant="outlined" />
        <Chip label="secondary" color="secondary" variant="outlined" />
        <Chip label="error" color="error" variant="outlined" />
        <Chip label="info" color="info" variant="outlined" />
        <Chip label="success" color="success" variant="outlined" />
        <Chip label="warning" color="warning" variant="outlined" />
      </Stack>
    </Stack>
  );
}
