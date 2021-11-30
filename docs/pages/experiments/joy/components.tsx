import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { CssVarsProvider, styled, ColorPaletteProp, TypographySystem } from '@mui/joy/styles';

const Typography = styled('p', {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'level' && prop !== 'sx',
})<{ color?: ColorPaletteProp; level?: keyof TypographySystem }>(
  ({ theme, level = 'body1', color }) => [
    { margin: 0 },
    theme.typography[level],
    color && { color: `var(--joy-palette-${color}-textColor)` },
  ],
);

export default function JoyComponents() {
  return (
    <CssVarsProvider>
      <Box sx={{ maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Typography level="h5" sx={{ mb: 1 }}>
          Button
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Button size="small">Small</Button>
          <Button variant="text" elevation="md">
            Default
          </Button>
          <Button variant="outlined" roundness="xs">
            Default
          </Button>
          <Button variant="light">Default</Button>
          <Button variant="contained" color="neutral">
            Default
          </Button>
          <Button variant="contained" disabled>
            Default
          </Button>
          <Button size="large">Large</Button>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
