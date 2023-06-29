import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '@/components/CopyRight';
import ProTip from '@/components/ProTip';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h3" gutterBottom>
          Material UI - Next.js example using App Router in TypeScript
        </Typography>
        <Typography variant="h4" component="h3" gutterBottom>
          This the Home Page
        </Typography>
        <Link href="/about">Go to the about page</Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
