import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function WhiteSpace() {
  return (
    <div style={{ width: 200 }}>
      <Box
        component="div"
        sx={{
          whiteSpace: 'nowrap',
          my: 2,
          bgcolor: 'background.paper',
        }}
      >
        White Space Nowrap. White Space Nowrap.
      </Box>
      <Box
        component="div"
        sx={{
          whiteSpace: 'normal',
          my: 2,
          bgcolor: 'background.paper',
        }}
      >
        White Space Normal. White Space Normal.
      </Box>
    </div>
  );
}
