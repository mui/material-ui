import * as React from 'react';
import Rating from '@mui/material/Rating';

export default function FocusVisibleRating() {
  return <Rating name="no-value-precise" precision={0.5} value={0.5} />;
}
