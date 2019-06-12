import React from 'react';
import Box from '@material-ui/core/Box';

function TextOverflow() {
  return (
    <div style={{ width: 50 }}>
      <Box component="div" textOverflow="clip" bgcolor="background.paper">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Box>
      <Box component="div" textOverflow="ellipsis" bgcolor="background.paper">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Box>
    </div>
  );
}

export default TextOverflow;
