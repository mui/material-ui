import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function FlexGrow() {
  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper' }}>
        <Box sx={{ p: 1, flexGrow: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 2</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 3</Box>
      </Box>
    </div>
  );
}
