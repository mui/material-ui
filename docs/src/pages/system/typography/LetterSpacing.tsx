import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LetterSpacing() {
  return (
    <Typography component="div">
      <Box letterSpacing={6} m={1}>
        Letter Spacing 6px.
      </Box>
      <Box letterSpacing={10} m={1}>
        Letter Spacing 10px.
      </Box>
    </Typography>
  );
}

export default LetterSpacing;
