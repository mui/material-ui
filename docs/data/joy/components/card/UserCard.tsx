import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function BioCard() {
  return (
    <Card
      orientation="horizontal"
      stackWidth={500}
      sx={{
        width: '100%',
        // make the card resizable for demo
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <AspectRatio ratio="1" maxHeight={182} sx={{ minWidth: 182, flex: 1 }}>
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography fontSize="xl" fontWeight="lg">
          Alex Morrison
        </Typography>
        <Typography level="body2" fontWeight="lg" textColor="text.tertiary">
          Senior Journalist
        </Typography>
        <Sheet
          sx={{
            bgcolor: 'background.level1',
            borderRadius: 'sm',
            p: 1.5,
            my: 1.5,
            display: 'flex',
            gap: 2,
            '& > div': { flex: 1 },
          }}
        >
          <div>
            <Typography level="body3" fontWeight="lg">
              Articles
            </Typography>
            <Typography fontWeight="lg">34</Typography>
          </div>
          <div>
            <Typography level="body3" fontWeight="lg">
              Followers
            </Typography>
            <Typography fontWeight="lg">980</Typography>
          </div>
          <div>
            <Typography level="body3" fontWeight="lg">
              Rating
            </Typography>
            <Typography fontWeight="lg">8.9</Typography>
          </div>
        </Sheet>
        <CardActions buttonFlex="1">
          <Button variant="outlined" color="neutral">
            Chat
          </Button>
          <Button variant="solid" color="primary">
            Follow
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
