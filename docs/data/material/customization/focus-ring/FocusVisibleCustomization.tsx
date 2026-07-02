import * as React from 'react';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Merge over the curated default: recolor only, geometry is kept.
const recolor = createTheme({ focusVisible: { outlineColor: '#9c27b0' } });

// Two-color ring (WCAG technique C40): the curated outline plus an additive
// box-shadow in a contrasting color, so it stays visible on any background.
const twoColor = createTheme({
  focusVisible: { boxShadow: '0 0 0 4px rgba(0, 0, 0, 0.4)' },
});

// Remove the outline and supply your own indicator.
const outlineRemoved = createTheme({
  focusVisible: { outlineColor: 'transparent', boxShadow: '0 0 0 3px #1976d2' },
});

function Sample({ theme, label }: { theme: Theme; label: string }) {
  return (
    <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <ThemeProvider theme={theme}>
        <Button variant="outlined">Tab to me</Button>
      </ThemeProvider>
    </Stack>
  );
}

export default function FocusVisibleCustomization() {
  return (
    <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', gap: 3 }}>
      <Sample theme={recolor} label="Recolor (merge)" />
      <Sample theme={twoColor} label="Two-color (C40)" />
      <Sample theme={outlineRemoved} label="Outline removed" />
    </Stack>
  );
}
