import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function AlignContent() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          maxWidth: 300,
          height: 200,
        }}
      >
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-end',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          maxWidth: 300,
          height: 200,
        }}
      >
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
      </Box>
    </div>
  );
}
