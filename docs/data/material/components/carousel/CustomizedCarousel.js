import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Carousel from '@mui/carousel/Carousel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slides = [
  { id: 1, label: 'Custom Slide 1', color: '#e91e63' },
  { id: 2, label: 'Custom Slide 2', color: '#9c27b0' },
  { id: 3, label: 'Custom Slide 3', color: '#673ab7' },
];

export default function CustomizedCarousel() {
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Carousel
        prevIcon={<ArrowBackIosNewIcon fontSize="small" />}
        nextIcon={<ArrowForwardIosIcon fontSize="small" />}
        aria-label="Customized carousel"
        sx={{
          '& .MuiCarousel-root': {
            borderRadius: 2,
            overflow: 'hidden',
          },
          '& .MuiCarouselNavigation-button': {
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              bgcolor: 'white',
            },
          },
          '& .MuiCarouselIndicators-indicator': {
            width: 12,
            height: 12,
            mx: 0.5,
          },
          '& .MuiCarouselIndicators-indicatorActive': {
            width: 24,
            borderRadius: 6,
          },
        }}
      >
        {slides.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              height: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: slide.color,
              color: 'white',
            }}
          >
            <Typography variant="h4">{slide.label}</Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
