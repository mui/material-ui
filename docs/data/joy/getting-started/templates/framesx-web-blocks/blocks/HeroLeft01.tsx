import * as React from 'react';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from '../components/TwoSidedLayout';

export default function HeroLeft01() {
  return (
    <TwoSidedLayout>
      <Typography color="primary" sx={{ fontSize: 'lg', fontWeight: 'lg' }}>
        The power to do more
      </Typography>
      <Typography
        level="h1"
        sx={{
          fontWeight: 'xl',
          fontSize: 'clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)',
        }}
      >
        A large headlinerer about our product features & services
      </Typography>
      <Typography
        textColor="text.secondary"
        sx={{ fontSize: 'lg', lineHeight: 'lg' }}
      >
        A descriptive secondary text placeholder. Use it to explain your business
        offer better.
      </Typography>
      <Button size="lg" endDecorator={<ArrowForward fontSize="xl" />}>
        Get Started
      </Button>
      <Typography>
        Already a member? <Link sx={{ fontWeight: 'lg' }}>Sign in</Link>
      </Typography>
      <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        HeroLeft01
      </Typography>
    </TwoSidedLayout>
  );
}
