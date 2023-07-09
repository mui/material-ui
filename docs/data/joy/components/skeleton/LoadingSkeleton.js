import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

export default function LoadingSkeleton() {
  const [loading, setLoading] = React.useState(true);
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Card variant="outlined" sx={{ width: 343 }}>
        <AspectRatio ratio="21/9">
          <Skeleton loading={loading} animation="wave" variant="overlay">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1686548812883-9d3777f4c137"
            />
          </Skeleton>
        </AspectRatio>
        <Typography>
          <Skeleton loading={loading} animation="wave" variant="inline">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and
            publishing industries.
          </Skeleton>
        </Typography>
        <Button onClick={() => setLoading(!loading)}>
          {loading ? 'Stop' : 'Start'} Loading
        </Button>
      </Card>
    </Box>
  );
}
