import * as React from 'react';
import Skeleton from '@material-ui/core/Skeleton';
import { Box } from '@material-ui/core';

export default function SkeletonColor() {
  return (
    <Box sx={{ bgcolor: '#000', p: 8 }}>
      <Skeleton sx={{ bgcolor: 'grey.900' }} variant="text" />
      <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="circular"
        width={40}
        height={40}
      />
      <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={210}
        height={118}
      />
    </Box>
  );
}
