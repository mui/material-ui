import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

export default function BasicSkeleton() {
  return (
    <Card variant="outlined" sx={{ width: 343, display: 'flex', gap: 2 }}>
      <AspectRatio ratio="21/9">
        <Skeleton variant="overlay">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1686548812883-9d3777f4c137?h=400&fit=crop&auto=format&dpr=2"
          />
        </Skeleton>
      </AspectRatio>
      <Typography>
        <Skeleton>
          Lorem ipsum is placeholder text commonly used in the graphic, print, and
          publishing industries.
        </Skeleton>
      </Typography>
    </Card>
  );
}
