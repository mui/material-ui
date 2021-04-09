import * as React from 'react';
import Stack from '@material-ui/core/Stack';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function LinearColor() {
  return (
    <Stack sx={{ width: '100%', color: 'success.main' }} spacing={2}>
      <LinearProgress color="secondary" />
      <LinearProgress color="inherit" />
    </Stack>
  );
}
