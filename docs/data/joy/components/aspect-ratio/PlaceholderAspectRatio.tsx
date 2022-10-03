import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import ImageIcon from '@mui/icons-material/Image';

export default function BasicRatio() {
  return (
    <Card variant="outlined" sx={{ width: 300 }}>
      <AspectRatio>
        <div>
          <ImageIcon fontSize="xl5" sx={{ color: 'text.tertiary' }} />
        </div>
      </AspectRatio>
      <Typography mt={2}>Title</Typography>
      <Typography level="body2">Description of the card.</Typography>
    </Card>
  );
}
