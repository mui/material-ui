import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/lab/Container';

function FixedContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#fff', height: '100vh' }}>
          Fixed
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default FixedContainer;
