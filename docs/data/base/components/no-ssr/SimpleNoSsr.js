import * as React from 'react';
import { NoSsr } from '@mui/base/NoSsr';
import { Box } from '@mui/system';

export default function SimpleNoSsr() {
  return (
    <div>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        Server and Client
      </Box>
      <NoSsr>
        <Box
          sx={{ p: 2, bgcolor: 'secondary.main', color: 'secondary.contrastText' }}
        >
          Client only
        </Box>
      </NoSsr>
    </div>
  );
}
