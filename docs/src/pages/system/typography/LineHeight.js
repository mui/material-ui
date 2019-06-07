import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LineHeight() {
  return (
    <Typography component="div">
      <Box lineHeight="normal" m={1}>
        Normal height.
      </Box>
      <Box lineHeight={10} m={1}>
        10 px.
      </Box>
    </Typography>
  );
}

export default LineHeight;
