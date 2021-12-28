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
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
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
