import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import styled from 'styled-components';
import ProTip from '../components/ProTip';
import Link from '../components/Link';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Material-UI
      </MuiLink>
      {' team.'}
    </Typography>
  );
}

const MyTypo = styled(Typography)`
  font-size: 22px;
`;

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <MyTypo variant="h4" component="h1" gutterBottom>
          Gatsby v4-alpha example
        </MyTypo>
        <Link to="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <MadeWithLove />
      </Box>
    </Container>
  );
}
