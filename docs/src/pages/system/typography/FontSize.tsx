import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function FontSize() {
  return (
    <Typography component="div">
      <Box sx={{ fontSize: 'default', m: 1 }}>Default</Box>
      <Box sx={{ fontSize: 'h6.fontSize', m: 1 }}>h6.fontSize</Box>
      <Box sx={{ fontSize: 16, m: 1 }}>16px</Box>
    </Typography>
  );
}
