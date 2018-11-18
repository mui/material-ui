import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';

function FlexShrink() {
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" p={1} bg="background.paper">
        <Box p={1} width="100%" bg="grey.300">
          Item 1
        </Box>
        <Box p={1} flexShrink={1} bg="grey.300">
          Item 2
        </Box>
        <Box p={1} flexShrink={0} bg="grey.300">
          Item 3
        </Box>
      </Box>
    </div>
  );
}

export default FlexShrink;
