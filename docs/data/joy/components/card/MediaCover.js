import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function BasicCard() {
  return (
    <Box
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
    >
      <Card component="li" sx={{ minWidth: 200, flexGrow: 1 }}>
        <CardCover>
          <img
            src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80"
            alt=""
          />
        </CardCover>
        <CardContent sx={{ justifyContent: 'center', gap: 1 }}>
          <Typography
            typography="h2"
            color="#fff"
            mt={{ xs: 12, sm: 16 }}
            sx={{ textShadow: '0 0 8px rgba(255,255,255,1)' }}
          >
            IMAGE
          </Typography>
        </CardContent>
      </Card>
      <Card component="li" sx={{ minWidth: 200, flexGrow: 1 }}>
        <CardCover>
          <video
            src="https://css-tricks-post-videos.s3.us-east-1.amazonaws.com/blurry-trees.mov"
            autoPlay
            loop
            playsInline
            muted
          />
        </CardCover>
        <CardContent sx={{ justifyContent: 'center', gap: 1 }}>
          <Typography
            typography="h2"
            color="#fff"
            mt={{ xs: 12, sm: 16 }}
            sx={{ textShadow: '0 0 8px rgba(255,255,255,1)' }}
          >
            VIDEO
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
