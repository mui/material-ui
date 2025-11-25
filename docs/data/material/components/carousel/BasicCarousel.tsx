import * as React from 'react';
import Box from '@mui/material/Box';
import Carousel from '@mui/carousel/Carousel';

interface Slide {
  label: string;
  imgPath: string;
}

const slides: Slide[] = [
  {
    label: 'San Francisco',
    imgPath: 'https://picsum.photos/seed/sf/800/400',
  },
  {
    label: 'Los Angeles',
    imgPath: 'https://picsum.photos/seed/la/800/400',
  },
  {
    label: 'Seattle',
    imgPath: 'https://picsum.photos/seed/sea/800/400',
  },
  {
    label: 'Portland',
    imgPath: 'https://picsum.photos/seed/pdx/800/400',
  },
];

export default function BasicCarousel() {
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Carousel aria-label="City photos">
        {slides.map((slide) => (
          <Box
            key={slide.label}
            component="img"
            sx={{
              width: '100%',
              height: 300,
              objectFit: 'cover',
              borderRadius: 1,
            }}
            src={slide.imgPath}
            alt={slide.label}
          />
        ))}
      </Carousel>
    </Box>
  );
}
