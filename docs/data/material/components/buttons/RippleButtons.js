import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function RippleButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">Default</Button>
      <Button variant="outlined" disableFocusRipple>
        Disable focus ripple
      </Button>
      <Button variant="outlined" disableRipple>
        Disable ripple
      </Button>
    </Stack>
  );
}
