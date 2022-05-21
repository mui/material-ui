import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function BasicRatio() {
  return (
    <Box sx={{ width: 300 }}>
      <AspectRatio>
        <Typography
          level="h2"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          16 : 9
        </Typography>
      </AspectRatio>
    </Box>
  );
}
