/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from '../components/TwoSidedLayout';

export default function HeroLeft02() {
  return (
    <TwoSidedLayout>
      <Typography color="primary" fontSize="lg" fontWeight="lg">
        The power to do more
      </Typography>
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
      <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
        <Button size="lg" variant="soft" color="neutral">
          Learn More
        </Button>
        <Button size="lg" endDecorator={<ArrowForward />}>
          Get Started
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          textAlign: 'left',
          '& > *': {
            flexShrink: 0,
          },
        }}
      >
        <AvatarGroup size="lg">
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <Typography textColor="text.secondary">
          Join a community of over <b>10K</b> <br />
          designers and developers.
        </Typography>
      </Box>
    </TwoSidedLayout>
  );
}
