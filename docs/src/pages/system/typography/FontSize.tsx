import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function FontSize() {
  return (
    <Typography component="div">
      <Box fontSize="fontSize" m={1}>
        Default
      </Box>
      <Box fontSize="h6.fontSize" m={1}>
        h6.fontSize
      </Box>
      <Box fontSize={16} m={1}>
        16px
      </Box>
    </Typography>
  );
}

export default FontSize;
