import * as React from 'react';
import Box from '@mui/material/Box';
import { Carousel } from '@mui/carousel';

/**
 * Basic carousel fixture with text/colored box slides.
 * Shows default state with navigation and indicators visible.
 */
export default function SimpleCarousel() {
  const slides = [
    { label: 'Slide 1', color: '#1976d2' },
    { label: 'Slide 2', color: '#dc004e' },
    { label: 'Slide 3', color: '#388e3c' },
    { label: 'Slide 4', color: '#f57c00' },
  ];

  return (
    <Box sx={{ width: 400, height: 300 }}>
      <Carousel>
        {slides.map((slide) => (
          <Box
            key={slide.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 200,
              backgroundColor: slide.color,
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            {slide.label}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
