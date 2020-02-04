import React from 'react';
import Box from '@material-ui/core/Box';

export default function TextOverflow() {
  return (
    <div style={{ width: 200, whiteSpace: 'nowrap' }}>
      <Box component="div" my={2} textOverflow="clip" overflow="hidden" bgcolor="background.paper">
        Text Overflow Clip. Text Overflow Clip.
      </Box>
      <Box
        component="div"
        my={2}
        textOverflow="ellipsis"
        overflow="hidden"
        bgcolor="background.paper"
      >
        Text Overflow Ellipsis. Text Overflow Ellipsis
      </Box>
    </div>
  );
}
