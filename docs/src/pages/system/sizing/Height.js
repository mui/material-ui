import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function Height() {
  return (
    <Box sx={{ height: 100, width: '100%' }}>
      <Box
        sx={{
          height: '25%',
          bgcolor: 'grey.300',
          mx: 0.5,
          width: 120,
          display: 'inline-block',
        }}
      >
        Height 25%
      </Box>
      <Box
        sx={{
          height: '50%',
          bgcolor: 'grey.300',
          mx: 0.5,
          width: 120,
          display: 'inline-block',
        }}
      >
        Height 50%
      </Box>
      <Box
        sx={{
          height: '75%',
          bgcolor: 'grey.300',
          mx: 0.5,
          width: 120,
          display: 'inline-block',
        }}
      >
        Height 75%
      </Box>
      <Box
        sx={{
          height: '100%',
          bgcolor: 'grey.300',
          mx: 0.5,
          width: 120,
          display: 'inline-block',
        }}
      >
        Height 100%
      </Box>
    </Box>
  );
}
