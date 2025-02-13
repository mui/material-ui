import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Skeleton from '@mui/joy/Skeleton';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

export default function BasicCardSkeleton() {
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <div>
        <Typography level="h2" sx={{ fontSize: 'md', mb: 0.5 }}>
          <Skeleton>Yosemite National Park</Skeleton>
        </Typography>
        <Typography level="body-sm">
          <Skeleton>April 24 to May 02, 2021</Skeleton>
        </Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
          <Skeleton />
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <Skeleton>
          <img
            src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </Skeleton>
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">
            <Skeleton>Total price:</Skeleton>
          </Typography>
          <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>
            <Skeleton>$2,900</Skeleton>
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Explore
          <Skeleton />
        </Button>
      </CardContent>
    </Card>
  );
}
