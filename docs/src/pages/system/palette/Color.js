import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Color() {
  return (
    <Typography component="div" variant="body1">
      <Box color="primary.main">primary.main</Box>
      <Box color="secondary.main">secondary.main</Box>
      <Box color="error.main">error.main</Box>
      <Box color="text.primary">text.primary</Box>
      <Box color="text.secondary">text.secondary</Box>
      <Box color="text.disabled">text.disabled</Box>
      <Box color="text.hint">text.hint</Box>
    </Typography>
  );
}

export default Color;
