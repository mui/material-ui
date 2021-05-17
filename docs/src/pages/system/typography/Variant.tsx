import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function Variant() {
  return (
    <div>
      <Box sx={{ typography: 'subtitle2' }}>subtitle2</Box>
      <Box sx={{ typography: 'body1' }}>body1</Box>
      <Box sx={{ typography: 'body2' }}>body2</Box>
    </div>
  );
}
