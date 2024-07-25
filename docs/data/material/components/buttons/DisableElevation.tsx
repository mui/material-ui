import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function DisableElevation() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">Default</Button>
      <Button variant="contained" disableElevation>
        Elevation disabled
      </Button>
    </Stack>
  );
}
