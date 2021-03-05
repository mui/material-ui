import * as React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/core/Skeleton';

export default function Animations() {
  return (
    <Box sx={{ width: 300 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
