/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Star from '@mui/icons-material/Star';
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
        <Input size="lg" placeholder="Sign in with email" />
        <Button size="lg" endDecorator={<ArrowForward />}>
          Get Started
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          columnGap: 4.5,
          rowGap: 1.5,
          textAlign: 'left',
          '& > *': {
            flexShrink: 0,
          },
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Typography fontSize="xl4" fontWeight="lg">
            4.9
          </Typography>
          <Star fontSize="xl4" sx={{ color: 'warning.300' }} />
          <Typography>
            Over <b>5k</b> positive <br /> customer reviews.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Typography fontSize="xl4" fontWeight="lg">
            2M
          </Typography>
          <Typography>
            Global <br /> Transactions.
          </Typography>
        </Box>
      </Box>
    </TwoSidedLayout>
  );
}
