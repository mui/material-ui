'use client';

import {Container, Box, Typography} from '@mui/material';
import {Copyright} from '@/components/CopyRight/Copyright';
import {ProTip} from '@/components/ProTip/ProTip';

export const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI - Next.js example using App Router in TypeScript
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};
