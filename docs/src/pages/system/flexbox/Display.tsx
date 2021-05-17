import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function Display() {
  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper' }}>
        {"I'm a flexbox container!"}
      </Box>
    </div>
  );
}
