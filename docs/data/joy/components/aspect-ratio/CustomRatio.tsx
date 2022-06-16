import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

export default function CustomRatio() {
  return (
    <Sheet
      variant="outlined"
      sx={{ width: 300, borderRadius: 'md', overflow: 'auto' }}
    >
      <AspectRatio ratio="4/3">
        <Typography level="h2" component="div">
          4 : 3
        </Typography>
      </AspectRatio>
    </Sheet>
  );
}
