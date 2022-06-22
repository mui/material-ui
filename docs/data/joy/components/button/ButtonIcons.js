import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ThumbUp from '@mui/icons-material/ThumbUp';

export default function ButtonIcons() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button startIcon={<Add />}>Add to cart</Button>
      <Button
        aria-label="Like"
        variant="soft"
        color="neutral"
        endIcon={<KeyboardArrowDown fontSize="lg" />}
      >
        <ThumbUp />
      </Button>
      <Button variant="outlined" endIcon={<KeyboardArrowRight />} color="success">
        Checkout
      </Button>
    </Box>
  );
}
