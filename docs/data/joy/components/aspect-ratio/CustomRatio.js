import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function CustomRatio() {
  return (
    <Box sx={{ width: 300 }}>
      <AspectRatio ratio="4/3">
        <Typography
          level="h2"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          4 : 3
        </Typography>
      </AspectRatio>
    </Box>
  );
}
