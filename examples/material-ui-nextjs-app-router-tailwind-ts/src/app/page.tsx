import * as React from 'react';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <div className="my-4">
        <Typography variant="h5" component="h1" gutterBottom>
          Material UI NextJS 14 with Tailwind CSS
        </Typography>
      </div>
    </Container>
  );
}
