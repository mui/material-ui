import React from 'react';
import Box from '@material-ui/core/Box';

export default function Overflow() {
  return (
    <div style={{ width: 200, whiteSpace: 'nowrap' }}>
      <Box component="div" my={2} overflow="hidden" bgcolor="background.paper">
        Overflow Hidden. Overflow Hidden. Overflow Hidden.
      </Box>
      <Box component="div" my={2} overflow="auto" bgcolor="background.paper">
        Overflow Auto. Overflow Auto. Overflow Auto.
      </Box>
    </div>
  );
}
