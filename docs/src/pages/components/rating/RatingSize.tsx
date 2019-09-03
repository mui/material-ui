import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function RatingSize() {
  return (
    <div>
      <div>
        <Rating name="size-small" value={2} size="small" />
      </div>
      <div>
        <Rating name="size-medium" value={2} />
      </div>
      <div>
        <Rating name="size-large" value={2} size="large" />
      </div>
    </div>
  );
}
