import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BallotIcon from '@mui/icons-material/Ballot';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { AspectRatio } from '@mui/joy';

export default function NestedCard() {
  return (
    <Card sx={{ borderRadius: 0, width: 300, maxWidth: '100%' }}>
      <CardContent>
        <Typography level="body-xs">IN DESIGN</Typography>
        <Typography level="title-lg">AFSL Web App</Typography>
      </CardContent>
      <Card
        orientation="horizontal"
        size="sm"
        sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1 }}
      >
        <CardOverflow>
          <AspectRatio
            ratio="1"
            sx={{ minWidth: 70, '& img[data-first-child]': { p: 1.5 } }}
          >
            <img
              src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=70"
              srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=70&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="title-md">Sub project</Typography>
          <Typography level="body-sm">Next review in 17 days</Typography>
        </CardContent>
      </Card>
      <CardOverflow
        variant="soft"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          justifyContent: 'space-around',
          py: 1,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography startDecorator={<BallotIcon color="danger" />} level="title-sm">
          13
        </Typography>
        <Divider orientation="vertical" />
        <Typography startDecorator={<CommentOutlinedIcon />} level="title-sm">
          9
        </Typography>
        <Divider orientation="vertical" />
        <Typography startDecorator={<InboxOutlinedIcon />} level="title-sm">
          32
        </Typography>
      </CardOverflow>
    </Card>
  );
}
