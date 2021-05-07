import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function ContainedButtons() {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
      }}
    >
      <Button variant="contained" color="secondary">
        Contained
      </Button>
      <Button variant="outlined" color="secondary">
        Outlined
      </Button>
      <Button variant="text" color="secondary">
        Text
      </Button>
      <Button variant="dashed" color="secondary">
        Dashed
      </Button>
    </Box>
  );
}
