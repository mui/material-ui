import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

export default function BasicRatio() {
  return (
    <Sheet
      variant="outlined"
      sx={{ width: 300, borderRadius: 'md', overflow: 'auto' }}
    >
      <AspectRatio>
        <Typography level="h2" component="div">
          16 : 9
        </Typography>
      </AspectRatio>
    </Sheet>
  );
}
