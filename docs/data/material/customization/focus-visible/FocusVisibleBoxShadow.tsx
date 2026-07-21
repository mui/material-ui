import * as React from 'react';
import { createTheme, ThemeProvider, focusVisibleVars } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Two-color ring (WCAG C40): the curated outline plus an additive box-shadow in a
// contrasting color. `focusVisibleVars.behavior` insets the box-shadow on clip-prone components.
const theme = createTheme({
  focusVisible: {
    boxShadow: `${focusVisibleVars.behavior} 0 0 0 4px rgba(0, 0, 0, 0.4)`,
  },
  // These demos opt out of the ripple, so the focus ring is the only keyboard indicator.
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

export default function FocusVisibleBoxShadow() {
  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction="row"
        spacing={3}
        sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 3 }}
      >
        {/* Outer ring: the box-shadow renders outside the Button. */}
        <Button variant="outlined">Tab to me</Button>
        {/* Inner ring: `focusVisibleVars.behavior` insets the box-shadow so the Tabs scroller cannot clip it. */}
        <Tabs value={0}>
          <Tab label="Tab one" />
          <Tab label="Tab two" />
        </Tabs>
      </Stack>
    </ThemeProvider>
  );
}
