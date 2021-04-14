import * as React from 'react';
import Skeleton from '@material-ui/core/Skeleton';
import Box from '@material-ui/core/Box';

export default function SkeletonColor() {
  return (
    <Box
      sx={{
        bgcolor: '#121212',
        p: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={210}
        height={118}
      />
    </Box>
  );
}
