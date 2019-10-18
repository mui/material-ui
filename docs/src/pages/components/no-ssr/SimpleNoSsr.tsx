import React from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import Box from '@material-ui/core/Box';

export default function SimpleNoSsr() {
  return (
    <div>
      <Box p={2} bgcolor="primary.main" color="primary.contrastText">
        Server and Client
      </Box>
      <NoSsr>
        <Box p={2} bgcolor="secondary.main" color="primary.contrastText">
          Client only
        </Box>
      </NoSsr>
    </div>
  );
}
