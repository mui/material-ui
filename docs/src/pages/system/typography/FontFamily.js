import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
