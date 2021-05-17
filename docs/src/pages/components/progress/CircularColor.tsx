import * as React from 'react';
import Stack from '@material-ui/core/Stack';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CircularColor() {
  return (
    <Stack sx={{ color: 'warning.main' }} spacing={2} direction="row">
      <CircularProgress color="secondary" />
      <CircularProgress color="inherit" />
    </Stack>
  );
}
