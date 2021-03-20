import * as React from 'react';
import Skeleton from '@material-ui/core/Skeleton';
import Stack from '@material-ui/core/Stack';

export default function Variants() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={118} />
    </Stack>
  );
}
