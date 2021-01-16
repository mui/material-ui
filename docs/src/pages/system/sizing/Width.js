import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function Width() {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '25%', bgcolor: 'grey.300', p: 1, my: 0.5 }}>Width 25%</Box>
      <Box sx={{ width: '50%', bgcolor: 'grey.300', p: 1, my: 0.5 }}>Width 50%</Box>
      <Box sx={{ width: '75%', bgcolor: 'grey.300', p: 1, my: 0.5 }}>Width 75%</Box>
      <Box sx={{ width: '100%', bgcolor: 'grey.300', p: 1, my: 0.5 }}>
        Width 100%
      </Box>
      <Box sx={{ width: 'auto', bgcolor: 'grey.300', p: 1, my: 0.5 }}>
        Width auto
      </Box>
    </Box>
  );
}
