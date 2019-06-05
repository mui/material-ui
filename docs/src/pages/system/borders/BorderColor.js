import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const inner = (
  <Box bgcolor="background.paper" m={1} border={1} style={{ width: '5rem', height: '5rem' }} />
);

function BorderColor() {
  return (
    <Grid container justify="center">
      <Box borderColor="primary.main" clone>
        {inner}
      </Box>
      <Box borderColor="secondary.main" clone>
        {inner}
      </Box>
      <Box borderColor="error.main" clone>
        {inner}
      </Box>
      <Box borderColor="grey.500" clone>
        {inner}
      </Box>
      <Box borderColor="text.primary" clone>
        {inner}
      </Box>
    </Grid>
  );
}

export default BorderColor;
