import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Carousel from '@mui/carousel/Carousel';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

const images: GalleryImage[] = [
  {
    src: 'https://picsum.photos/seed/nature1/800/500',
    alt: 'Mountain landscape at sunset',
    caption: 'Mountain Sunset',
  },
  {
    src: 'https://picsum.photos/seed/nature2/800/500',
    alt: 'Ocean waves on a beach',
    caption: 'Ocean Waves',
  },
  {
    src: 'https://picsum.photos/seed/nature3/800/500',
    alt: 'Forest path in autumn',
    caption: 'Autumn Forest',
  },
  {
    src: 'https://picsum.photos/seed/nature4/800/500',
    alt: 'Desert dunes at dawn',
    caption: 'Desert Dawn',
  },
];

export default function ImageGallery() {
  return (
    <Box sx={{ maxWidth: 800, margin: 'auto' }}>
      <Carousel aria-label="Nature photo gallery">
        {images.map((image) => (
          <Box key={image.src} sx={{ position: 'relative' }}>
            <Box
              component="img"
              src={image.src}
              alt={image.alt}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                p: 2,
              }}
            >
              <Typography variant="h6">{image.caption}</Typography>
              <Typography variant="body2" color="grey.300">
                {image.alt}
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
