import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';

export default function MediaRatio() {
  return (
    <Box sx={{ width: 300, borderRadius: 'sm', p: 1 }}>
      <AspectRatio objectFit="contain">
        <img
          src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
          srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
          alt="A beautiful landscape."
        />
      </AspectRatio>
    </Box>
  );
}
