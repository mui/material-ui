import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Star from '@mui/icons-material/Star';

export default function Rating() {
  return (
    <Typography
      level="title-sm"
      startDecorator={
        <React.Fragment>
          <Star sx={{ color: 'warning.400' }} />
          <Star sx={{ color: 'warning.400' }} />
          <Star sx={{ color: 'warning.400' }} />
          <Star sx={{ color: 'warning.400' }} />
          <Star sx={{ color: 'warning.200' }} />
        </React.Fragment>
      }
    >
      4.0
    </Typography>
  );
}
