import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

export default function Height() {
  return (
    <Grid container>
      <Box
        boxShadow={0}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '8rem', height: '5rem' }}
      >
        boxShadow={0}
      </Box>
      <Box
        boxShadow={1}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '8rem', height: '5rem' }}
      >
        boxShadow={1}
      </Box>
      <Box
        boxShadow={2}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '8rem', height: '5rem' }}
      >
        boxShadow={2}
      </Box>
      <Box
        boxShadow={3}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '8rem', height: '5rem' }}
      >
        boxShadow={3}
      </Box>
    </Grid>
  );
}
