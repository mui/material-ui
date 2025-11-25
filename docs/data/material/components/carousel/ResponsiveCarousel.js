import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Carousel from '@mui/carousel/Carousel';

const items = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  color: `hsl(${(i * 45) % 360}, 70%, 50%)`,
}));

export default function ResponsiveCarousel() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitle2" gutterBottom>
        Responsive: 1 slide on mobile, 2 on tablet, 3 on desktop, 4 on large screens
      </Typography>
      <Carousel
        slidesPerView={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        spacing={16}
        aria-label="Responsive items carousel"
      >
        {items.map((item) => (
          <Card key={item.id} sx={{ bgcolor: item.color, color: 'white' }}>
            <CardContent sx={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">{item.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
}
