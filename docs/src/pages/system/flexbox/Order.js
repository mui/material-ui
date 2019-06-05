import React from 'react';
import Box from '@material-ui/core/Box';

function Order() {
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" p={1} bgcolor="background.paper">
        <Box p={1} order={2} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} order={3} bgcolor="grey.300">
          Item 2
        </Box>
        <Box p={1} order={1} bgcolor="grey.300">
          Item 3
        </Box>
      </Box>
    </div>
  );
}

export default Order;
