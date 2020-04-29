import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import MuiLink from '@material-ui/core/Link';
import Link from 'next/link';
import Copyright from '../src/Copyright';
import App from '../src/App';

export default function Index() {
  return (
    <App>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link passHref href="/about">
            <MuiLink color="secondary">Go to the about page</MuiLink>
          </Link>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </App>
  );
}
