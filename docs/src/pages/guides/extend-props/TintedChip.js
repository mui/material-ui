import * as React from 'react';
import { ThemeProvider, createTheme, alpha } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

let theme = createTheme();

const colors = ['primary', 'secondary'];

theme = createTheme({
  components: {
    MuiChip: {
      variants: colors.map((color) => ({
        props: { variant: 'tinted', color },
        style: {
          backgroundColor: alpha(theme.palette[color].main, 0.12),
          color: theme.palette[color].main,
        },
      })),
    },
  },
});

export default function TintedChip() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Chip label="Primary" variant="tinted" color="primary" />
        <Chip label="Secondary" variant="tinted" color="secondary" />
      </Box>
    </ThemeProvider>
  );
}
