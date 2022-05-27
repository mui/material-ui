import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function CardCovers() {
  return (
    <Card sx={{ minWidth: 320 }}>
      <CardCover sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
        <Typography fontSize="50px" fontWeight="lg" color="#fff" ml={2}>
          3
        </Typography>
      </CardCover>
      <CardCover sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
        <Typography fontSize="50px" fontWeight="lg" color="#fff" ml={6}>
          2
        </Typography>
      </CardCover>
      <CardCover sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
        <Typography fontSize="50px" fontWeight="lg" color="#fff" ml={10}>
          1
        </Typography>
      </CardCover>
      <CardContent sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
        <Typography level="h2" ml={12} mr={2} color="#fff">
          Content
        </Typography>
      </CardContent>
    </Card>
  );
}
