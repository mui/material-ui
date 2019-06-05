import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const inner = (
  <Box
    bgcolor="background.paper"
    m={1}
    borderColor="text.primary"
    style={{ width: '5rem', height: '5rem' }}
  />
);

function BorderAdditive() {
  return (
    <Grid container justify="center">
      <Box border={1} clone>
        {inner}
      </Box>
      <Box borderTop={1} clone>
        {inner}
      </Box>
      <Box borderRight={1} clone>
        {inner}
      </Box>
      <Box borderBottom={1} clone>
        {inner}
      </Box>
      <Box borderLeft={1} clone>
        {inner}
      </Box>
    </Grid>
  );
}

export default BorderAdditive;
