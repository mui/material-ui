import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';

export default function CustomRatio() {
  return (
    <AspectRatio
      variant="outlined"
      ratio="4/3"
      sx={{ width: 300, bgcolor: 'background.level2', borderRadius: 'md' }}
    >
      <Typography level="h2" component="div">
        4/3
      </Typography>
    </AspectRatio>
  );
}
