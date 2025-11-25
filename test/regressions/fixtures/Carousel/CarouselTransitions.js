import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Carousel } from '@mui/carousel';

/**
 * Side-by-side comparison of transition types:
 * - One carousel with transition="slide"
 * - One carousel with transition="fade"
 */
export default function CarouselTransitions() {
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
        height: 150,
        backgroundColor: slide.color,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      }}
    >
      {slide.label}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 400 }}>
      {/* Slide transition */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          transition=&quot;slide&quot;
        </Typography>
        <Carousel transition="slide">
          {slides.map((slide) => (
            <SlideContent key={slide.label} slide={slide} />
          ))}
        </Carousel>
      </Box>

      {/* Fade transition */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          transition=&quot;fade&quot;
        </Typography>
        <Carousel transition="fade">
          {slides.map((slide) => (
            <SlideContent key={`fade-${slide.label}`} slide={slide} />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}
