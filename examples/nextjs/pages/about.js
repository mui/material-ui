import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ProTip from '../src/ProTip';
import MuiLink from '@material-ui/core/Link';
import Link from 'next/link';
import Copyright from '../src/Copyright';
import App from '../src/App';

export default function About() {
  return (
    <App>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>

          <Link href="/" passHref>
            <Button variant="contained" color="primary" component={MuiLink}>
              Go to the main page
            </Button>
          </Link>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </App>
  );
}
