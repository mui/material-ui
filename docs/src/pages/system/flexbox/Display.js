import * as React from 'react';
import Box from '@mui/material/Box';

export default function Display() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          m: 1,
          p: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        }}
      >
        {"I'm a flexbox container that uses flex!"}
      </Box>
      <Box
        sx={{
          display: 'inline-flex',
          m: 1,
          p: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        }}
      >
        {"I'm a flexbox container that uses inline-flex!"}
      </Box>
    </div>
  );
}
