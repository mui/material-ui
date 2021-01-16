import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function LetterSpacing() {
  return (
    <Typography component="div">
      <Box sx={{ letterSpacing: 6, m: 1 }}>Letter Spacing 6px.</Box>
      <Box sx={{ letterSpacing: 10, m: 1 }}>Letter Spacing 10px.</Box>
    </Typography>
  );
}
