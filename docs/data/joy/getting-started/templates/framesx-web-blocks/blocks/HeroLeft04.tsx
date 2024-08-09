import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import TwoSidedLayout from '../components/TwoSidedLayout';

export default function HeroLeft04() {
  return (
    <TwoSidedLayout>
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
        sx={{
          display: 'flex',
          gap: 2,
          my: 2,
          flexWrap: 'wrap',
          '& > *': { flex: 'auto' },
        }}
      >
        <Button size="lg" endDecorator={<ArrowForward fontSize="xl" />}>
          Get Started
        </Button>
        <Button
          size="lg"
          variant="outlined"
          color="neutral"
          startDecorator={<PlayCircleOutlineIcon />}
        >
          Watch Video
        </Button>
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
        HeroLeft04
      </Typography>
    </TwoSidedLayout>
  );
}
