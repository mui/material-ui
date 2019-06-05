import React from 'react';
import Box from '@material-ui/core/Box';

function Height() {
  return (
    <Box height={100} width="100%" bgcolor="background.paper">
      <Box height="25%" bgcolor="grey.300" mx={0.5} width={120} display="inline-block">
        Height 25%
      </Box>
      <Box height="50%" bgcolor="grey.300" mx={0.5} width={120} display="inline-block">
        Height 50%
      </Box>
      <Box height="75%" bgcolor="grey.300" mx={0.5} width={120} display="inline-block">
        Height 75%
      </Box>
      <Box height="100%" bgcolor="grey.300" mx={0.5} width={120} display="inline-block">
        Height 100%
      </Box>
    </Box>
  );
}

export default Height;
