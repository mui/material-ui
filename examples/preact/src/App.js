import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from './ProTip';
import Copyright from './Copyright';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Preact v5-alpha example
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
