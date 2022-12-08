import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function CardCovers() {
  return (
    <Card sx={{ minWidth: 320 }}>
      <CardCover sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
        <div>
          <Typography
            fontSize="50px"
            fontWeight="lg"
            textColor="#fff"
            ml={2}
            flexGrow={1}
          >
            3
          </Typography>
        </div>
      </CardCover>
      <CardCover sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
        <div>
          <Typography
            fontSize="50px"
            fontWeight="lg"
            textColor="#fff"
            ml={6}
            flexGrow={1}
          >
            2
          </Typography>
        </div>
      </CardCover>
      <CardCover sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
        <div>
          <Typography
            fontSize="50px"
            fontWeight="lg"
            textColor="#fff"
            ml={10}
            flexGrow={1}
          >
            1
          </Typography>
        </div>
      </CardCover>
      <CardContent sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
        <Typography level="h2" ml={12} mr={2} textColor="#fff">
          Content
        </Typography>
      </CardContent>
    </Card>
  );
}
