import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function CardCovers() {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardCover sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
        <Typography fontSize="60px" fontWeight="lg" color="#fff" ml={2}>
          3
        </Typography>
      </CardCover>
      <CardCover sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
        <Typography fontSize="60px" fontWeight="lg" color="#fff" ml={5}>
          2
        </Typography>
      </CardCover>
      <CardCover sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
        <Typography fontSize="60px" fontWeight="lg" color="#fff" ml={8}>
          1
        </Typography>
      </CardCover>
      <CardContent sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
        <Typography typography="h1" ml={8} color="#fff">
          Content
        </Typography>
      </CardContent>
    </Card>
  );
}
