import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function Color() {
  return (
    <div>
      <Box sx={{ p: 1, bgcolor: 'background.paper' }}>p: 1</Box>
      <Box sx={{ m: 1, bgcolor: 'background.paper' }}>m: 1</Box>
      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>p: 2</Box>
    </div>
  );
}
