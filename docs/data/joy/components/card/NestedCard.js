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
        <Typography level="body-sm">IN DESIGN</Typography>
        <Typography level="h3">AFSL Web App</Typography>
      </CardContent>
      <Card
        orientation="horizontal"
        size="sm"
        sx={{ bgcolor: 'background.body', borderRadius: 0 }}
      >
        <CardOverflow>
          <AspectRatio
            ratio="1"
            sx={{ minWidth: 64, '& img[data-first-child]': { p: 1 } }}
          >
            <img src="https://uilogos.co/img/logomark/lighting.png" alt="" />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="title-sm">Sub project</Typography>
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
        <Typography
          startDecorator={<BallotIcon color="danger" />}
          sx={{ fontWeight: 'lg', fontSize: 'sm' }}
        >
          13
        </Typography>
        <Divider orientation="vertical" />
        <Typography
          startDecorator={<CommentOutlinedIcon />}
          sx={{ fontWeight: 'lg', fontSize: 'sm' }}
        >
          9
        </Typography>
        <Divider orientation="vertical" />
        <Typography
          startDecorator={<InboxOutlinedIcon />}
          sx={{ fontWeight: 'lg', fontSize: 'sm' }}
        >
          32
        </Typography>
      </CardOverflow>
    </Card>
  );
}
