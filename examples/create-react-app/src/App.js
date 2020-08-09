import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    Copyright &copy;&nbsp;
    <Link color="inherit" href="https://material-ui.com/">
      Your Website
    </Link>
    &nbsp;
    {new Date().getFullYear()}.
  </Typography>
);

const App = () => (
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create React App v4-beta example
      </Typography>
      <ProTip />
      <Copyright />
    </Box>
  </Container>
);

export default App;
