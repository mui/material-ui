import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function LineHeight() {
  return (
    <Typography component="div">
      <Box sx={{ lineHeight: 'normal', m: 1 }}>Normal height.</Box>
      <Box sx={{ lineHeight: 2, m: 1 }}>line-height: 2</Box>
    </Typography>
  );
}
