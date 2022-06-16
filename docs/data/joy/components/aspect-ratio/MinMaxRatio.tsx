import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';

export default function MinMaxRatio() {
  return (
    <Box sx={{ width: 300, resize: 'horizontal', overflow: 'auto', p: 1 }}>
      <AspectRatio minHeight={120} maxHeight={200}>
        <img
          src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
          srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
          alt=""
        />
      </AspectRatio>
    </Box>
  );
}
