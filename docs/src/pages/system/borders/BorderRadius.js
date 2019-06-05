import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const inner = (
  <Box
    bgcolor="background.paper"
    borderColor="text.primary"
    m={1}
    border={1}
    style={{ width: '5rem', height: '5rem' }}
  />
);

function BorderRadius() {
  return (
    <Grid container justify="center">
      <Box borderRadius="50%" clone>
        {inner}
      </Box>
      <Box borderRadius="borderRadius" clone>
        {inner}
      </Box>
      <Box borderRadius={16} clone>
        {inner}
      </Box>
    </Grid>
  );
}

export default BorderRadius;
