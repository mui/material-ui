import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function FontWeight() {
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
      <Box fontWeight={500} m={1}>
        500
      </Box>
      <Box fontWeight="fontWeightBold" m={1}>
        Bold
      </Box>
    </Typography>
  );
}
