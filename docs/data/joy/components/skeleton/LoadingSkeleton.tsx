import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

export default function LoadingSkeleton() {
  const [loading, setLoading] = React.useState(true);
  return (
    <Stack spacing={2} useFlexGap>
      <Card variant="outlined" sx={{ width: 343 }}>
        <AspectRatio ratio="21/9">
          <Skeleton loading={loading} variant="overlay">
            <img
              alt=""
              src={
                loading
                  ? 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
                  : 'https://images.unsplash.com/photo-1686548812883-9d3777f4c137?h=400&fit=crop&auto=format&dpr=2'
              }
            />
          </Skeleton>
        </AspectRatio>
        <Typography>
          <Skeleton loading={loading}>
            {loading
              ? 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries.'
              : 'An aerial view of a road in the middle of a forest. This image was uploaded by Dian Yu on Unsplash.'}
          </Skeleton>
        </Typography>
        <Button onClick={() => setLoading(!loading)}>
          {loading ? 'Stop' : 'Start'} loading
        </Button>
      </Card>
    </Stack>
  );
}
