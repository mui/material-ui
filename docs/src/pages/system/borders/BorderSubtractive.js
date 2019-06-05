import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const inner = (
  <Box
    bgcolor="background.paper"
    border={1}
    m={1}
    borderColor="text.primary"
    style={{ width: '5rem', height: '5rem' }}
  />
);

function BorderSubtractive() {
  return (
    <Grid container justify="center">
      <Box border={0} clone>
        {inner}
      </Box>
      <Box borderTop={0} clone>
        {inner}
      </Box>
      <Box borderRight={0} clone>
        {inner}
      </Box>
      <Box borderBottom={0} clone>
        {inner}
      </Box>
      <Box borderLeft={0} clone>
        {inner}
      </Box>
    </Grid>
  );
}

export default BorderSubtractive;
