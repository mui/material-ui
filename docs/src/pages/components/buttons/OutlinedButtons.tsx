import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function OutlinedButtons() {
  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      <Button variant="outlined">Primary</Button>
      <Button variant="outlined" color="secondary">
        Secondary
      </Button>
      <Button variant="outlined" disabled>
        Disabled
      </Button>
      <Button variant="outlined" href="#outlined-buttons">
        Link
      </Button>
    </Box>
  );
}
