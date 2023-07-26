import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

export default function AnimationSkeleton() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Card variant="outlined" sx={{ width: 343 }}>
        <CardContent orientation="horizontal">
          <Skeleton animation="wave" variant="circular" width={48} height={48} />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
            <Skeleton
              animation="wave"
              variant="text"
              level="body2"
              sx={{ width: 200 }}
            />
          </div>
        </CardContent>
        <AspectRatio ratio="21/9">
          <Skeleton animation="wave" variant="overlay">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1686548812883-9d3777f4c137?h=400&fit=crop&auto=format&dpr=2"
            />
          </Skeleton>
        </AspectRatio>
        <Typography>
          <Skeleton animation="wave">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and
            publishing industries.
          </Skeleton>
        </Typography>
        <Button>
          Read more
          <Skeleton animation="wave" />
        </Button>
      </Card>
    </Box>
  );
}
