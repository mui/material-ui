import * as React from 'react';
import Box from '@mui/material/Box';

export default function ContainerBreakpointsAsObject() {
  return (
    <div>
      <Box
        sx={{
          width: {
            cqxs: 100, // theme.breakpoints.up('xs', 'container')
            cqsm: 200, // theme.breakpoints.up('sm', 'container')
            cqmd: 300, // theme.breakpoints.up('md', 'container')
            cqlg: 400, // theme.breakpoints.up('lg', 'container')
            cqxl: 500, // theme.breakpoints.up('xl', 'container')
          },
        }}
      >
        This box has a responsive width.
      </Box>
    </div>
  );
}
