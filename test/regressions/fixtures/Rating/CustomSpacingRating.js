import * as React from 'react';
import Rating from '@mui/material/Rating';

export default function CustomSpacingRating() {
  return (
    <Rating
      name="half-rating"
      defaultValue={1}
      precision={0.5}
      sx={{
        '.MuiRating-decimal': { marginLeft: 1, marginRight: 1 },
      }}
    />
  );
}
