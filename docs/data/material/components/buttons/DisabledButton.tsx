import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function DisabledButton() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined">Default</Button>
      <Button variant="outlined" disabled>
        Click disabled
      </Button>
    </Stack>
  );
}
