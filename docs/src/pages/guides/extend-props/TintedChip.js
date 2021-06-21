import * as React from 'react';
import { ThemeProvider, createTheme, alpha } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';

let theme = createTheme();

const colors = ['primary', 'secondary', 'blueGrey'];

theme = createTheme({
  palette: {
    blueGrey: {
      main: blueGrey[700],
      light: blueGrey[400],
      dark: blueGrey[900],
      contrastText: '#fff',
    },
  },
  components: {
    MuiChip: {
      variants: [
        ...colors.map((color) => ({
          props: { variant: 'tinted', color },
          style: {
            backgroundColor: alpha(
              color === 'blueGrey' ? blueGrey[500] : theme.palette[color].main,
              0.12,
            ),
            color: color === 'blueGrey' ? blueGrey[500] : theme.palette[color].main,
            fontWeight: 500,
          },
        })),
        {
          props: { size: 'large' },
          style: {
            height: 40,
            borderRadius: 20,
            fontSize: '1rem',
            fontWeight: 'bold',
            letterSpacing: 0,
          },
        },
      ],
    },
  },
});

export default function TintedChip() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Stack spacing={2} alignItems="center">
          <Chip label="Primary" variant="tinted" color="primary" />
          <Chip label="Primary" variant="tinted" color="primary" size="large" />
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Chip label="Secondary" variant="tinted" color="secondary" />
          <Chip label="Secondary" variant="tinted" color="secondary" size="large" />
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Chip label="Secondary" variant="tinted" color="blueGrey" />
          <Chip label="Secondary" variant="tinted" color="blueGrey" size="large" />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
