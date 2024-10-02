/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from '../components/TwoSidedLayout';

export default function HeroLeft05() {
  return (
    <TwoSidedLayout>
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
      <Input
        size="lg"
        placeholder="Sign in with email"
        sx={{ alignSelf: 'stretch', mt: 2 }}
      />
      <Button
        size="lg"
        endDecorator={<ArrowForward />}
        sx={{ alignSelf: 'stretch' }}
      >
        Get Started
      </Button>
      <Typography textColor="text.secondary">
        By continuing you agree to our{' '}
        <Link color="neutral">
          <b>Privacy Policy</b>
        </Link>
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
        HeroLeft05
      </Typography>
    </TwoSidedLayout>
  );
}
