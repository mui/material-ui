import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Carousel from '@mui/carousel/Carousel';

const colors = ['#673ab7', '#009688', '#ff5722'];

function Slide({ index }) {
  return (
    <Box
      sx={{
        height: 180,
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

export default function DisabledFeatures() {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Gestures Disabled
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Touch and swipe navigation is disabled. Use buttons or keyboard instead.
        </Typography>
        <Carousel disableGestures aria-label="Carousel without gesture support">
          {colors.map((_, index) => (
            <Slide key={index} index={index} />
          ))}
        </Carousel>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Keyboard Disabled
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Arrow key navigation is disabled. Use buttons or touch gestures instead.
        </Typography>
        <Carousel disableKeyboard aria-label="Carousel without keyboard navigation">
          {colors.map((_, index) => (
            <Slide key={index} index={index} />
          ))}
        </Carousel>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Auto-play Disabled
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Slides do not advance automatically.
        </Typography>
        <Carousel autoPlay={false} aria-label="Carousel without auto-play">
          {colors.map((_, index) => (
            <Slide key={index} index={index} />
          ))}
        </Carousel>
      </Box>
    </Stack>
  );
}
