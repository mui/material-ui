
import React from 'react';
import Rating from '@material-ui/lab/Rating';
export default function HalfRating() {
  //return <Rating name="half-rating" defaultValue={2.5} precision={0.5} />;
  return (
    <div>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      <Rating name="half-rating-read-only" defaultValue={2.5} precision={0.5} readOnly />
    </div>
  );
}
