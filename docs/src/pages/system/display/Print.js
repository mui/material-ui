import React from 'react';
import Box from '@material-ui/core/Box';

function Print() {
  return (
    <div style={{ width: '100%' }}>
      <Box display="block" displayPrint="none" m={1}>
        Screen Only (Hide on print only)
      </Box>
      <Box display="none" displayPrint="block" m={1}>
        Print Only (Hide on screen only)
      </Box>
    </div>
  );
}

export default Print;
