import * as React from 'react';
import Box from '@mui/material/Box';

export default function Display() {
  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', p: 1, m: 1, bgcolor: 'background.paper' }}>
        {"I'm a flexbox container that uses flex!"}
      </Box>
      <Box sx={{ display: 'inline-flex', p: 1, m: 1, bgcolor: 'background.paper' }}>
        {"I'm a flexbox container that uses inline-flex!"}
      </Box>
    </div>
  );
}
