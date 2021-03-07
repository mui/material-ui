import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';
import Box from '@material-ui/core/Box';

export default function IntroStack() {
  return (
    <Box sx={{ typography: 'body2' }}>
      <Stack spacing={2}>
        <Paper sx={{ p: 2, color: 'text.secondary' }}>Cell 1</Paper>
        <Paper sx={{ p: 2, color: 'text.secondary' }}>Cell 2</Paper>
        <Paper sx={{ p: 2, color: 'text.secondary' }}>Cell 3</Paper>
      </Stack>
    </Box>
  );
}
