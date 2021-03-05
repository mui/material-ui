import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';

export default function ResponsiveStack() {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row', lg: 'row' }}
      spacing={{ xs: 1, md: 2, lg: 4 }}
    >
      {[0, 1, 2].map((value) => (
        <Paper
          key={value}
          sx={(theme) => ({
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
          })}
        >
          {`Cell ${value + 1}`}
        </Paper>
      ))}
    </Stack>
  );
}
