import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function AlignItems() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          height: 100,
        }}
      >
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          height: 100,
        }}
      >
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          height: 100,
        }}
      >
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
      </Box>
    </div>
  );
}
