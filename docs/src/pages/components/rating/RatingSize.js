import React from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

export default function RatingSize() {
  return (
    <Box display="flex" flexDirection="column">
      <Rating name="size-small" value={2} size="small" />
      <Rating name="size-medium" value={2} />
      <Rating name="size-large" value={2} size="large" />
    </Box>
  );
}
