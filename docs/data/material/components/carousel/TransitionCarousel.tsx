import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Carousel from '@mui/carousel/Carousel';

const colors: string[] = ['#1976d2', '#388e3c', '#f57c00', '#7b1fa2'];

interface SlideContentProps {
  index: number;
  transition: string;
}

function SlideContent({ index, transition }: SlideContentProps) {
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
      <Typography variant="h5">
        Slide {index + 1} ({transition})
      </Typography>
    </Box>
  );
}

export default function TransitionCarousel() {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Slide Transition (default)
        </Typography>
        <Carousel transition="slide" aria-label="Slide transition demo">
          {colors.map((_, index) => (
            <SlideContent key={index} index={index} transition="slide" />
          ))}
        </Carousel>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Fade Transition
        </Typography>
        <Carousel transition="fade" aria-label="Fade transition demo">
          {colors.map((_, index) => (
            <SlideContent key={index} index={index} transition="fade" />
          ))}
        </Carousel>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Custom Duration (1000ms)
        </Typography>
        <Carousel
          transition="slide"
          transitionDuration={1000}
          aria-label="Slow transition demo"
        >
          {colors.map((_, index) => (
            <SlideContent key={index} index={index} transition="slow" />
          ))}
        </Carousel>
      </Box>
    </Stack>
  );
}
