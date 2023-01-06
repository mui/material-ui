import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function CardCovers() {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardCover sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
        <div>
          <Typography
            fontWeight="lg"
            textColor="#fff"
            ml={2}
            flexGrow={1}
          >
            Bottom
          </Typography>
        </div>
      </CardCover>
      <CardCover sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
        <div>
          <Typography
            fontWeight="lg"
            textColor="#fff"
            ml={12}
            flexGrow={1}
          >
            Middle
          </Typography>
        </div>
      </CardCover>
      <CardContent sx={{ bgcolor: 'rgba(0,0,0,0.5)'}}>
        <Typography
          ml={20}
          textColor="#fff"
        >
          Top
        </Typography>
      </CardContent>
    </Card>
  );
}
