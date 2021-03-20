import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';

function Cell({ children }: { children: React.ReactNode }) {
  return (
    <Paper sx={{ padding: 2, color: 'text.secondary', typography: 'body2' }}>
      {children}
    </Paper>
  );
}

export default function DividerStack() {
  return (
    <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" />}
        spacing={2}
      >
        <Cell>Cell 1</Cell>
        <Cell>Cell 2</Cell>
        <Cell>Cell 3</Cell>
      </Stack>
    </div>
  );
}
