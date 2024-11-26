import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';

export default function SimpleContainer() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </CssVarsProvider>
  );
}
