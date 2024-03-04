import * as React from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';

export default function GeometrySkeleton() {
  return (
    <div>
      <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
        <Skeleton variant="circular" width={48} height={48} />
        <div>
          <Skeleton variant="rectangular" width={200} height="1em" sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" width={140} height="1em" />
        </div>
      </Box>
    </div>
  );
}
