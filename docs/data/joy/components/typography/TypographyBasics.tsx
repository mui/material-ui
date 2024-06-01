import * as React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

export default function TypographyBasics() {
  return (
    <Card variant="outlined" sx={{ maxWidth: 400 }}>
      <Typography level="h1">National Parks</Typography>
      <Typography level="h2" sx={{ fontSize: 'xl', mb: 0.5 }}>
        Yosemite National Park
      </Typography>
      <Typography>
        Yosemite National Park is a national park spanning 747,956 acres (1,169.4 sq
        mi; 3,025.2 km2) in the western Sierra Nevada of Central California.
      </Typography>
    </Card>
  );
}
