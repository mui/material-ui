import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme({ focusRing: true });

export default function FocusRingDefault() {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} alignItems="flex-start">
        <Typography variant="body2" color="text.secondary">
          Press <kbd>Tab</kbd> to move focus — the ring shows on keyboard focus only.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button variant="text">Text</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="contained">Contained</Button>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Stack>
        <Tabs value={0}>
          <Tab label="One" />
          <Tab label="Two" />
        </Tabs>
      </Stack>
    </ThemeProvider>
  );
}
