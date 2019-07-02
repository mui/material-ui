import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function HalfRating() {
  return (
    <div>
      <Typography gutterBottom>value=2.5</Typography>
      <Rating name="half-rating" value={2.5} />
      <Box mt={3} />
      <Typography gutterBottom>precision=0.5</Typography>
      <Rating name="half-rating-precision" value={2.5} precision={0.5} />
    </div>
  );
}
