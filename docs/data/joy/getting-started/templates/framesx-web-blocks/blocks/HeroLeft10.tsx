import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from '../components/TwoSidedLayout';

export default function HeroLeft04() {
  return (
    <TwoSidedLayout reversed>
      <Chip size="lg" variant="outlined" color="neutral">
        The power to do more
      </Chip>
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
      <Box
        component="form"
        sx={{
          display: 'flex',
          gap: 1,
          my: 2,
          alignSelf: 'stretch',
          flexBasis: '80%',
        }}
      >
        <Input
          required
          name="email"
          type="email"
          size="lg"
          placeholder="Sign in with email"
          sx={{ flex: 'auto' }}
        />
        <IconButton type="submit" size="lg" variant="solid" color="primary">
          <ArrowForward />
        </IconButton>
      </Box>
      <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        HeroLeft10
      </Typography>
    </TwoSidedLayout>
  );
}
