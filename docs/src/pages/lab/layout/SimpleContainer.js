import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/lab/Container';

function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#fff', height: '100vh' }}>
          Fluid
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default SimpleContainer;
