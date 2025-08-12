import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ComboBox from './ComboBox';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          MUI Autocomplete Touch Scrolling Bug Fix
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Test the touch scrolling behavior on mobile:
          <br />
          1. Type "e" in the input to filter movies
          <br />
          2. Touch and drag to scroll the list
          <br />
          3. Press Enter - should NOT select an item
        </Typography>
        <ComboBox />
      </Box>
    </Container>
  );
}
