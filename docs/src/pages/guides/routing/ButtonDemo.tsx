import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

export default function ButtonDemo() {
  return (
    <Box role="presentation" onClick={preventDefault}>
      <Button href="/" variant="contained">
        Link
      </Button>
    </Box>
  );
}
