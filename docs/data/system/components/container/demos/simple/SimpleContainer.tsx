import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';

export default function SimpleContainer() {
  // @focus-start @padding 1
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </React.Fragment>
  );
  // @focus-end
}
