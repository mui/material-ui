import * as React from 'react';
import Box from '@mui/material/Box';

export default function TextOverflow() {
  return (
    <div style={{ width: 200, whiteSpace: 'nowrap' }}>
      <Box
        component="div"
        sx={{
          textOverflow: 'clip',
          overflow: 'hidden',
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
        Lorem Ipsum is simply dummy text
      </Box>
      <Box
        component="div"
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
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
        Lorem Ipsum is simply dummy text
      </Box>
    </div>
  );
}
