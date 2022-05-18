import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function FontFamily() {
  return (
    <Typography component="div">
      <Box sx={{ fontFamily: 'default', m: 1 }}>Default</Box>
      <Box sx={{ fontFamily: 'Monospace', fontSize: 'h6.fontSize', m: 1 }}>
        Monospace
      </Box>
    </Typography>
  );
}
