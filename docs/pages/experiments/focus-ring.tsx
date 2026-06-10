'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// 1. A11y fallback: ripple disabled via defaultProps -> ring appears automatically,
//    no `focusRing` configured (default color = palette.text.primary).
const fallbackTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
  },
});

// 2. Opt-in: `theme.focusRing` set -> ring on every keyboard focus, even with ripple on.
const optInTheme = createTheme({
  focusRing: { outlineColor: '#9c27b0', outlineWidth: 2, outlineOffset: 3 },
});

// 3. Kill-switch: `false` removes the ring entirely, including the disableRipple fallback.
const offTheme = createTheme({
  focusRing: false,
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
  },
});

function Sample() {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <MenuList sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
      </MenuList>
    </Stack>
  );
}

function Section({
  title,
  description,
  theme,
}: {
  title: string;
  description: string;
  theme: ReturnType<typeof createTheme>;
}) {
  return (
    <section>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
      <ThemeProvider theme={theme}>
        <Sample />
      </ThemeProvider>
    </section>
  );
}

export default function FocusRing() {
  return (
    <Box sx={{ p: 6, maxWidth: 900 }}>
      <Typography variant="h4" gutterBottom>
        Focus ring
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Tab through each group with the keyboard (the ring is keyboard-only — mouse clicks never
        show it). In Windows High Contrast / forced-colors mode the outline is preserved, unlike the
        ripple or background-tint indicators.
      </Typography>
      <Stack spacing={5}>
        <Section
          title="1. Accessibility fallback (automatic)"
          description="disableRipple via MuiButtonBase.defaultProps and no focusRing config. The ring replaces the missing ripple focus indicator, defaulting to palette.primary.main."
          theme={fallbackTheme}
        />
        <Section
          title="2. Opt-in theme (ripple stays on)"
          description="theme.focusRing = { outlineColor: '#9c27b0', outlineWidth: 2, outlineOffset: 3 }. The ring shows on every keyboard focus regardless of ripple — ring and ripple coexist."
          theme={optInTheme}
        />
        <Section
          title="3. Kill-switch"
          description="theme.focusRing = false with disableRipple set. No ring at all, including the accessibility fallback — an explicit opt-out."
          theme={offTheme}
        />
      </Stack>
    </Box>
  );
}
