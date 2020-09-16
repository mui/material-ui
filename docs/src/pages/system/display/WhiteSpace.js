import React from 'react';
import Box from '@material-ui/core/Box';

export default function WhiteSpace() {
  return (
    <div style={{ width: 200 }}>
      <Box component="div" my={2} whiteSpace="nowrap" bgcolor="background.paper">
        White Space Nowrap. White Space Nowrap.
      </Box>
      <Box component="div" my={2} whiteSpace="normal" bgcolor="background.paper">
        White Space Normal. White Space Normal.
      </Box>
    </div>
  );
}
