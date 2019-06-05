import React from 'react';
import Box from '@material-ui/core/Box';

function Hiding() {
  return (
    <div style={{ width: '100%' }}>
      <Box display={{ xs: 'block', md: 'none' }} m={1}>
        hide on screens wider than md
      </Box>
      <Box display={{ xs: 'none', md: 'block' }} m={1}>
        hide on screens smaller than md
      </Box>
    </div>
  );
}

export default Hiding;
