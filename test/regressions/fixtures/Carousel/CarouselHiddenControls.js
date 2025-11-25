import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Carousel } from '@mui/carousel';

/**
 * Demonstrates control visibility options:
 * - Carousel with hideNavigation={true}
 * - Carousel with hideIndicators={true}
 * - Carousel with both hidden
 */
export default function CarouselHiddenControls() {
  const slides = [
    { label: 'Slide 1', color: '#1976d2' },
    { label: 'Slide 2', color: '#dc004e' },
    { label: 'Slide 3', color: '#388e3c' },
  ];

  const SlideContent = ({ slide }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        backgroundColor: slide.color,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      }}
    >
      {slide.label}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 350 }}>
      {/* Navigation hidden */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          hideNavigation=true
        </Typography>
        <Carousel hideNavigation>
          {slides.map((slide) => (
            <SlideContent key={`nav-${slide.label}`} slide={slide} />
          ))}
        </Carousel>
      </Box>

      {/* Indicators hidden */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          hideIndicators=true
        </Typography>
        <Carousel hideIndicators>
          {slides.map((slide) => (
            <SlideContent key={`ind-${slide.label}`} slide={slide} />
          ))}
        </Carousel>
      </Box>

      {/* Both hidden */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          hideNavigation + hideIndicators
        </Typography>
        <Carousel hideNavigation hideIndicators>
          {slides.map((slide) => (
            <SlideContent key={`both-${slide.label}`} slide={slide} />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}
