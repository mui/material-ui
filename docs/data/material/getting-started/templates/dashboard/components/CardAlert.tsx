import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardAlert() {
  return (
    <Card sx={{ m: 1.5, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Your plan is about to expire
        </Typography>
        <Typography variant="body2" gutterBottom>
          Enjoy 10% off when you renew your plan today.
        </Typography>
        <Button variant="contained" size="small" fullWidth>
          Get the discount!
        </Button>
      </CardContent>
    </Card>
  );
}
