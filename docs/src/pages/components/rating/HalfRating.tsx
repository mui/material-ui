import * as React from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/core/Rating';

export default function HalfRating() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // TODO Replace with Stack
        '& > :not(style) + :not(style)': { mt: 1 },
      }}
    >
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
    </Box>
  );
}
