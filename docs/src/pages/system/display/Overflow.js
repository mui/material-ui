import React from 'react';
import Box from '@material-ui/core/Box';

function Overflow() {
  return (
    <div style={{ width: 50 }}>
      <Box component="div" overflow="hidden" bgcolor="background.paper">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Box>
      <Box component="div" overflow="scroll" bgcolor="background.paper">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Box>
    </div>
  );
}

export default Overflow;
