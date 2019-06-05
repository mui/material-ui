import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function FontWeight() {
  return (
    <Typography component="div">
      <Box fontWeight="fontWeightLight" m={1}>
        Light
      </Box>
      <Box fontWeight="fontWeightRegular" m={1}>
        Regular
      </Box>
      <Box fontWeight="fontWeightMedium" m={1}>
        Medium
      </Box>
      <Box fontWeight={600} m={1}>
        600
      </Box>
    </Typography>
  );
}

export default FontWeight;
