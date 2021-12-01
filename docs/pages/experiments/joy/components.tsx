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
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Typography level="h5" sx={{ mb: 1 }}>
          Small
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              border: 1,
              borderColor: 'neutral.200',
            }}
          >
            <Button size="small">Contained</Button>
            <Button variant="light" size="small">
              Light
            </Button>
            <Button variant="outlined" size="small">
              Outlined
            </Button>
            <Button variant="text" size="small">
              Text
            </Button>
          </Box>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              border: 1,
              borderColor: 'neutral.200',
            }}
          >
            <Button size="small" elevation="md">
              Contained
            </Button>
            <Button variant="light" size="small" elevation="md">
              Light
            </Button>
            <Button variant="outlined" size="small" elevation="md">
              Outlined
            </Button>
            <Button variant="text" size="small" elevation="md">
              Text
            </Button>
          </Box>
        </Box>

        <Typography level="h5" sx={{ mt: 4, mb: 1 }}>
          Default
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              border: 1,
              borderColor: 'neutral.200',
            }}
          >
            <Button>Contained</Button>
            <Button variant="light">Light</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
          </Box>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              border: 1,
              borderColor: 'neutral.200',
            }}
          >
            <Button elevation="md">Contained</Button>
            <Button variant="light" elevation="md">
              Light
            </Button>
            <Button variant="outlined" elevation="md">
              Outlined
            </Button>
            <Button variant="text" elevation="md">
              Text
            </Button>
          </Box>
        </Box>

        <Typography level="h5" sx={{ mt: 4, mb: 1 }}>
          Large
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              border: 1,
              borderColor: 'neutral.200',
            }}
          >
            <Button size="large">Contained</Button>
            <Button variant="light" size="large">
              Light
            </Button>
            <Button variant="outlined" size="large">
              Outlined
            </Button>
            <Button variant="text" size="large">
              Text
            </Button>
          </Box>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              border: 1,
              borderColor: 'neutral.200',
            }}
          >
            <Button size="large" elevation="md">
              Contained
            </Button>
            <Button variant="light" size="large" elevation="md">
              Light
            </Button>
            <Button variant="outlined" size="large" elevation="md">
              Outlined
            </Button>
            <Button variant="text" size="large" elevation="md">
              Text
            </Button>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
