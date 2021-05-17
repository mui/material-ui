import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function TextOverflow() {
  return (
    <div style={{ width: 200, whiteSpace: 'nowrap' }}>
      <Box
        component="div"
        sx={{
          textOverflow: 'clip',
          my: 2,
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}
      >
        Text Overflow Clip. Text Overflow Clip.
      </Box>
      <Box
        component="div"
        sx={{
          textOverflow: 'ellipsis',
          my: 2,
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}
      >
        Text Overflow Ellipsis. Text Overflow Ellipsis
      </Box>
    </div>
  );
}
