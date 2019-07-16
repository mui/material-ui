import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function RatingSize() {
  return (
    <div>
      <Rating name="size-small" value={2} size="small" />
      <Rating name="size-medium" value={2} />
      <Rating name="size-large" value={2} size="large" />
    </div>
  );
}
