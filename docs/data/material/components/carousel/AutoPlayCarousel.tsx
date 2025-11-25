import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Carousel from '@mui/carousel/Carousel';

interface Slide {
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    title: 'Welcome',
    description: 'Discover amazing features with auto-play.',
  },
  {
    title: 'Explore',
    description: 'Navigate through content automatically.',
  },
  {
    title: 'Engage',
    description: 'Pause on hover for detailed viewing.',
  },
];

export default function AutoPlayCarousel() {
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Carousel
        autoPlay
        autoPlayInterval={3000}
        enableLoop
        aria-label="Feature showcase"
      >
        {slides.map((slide) => (
          <Box
            key={slide.title}
            sx={{
              height: 250,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 1,
              p: 4,
            }}
          >
            <Typography variant="h4" component="h3" gutterBottom>
              {slide.title}
            </Typography>
            <Typography variant="body1" textAlign="center">
              {slide.description}
            </Typography>
          </Box>
        ))}
      </Carousel>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Hover over the carousel to pause auto-play
      </Typography>
    </Box>
  );
}
