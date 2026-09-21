import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Grouped buttons overlap their borders with a negative margin, so an opaque
// background used to let a button paint over the border of the one before it.
// Both overrides go through the theme: the group styles the selected button
// through its own `grouped` slot, which outranks the transparent leading border
// it sets on the buttons that follow the first one. A `sx` on the button would
// only tie with that rule, leaving the winner up to style insertion order --
// which differs between the two groups below.
const theme = createTheme({
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: {
          '&.Mui-selected': {
            backgroundColor: '#e3f2fd',
            borderColor: '#1976d2',
          },
        },
      },
    },
  },
});

function Group(props) {
  return (
    <ToggleButtonGroup value="center" exclusive {...props}>
      <ToggleButton value="left">Left</ToggleButton>
      <ToggleButton value="center">Center</ToggleButton>
      <ToggleButton value="right">Right</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default function OpaqueBackground() {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ padding: 2, alignItems: 'flex-start' }}>
        <Group />
        <Group orientation="vertical" />
      </Stack>
    </ThemeProvider>
  );
}
