import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';

function Inline() {
  return (
    <div style={{ width: '100%' }}>
      <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
        inline
      </Box>
      <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
        inline
      </Box>
    </div>
  );
}

export default Inline;
