/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Link as RouterLink, MemoryRouter as Router } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
));

export default function LinkRouter() {
  return (
    <Box sx={{ typography: 'body1' }}>
      <Router>
        <Link component={RouterLink} to="/">
          With prop forwarding
        </Link>
        <br />
        <Link component={LinkBehavior}>Without prop forwarding</Link>
      </Router>
    </Box>
  );
}
