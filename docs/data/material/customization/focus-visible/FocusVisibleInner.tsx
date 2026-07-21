import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  focusVisible: true,
  // These demos opt out of the ripple, so the focus ring is the only keyboard indicator.
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

export default function FocusVisibleInner() {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Typography variant="body2" color="text.secondary">
          Press <kbd>Tab</kbd>, then use the arrow keys — the ring insets so the Tabs
          scroller cannot clip it.
        </Typography>
        <Tabs value={0}>
          <Tab label="One" />
          <Tab label="Two" />
          <Tab label="Three" />
        </Tabs>
      </Stack>
    </ThemeProvider>
  );
}
