import * as React from 'react';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

export default function LinkDemo() {
  return (
    <Box sx={{ typography: 'body1' }} role="presentation" onClick={preventDefault}>
      <Link href="/">Link</Link>
    </Box>
  );
}
