import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Carousel from '@mui/carousel/Carousel';

const slides = ['First', 'Second', 'Third', 'Fourth'];

export default function ControlledCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleChange = (event, newIndex, reason) => {
    setActiveIndex(newIndex);
    console.log(`Changed to slide ${newIndex + 1} via ${reason}`);
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Current slide: {activeIndex + 1} of {slides.length}
        </Typography>
        <ButtonGroup size="small">
          {slides.map((_, index) => (
            <Button
              key={index}
              variant={activeIndex === index ? 'contained' : 'outlined'}
              onClick={() => setActiveIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <Carousel
        activeIndex={activeIndex}
        onChange={handleChange}
        aria-label="Controlled carousel demo"
      >
        {slides.map((label) => (
          <Box
            key={label}
            sx={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.200',
              borderRadius: 1,
            }}
          >
            <Typography variant="h4">{label} Slide</Typography>
          </Box>
        ))}
      </Carousel>

      <Typography variant="caption" color="text.secondary">
        Use the buttons above or the carousel controls to navigate. Check the console for change events.
      </Typography>
    </Stack>
  );
}
