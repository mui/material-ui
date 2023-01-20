import * as React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

export default function TypographyBasics() {
  return (
    <Card variant="outlined" sx={{ width: 400 }}>
      <Typography level="h1" fontSize="lg" sx={{ mb: 0.5 }}>
        National Parks
      </Typography>
      <Typography level="h3" fontSize="md">
        Yosemite National Park
      </Typography>
      <Typography level="body1">
        Yosemite National Park is a national park spanning 747,956 acres (1,169.4 sq
        mi; 3,025.2 km2) in the western Sierra Nevada of Central California, bounded
        on the southeast by Sierra National Forest and on the northwest by Stanislaus
        National Forest.
      </Typography>
    </Card>
  );
}
