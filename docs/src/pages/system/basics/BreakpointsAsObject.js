import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function BreakpointsAsObject() {
  return (
    <div>
      <Box sx={{ width: { sx: 100, sm: 200, md: 300, lg: 400, xl: 500 } }}>
        This box has a responsive width.
      </Box>
    </div>
  );
}
