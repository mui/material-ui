import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Two-color ring (WCAG C40): a light inner outline flush with the edge plus a dark outer
// box-shadow. Material UI insets the box-shadow on clip-prone components (Tabs), so a plain value works.
const theme = createTheme({
  focusVisible: {
    /* inner indicator */
    outlineColor: '#F9F9F9',
    outlineOffset: 0,
    /* outer indicator */
    boxShadow: '0 0 0 4px #193146',
  },
  colorSchemes: { light: true, dark: true },
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
        {/* Inner ring: the box-shadow insets automatically so the Tabs scroller cannot clip it. */}
        <Tabs value={0}>
          <Tab label="Tab one" />
          <Tab label="Tab two" />
        </Tabs>
      </Stack>
    </ThemeProvider>
  );
}
