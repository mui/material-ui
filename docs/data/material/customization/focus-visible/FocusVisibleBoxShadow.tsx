import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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

function DemoRow() {
  return (
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
  );
}

export default function FocusVisibleBoxShadow() {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Typography variant="caption" color="text.secondary">
          Outer indicator: dark box-shadow (#193146) · Inner indicator: light outline
          (#F9F9F9) — one of the two keeps contrast on any background.
        </Typography>
        <div>
          <Typography
            variant="caption"
            color="text.secondary"
            gutterBottom
            sx={{ display: 'block' }}
          >
            On the default background
          </Typography>
          <DemoRow />
        </div>
        <Paper
          elevation={0}
          sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}
        >
          <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
            On a colored background (primary.main)
          </Typography>
          <DemoRow />
        </Paper>
      </Stack>
    </ThemeProvider>
  );
}
