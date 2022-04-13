import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/system/Box';
import Container from '@mui/system/Container';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </React.Fragment>
  );
}
