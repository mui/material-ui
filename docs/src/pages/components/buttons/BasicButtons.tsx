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
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="dashed">Dashed</Button>
    </Box>
  );
}
