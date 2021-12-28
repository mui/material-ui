import * as React from 'react';
import Box from '@mui/material/Box';

export default function Height() {
  return (
    <Box sx={{ height: 100, width: '100%' }}>
      <Box
        sx={{
          height: '25%',
          width: 120,
          display: 'inline-block',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          mx: 1,
          p: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Height 25%
      </Box>
      <Box
        sx={{
          height: '50%',
          width: 120,
          display: 'inline-block',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          mx: 1,
          p: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Height 50%
      </Box>
      <Box
        sx={{
          height: '75%',
          width: 120,
          display: 'inline-block',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          mx: 1,
          p: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Height 75%
      </Box>
      <Box
        sx={{
          height: '100%',
          width: 120,
          display: 'inline-block',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          mx: 1,
          p: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Height 100%
      </Box>
    </Box>
  );
}
