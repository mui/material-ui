import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';

function Cell({ children }: { children: React.ReactNode }) {
  return <Paper sx={{ padding: 2, color: 'text.secondary' }}>{children}</Paper>;
}

export default function ResponsiveStack() {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row', lg: 'row' }}
      spacing={{ xs: 1, md: 2, lg: 4 }}
    >
      {[0, 1, 2].map((value) => (
        <Cell key={value}>{`Cell ${value + 1}`}</Cell>
      ))}
    </Stack>
  );
}
