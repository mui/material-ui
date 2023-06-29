import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/CopyRight';

export default function AboutPage() {
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
          This the About Page
        </Typography>
        <Link href="/">Go to the main page</Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
