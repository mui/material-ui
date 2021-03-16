import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';
import Box from '@material-ui/core/Box';

function Cell({ children }: { children: React.ReactNode }) {
  return <Paper sx={{ p: 2, color: 'text.secondary' }}>{children}</Paper>;
}

export default function IntroStack() {
  return (
    <Box sx={{ typography: 'body2' }}>
      <Stack spacing={2}>
        <Cell>Cell 1</Cell>
        <Cell>Cell 2</Cell>
        <Cell>Cell 3</Cell>
      </Stack>
    </Box>
  );
}
