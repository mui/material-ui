import * as React from 'react';
import Box from '@mui/material/Box';

export default function Visibility() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        component="span"
        sx={{
          visibility: 'visible',
          my: 2,
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Visible container
      </Box>
      <Box
        component="span"
        sx={{
          visibility: 'hidden',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
        }}
      >
        Invisible container
      </Box>
    </div>
  );
}
