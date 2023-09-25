import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Sizes() {
  return (
    <Stack spacing={1} width={210}>
      {/* For size="text", adjust the height via font-size */}
      <Skeleton size="text" sx={{ fontSize: '1rem' }} />
      {/* For size="box", adjust height based on bounding box */}
      <Skeleton size="box" height={40} />
    </Stack>
  );
}
