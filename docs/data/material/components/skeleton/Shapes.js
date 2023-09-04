import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Shapes() {
  return (
    <Stack spacing={1}>
      <Skeleton shape="circular" size="box" width={40} height={40} />
      <Skeleton shape="rectangular" width={210} height={60} />
      <Skeleton shape="rounded" width={210} height={60} />
    </Stack>
  );
}
