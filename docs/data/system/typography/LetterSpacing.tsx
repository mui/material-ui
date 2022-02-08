import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function LetterSpacing() {
  return (
    <Typography component="div">
      <Box sx={{ letterSpacing: 6, m: 1 }}>Letter Spacing 6px.</Box>
      <Box sx={{ letterSpacing: 10, m: 1 }}>Letter Spacing 10px.</Box>
    </Typography>
  );
}
