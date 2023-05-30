import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Star from '@mui/icons-material/Star';

type RentalCardProps = {
  value: number;
};

export default function Rating({ value }: RentalCardProps) {
  return (
    <Typography
      fontWeight="md"
      startDecorator={
        <React.Fragment>
          <Star sx={{ color: 'warning.300' }} />
          <Star sx={{ color: 'warning.300' }} />
          <Star sx={{ color: 'warning.300' }} />
          <Star sx={{ color: 'warning.300' }} />
          <Star sx={{ color: 'warning.300' }} />
        </React.Fragment>
      }
    >
      4.9
    </Typography>
  );
}
