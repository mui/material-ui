import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Carousel from '@mui/carousel/Carousel';

const colors = ['#2196f3', '#4caf50', '#ff9800', '#e91e63'];

function Slide({ index }) {
  return (
    <Box
      sx={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: colors[index],
        color: 'white',
        borderRadius: 1,
      }}
    >
      <Typography variant="h5">Slide {index + 1}</Typography>
    </Box>
  );
}

export default function HiddenControls() {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Hidden Navigation (swipe or use keyboard)
        </Typography>
        <Carousel hideNavigation aria-label="Carousel without navigation arrows">
          {colors.map((_, index) => (
            <Slide key={index} index={index} />
          ))}
        </Carousel>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Hidden Indicators
        </Typography>
        <Carousel hideIndicators aria-label="Carousel without indicators">
          {colors.map((_, index) => (
            <Slide key={index} index={index} />
          ))}
        </Carousel>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Minimal (both hidden - touch/keyboard only)
        </Typography>
        <Carousel
          hideNavigation
          hideIndicators
          aria-label="Minimal carousel for touch devices"
        >
          {colors.map((_, index) => (
            <Slide key={index} index={index} />
          ))}
        </Carousel>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Use arrow keys or swipe to navigate
        </Typography>
      </Box>
    </Stack>
  );
}
