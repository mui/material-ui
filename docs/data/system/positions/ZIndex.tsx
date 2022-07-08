import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ZIndex() {
  return (
    <Typography
      component="div"
      variant="body1"
      style={{
        height: 100,
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.600',
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.50'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          p: 2,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          position: 'absolute',
          top: 40,
          left: '40%',
          zIndex: 'tooltip',
        }}
      >
        z-index tooltip
      </Box>
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          p: 2,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          position: 'absolute',
          top: 0,
          left: '43%',
          zIndex: 'modal',
        }}
      >
        z-index modal
      </Box>
    </Typography>
  );
}
