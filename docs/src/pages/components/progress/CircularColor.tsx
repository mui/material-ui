import * as React from 'react';
import Stack from '@material-ui/core/Stack';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CircularColor() {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="primary" />
      <CircularProgress color="secondary" />
      <CircularProgress color="error" />
      <CircularProgress color="info" />
      <CircularProgress color="success" />
      <CircularProgress color="warning" />
      <CircularProgress color="inherit" />
    </Stack>
  );
}
