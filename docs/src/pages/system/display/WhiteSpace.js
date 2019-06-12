import React from 'react';
import Box from '@material-ui/core/Box';

function WhiteSpace() {
  return (
    <div>
      <Box component="div" overflow="scroll" whiteSpace="nowrap" bgcolor="background.paper">
        Lorem Ipsum is simply dummy text of the printing.
        Lorem Ipsum is simply dummy text of the printing.
      </Box>
      <Box component="div" whiteSpace="normal" bgcolor="background.paper">
        Lorem Ipsum is simply dummy text of the printing.
        Lorem Ipsum is simply dummy text of the printing.
      </Box>
    </div>
  );
}

export default WhiteSpace;
