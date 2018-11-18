import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';

function Order() {
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" p={1} bg="background.paper">
        <Box p={1} order={2} bg="grey.300">
          Item 1
        </Box>
        <Box p={1} order={3} bg="grey.300">
          Item 2
        </Box>
        <Box p={1} order={1} bg="grey.300">
          Item 3
        </Box>
      </Box>
    </div>
  );
}

export default Order;
