import * as React from 'react';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

function preventDefault(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function LinkDemo() {
  return (
    <Box sx={{ typography: 'body1' }} onClick={preventDefault}>
      <Link href="/">Link</Link>
    </Box>
  );
}
