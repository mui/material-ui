import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ThumbUp from '@mui/icons-material/ThumbUp';

export default function ButtonIcons() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button startDecorator={<Add />}>Add to cart</Button>
      <Button aria-label="Like" variant="outlined" color="neutral">
        <ThumbUp />
      </Button>
      <Button variant="soft" endDecorator={<KeyboardArrowRight />} color="success">
        Checkout
      </Button>
    </Box>
  );
}
