import React from 'react';
import Box from '@material-ui/core/Box';

export default function FlexShrink() {
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" p={1} bgcolor="background.paper">
        <Box p={1} width="100%" bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} flexShrink={1} bgcolor="grey.300">
          Item 2
        </Box>
        <Box p={1} flexShrink={0} bgcolor="grey.300">
          Item 3
        </Box>
      </Box>
    </div>
  );
}
