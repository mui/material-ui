import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';

function Height() {
  return (
    <Box height={100} width="100%" bg="background.paper">
      <Box height="25%" bg="grey.300" mx={0.5} width={120} display="inline-block">
        Height 25%
      </Box>
      <Box height="50%" bg="grey.300" mx={0.5} width={120} display="inline-block">
        Height 50%
      </Box>
      <Box height="75%" bg="grey.300" mx={0.5} width={120} display="inline-block">
        Height 75%
      </Box>
      <Box height="100%" bg="grey.300" mx={0.5} width={120} display="inline-block">
        Height 100%
      </Box>
    </Box>
  );
}

export default Height;
