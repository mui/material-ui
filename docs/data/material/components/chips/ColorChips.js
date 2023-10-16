import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { pink, common } from '@mui/material/colors';
import { ThemeProvider, theme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    violet: {
      main: '#8F00FF',
      contrastText: '#FFFFFF',
    },
  },
});

export default function ColorChips() {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={1} alignItems="center">
        <Stack direction="row" spacing={1}>
          <Chip label="primary" color="primary" />
          <Chip label="success" color="success" />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Chip label="primary" color="primary" variant="outlined" />
          <Chip label="success" color="success" variant="outlined" />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Chip label="violet" color="violet" />
          <Chip label="violet" color="violet" variant="outlined" />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Chip
            label="pink"
            sx={{ backgroundColor: pink[500], color: common.white }}
          />
          <Chip
            label="pink"
            sx={{ borderColor: pink[500], color: pink[500] }}
            variant="outlined"
          />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
