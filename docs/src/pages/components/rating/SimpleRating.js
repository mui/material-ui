import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function SimpleRating() {
  const [value, setValue] = React.useState(2);

  return (
    <div>
      <Typography gutterBottom>Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Box mt={3} />
      <Typography gutterBottom>Read only</Typography>
      <Rating value={value} readOnly />
      <Box mt={3} />
      <Typography gutterBottom>Disabled</Typography>
      <Rating value={value} disabled />
      <Box mt={3} />
      <Typography gutterBottom>Pristine</Typography>
      <Rating name="pristine" value={null} />
    </div>
  );
}
