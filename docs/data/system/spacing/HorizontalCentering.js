import * as React from 'react';
import Box from '@mui/material/Box';

export default function HorizontalCentering() {
  return (
    <div>
      <Box
        sx={{
          mx: 'auto',
          width: 200,
          p: 1,
          m: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Centered element
      </Box>
    </div>
  );
}
