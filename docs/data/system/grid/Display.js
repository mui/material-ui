import * as React from 'react';
import Box from '@mui/material/Box';

export default function Display() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          p: 1,
          bgcolor: 'primary.main',
          borderRadius: 1,
          color: 'white',
        }}
      >
        {"I'm a grid container!"}
      </Box>
    </div>
  );
}
