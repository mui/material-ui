import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import ImageIcon from '@mui/icons-material/Image';

export default function PlaceholderAspectRatio() {
  return (
    <Card variant="outlined" sx={{ width: 300 }}>
      <AspectRatio>
        <div>
          <ImageIcon sx={{ fontSize: '3rem', opacity: 0.2 }} />
        </div>
      </AspectRatio>
      <div>
        <Typography level="title-md">Title</Typography>
        <Typography level="body-sm">Description of the card.</Typography>
      </div>
    </Card>
  );
}
