import * as React from 'react';
import Box from '@mui/material/Box';

export default function Width() {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '25%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          my: 1,
          p: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Width 25%
      </Box>
      <Box
        sx={{
          width: '50%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          my: 1,
          p: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Width 50%
      </Box>
      <Box
        sx={{
          width: '75%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          my: 1,
          p: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Width 75%
      </Box>
      <Box
        sx={{
          width: '100%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          my: 1,
          p: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Width 100%
      </Box>
      <Box
        sx={{
          width: 'auto',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          my: 1,
          p: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        Width auto
      </Box>
    </Box>
  );
}
