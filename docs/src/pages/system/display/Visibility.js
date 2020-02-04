import React from 'react';
import Box from '@material-ui/core/Box';

export default function Visibility() {
  return (
    <div style={{ width: '100%' }}>
      <Box component="span" visibility="visible" p={1} m={1} bgcolor="background.paper">
        Visibility Visible
      </Box>
      <Box component="span" visibility="hidden" p={1} m={1} bgcolor="background.paper">
        Visibility Hidden
      </Box>
    </div>
  );
}
