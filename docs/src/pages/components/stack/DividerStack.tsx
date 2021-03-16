import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';

function Cell({ children }: { children: React.ReactNode }) {
  return <Paper sx={{ padding: 2, color: 'text.secondary' }}>{children}</Paper>;
}

export default function DividerStack() {
  return (
    <Stack direction="row" divider={<Divider orientation="vertical" />} spacing={2}>
      {[0, 1, 2].map((value) => (
        <Cell key={value}>{`Cell ${value + 1}`}</Cell>
      ))}
    </Stack>
  );
}
