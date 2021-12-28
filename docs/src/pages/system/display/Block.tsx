import * as React from 'react';
import Box from '@mui/material/Box';

export default function Block() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        component="span"
        sx={{
          display: 'block',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        }}
      >
        block
      </Box>
      <Box
        component="span"
        sx={{
          display: 'block',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        }}
      >
        block
      </Box>
    </div>
  );
}
