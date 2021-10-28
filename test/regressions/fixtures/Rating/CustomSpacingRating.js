import * as React from 'react';
import Rating from '@mui/material/Rating';

export default function FocusVisibleRating() {
  return (
    <Rating
      name="no-value"
      value={null}
      sx={{
        '.MuiRating-decimal': { marginLeft: 1, marginRight: 1 },
      }}
    />
  );
}
