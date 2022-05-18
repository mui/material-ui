import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import StarBorder from '@mui/icons-material/StarBorder';
import LocationOn from '@mui/icons-material/LocationOnOutlined';

export default function GradientCover() {
  return (
    <Card size="lg" sx={{ minHeight: '300px', minWidth: 240 }}>
      <CardCover>
        <img
          src="https://images.unsplash.com/photo-1525630558331-067c957817a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2250&q=80"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 100px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 200px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="h2" fontSize="lg" color="#fff" mb={1}>
          The Beach
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography startDecorator={<LocationOn />} color="neutral.300">
            Tarifa, Spain
          </Typography>
          <Typography startDecorator={<StarBorder />} color="neutral.300">
            4.8
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
