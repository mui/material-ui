import React from 'react';
import Box from '@material-ui/core/Box';

function FlexWrap() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        display="flex"
        flexWrap="nowrap"
        p={1}
        m={1}
        bgcolor="background.paper"
        css={{ maxWidth: 300 }}
      >
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        p={1}
        m={1}
        bgcolor="background.paper"
        css={{ maxWidth: 300 }}
      >
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
      </Box>
    </div>
  );
}

export default FlexWrap;
