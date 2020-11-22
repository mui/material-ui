import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function Overflow() {
  return (
    <div style={{ width: 200, whiteSpace: 'nowrap' }}>
      <Box
        component="div"
        sx={{ overflow: 'hidden', my: 2, bgcolor: 'background.paper' }}
      >
        Overflow Hidden. Overflow Hidden. Overflow Hidden.
      </Box>
      <Box
        component="div"
        sx={{ overflow: 'auto', my: 2, bgcolor: 'background.paper' }}
      >
        Overflow Auto. Overflow Auto. Overflow Auto.
      </Box>
    </div>
  );
}
