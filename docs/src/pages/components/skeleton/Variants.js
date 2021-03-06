import * as React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/core/Skeleton';

export default function Variants() {
  return (
    <Box
      sx={{
        // TODO Replace with Stack
        '& > :not(style) + :not(style)': { mt: 1 },
      }}
    >
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={118} />
    </Box>
  );
}
