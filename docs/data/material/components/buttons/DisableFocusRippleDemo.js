import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function DisableFocusRippleDemo() {
  return (
    <Box>
      <Button variant="contained" sx={{ mr: 1 }}>
        Default
      </Button>
      <Button variant="contained" disableFocusRipple>
        Focus Ripple Disabled
      </Button>
    </Box>
  );
}
