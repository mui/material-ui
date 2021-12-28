import * as React from 'react';
import Box from '@mui/material/Box';

export default function Inline() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        component="div"
        sx={{
          display: 'inline',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        }}
      >
        inline
      </Box>
      <Box
        component="div"
        sx={{
          display: 'inline',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        }}
      >
        inline
      </Box>
    </div>
  );
}
