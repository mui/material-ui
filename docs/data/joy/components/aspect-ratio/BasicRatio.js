import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';

export default function BasicRatio() {
  return (
    <AspectRatio sx={{ width: 300 }}>
      <Typography level="h2" component="div">
        16/9
      </Typography>
    </AspectRatio>
  );
}
