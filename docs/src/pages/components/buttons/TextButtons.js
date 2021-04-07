import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function TextButtons() {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
      }}
    >
      <Button>Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button disabled>Disabled</Button>
      <Button href="#text-buttons">Link</Button>
    </Box>
  );
}
