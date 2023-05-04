/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Star from '@mui/icons-material/Star';
import TwoSidedLayout from '../components/TwoSidedLayout';

export default function HeroLeft06() {
  return (
    <TwoSidedLayout>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        A large headlinerer about our product features & services
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
        A descriptive secondary text placeholder.
        <br /> Use it to explain your business offer better.
      </Typography>
      <Button size="lg">Get Started For Free</Button>
      <Typography
        fontSize="xl"
        fontWeight="md"
        endDecorator={
          <React.Fragment>
            <Star sx={{ color: 'warning.300' }} />
            <Star sx={{ color: 'warning.300' }} />
            <Star sx={{ color: 'warning.300' }} />
            <Star sx={{ color: 'warning.300' }} />
            <Star sx={{ color: 'warning.300' }} />
          </React.Fragment>
        }
        sx={{ mt: 3 }}
      >
        5.0
      </Typography>
      <Typography textColor="text.secondary">
        The resource and tips in Frames X are worth a fortune. <br />
        My team loves the design kits.
      </Typography>
      <Typography
        startDecorator={<Avatar size="lg" variant="outlined" />}
        sx={{ '--Typography-gap': '12px' }}
      >
        <b>John Seed</b>, Apple Inc.
      </Typography>
    </TwoSidedLayout>
  );
}
