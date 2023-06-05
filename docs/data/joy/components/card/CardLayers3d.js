import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function CardLayers3d() {
  return (
    <Box
      sx={{
        perspective: '1000px',
        transition: 'transform 0.4s',
        '& > div, & > div > div': {
          transition: 'inherit',
        },
        '&:hover': {
          '& > div': {
            transform: 'rotateY(30deg)',
            '& > div:nth-child(2)': {
              transform: 'scaleY(0.9) translate3d(20px, 30px, 40px)',
            },
            '& > div:nth-child(3)': {
              transform: 'translate3d(45px, 50px, 40px)',
            },
          },
        },
      }}
    >
      <Card
        variant="outlined"
        sx={{
          minHeight: '280px',
          width: 320,
          backgroundColor: '#fff',
          borderColor: '#000',
        }}
      >
        <Typography level="h2" fontSize="lg" textColor="#000">
          Card
        </Typography>
        <CardCover
          sx={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
            border: '1px solid',
            borderColor: '#777',
          }}
        >
          <Typography level="h2" fontSize="lg" textColor="#fff">
            Card Cover
          </Typography>
        </CardCover>
        <CardContent
          sx={{
            alignItems: 'self-end',
            justifyContent: 'flex-end',
            background: 'linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.3))',
            border: '1px solid',
            borderColor: '#000',
          }}
        >
          <Typography level="h2" fontSize="lg" textColor="#fff" m={3}>
            Card Content
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
