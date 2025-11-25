import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Carousel } from '@mui/carousel';

/**
 * Edge case fixture with single slide:
 * - Shows that indicators display one dot
 * - Navigation buttons should be disabled (not looping)
 */
export default function CarouselSingleSlide() {
  return (
    <Box sx={{ width: 350 }}>
      <Typography variant="subtitle2" gutterBottom>
        Single slide (no loop)
      </Typography>
      <Carousel enableLoop={false}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 180,
            backgroundColor: '#1976d2',
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Only Slide
        </Box>
      </Carousel>
    </Box>
  );
}
