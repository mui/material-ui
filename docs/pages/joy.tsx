import * as React from 'react';
import Box from '@mui/material/Box';
import BrandingProvider from 'docs/src/BrandingProvider';
import { styled, CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Switch from '@mui/joy/Switch';

declare module '@mui/joy/styles' {
  interface JoyColorSchemeOverrides {
    valentine: true;
    trueDark: true;
  }
}

const Typography = styled('div')(({ theme: { vars } }) => ({
  fontSize: vars.fontSize.md,
  color: vars.background.contrast,
}));

const Toggle = () => {
  const [mounted, setMounted] = React.useState(false);
  const { allColorSchemes, colorScheme, setColorScheme } = useColorScheme();

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {allColorSchemes.map((color) => (
        <Box
          component="button"
          key={color}
          onClick={() => setColorScheme(color)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            alignItems: 'center',
            minWidth: 80,
            border: 0,
            bgcolor: 'transparent',
            cursor: 'pointer',
          }}
        >
          <Box
            {...(color !== 'light' && { 'data-color-scheme': color })}
            sx={{
              borderRadius: 10,
              width: 40,
              height: 40,
              backgroundColor: color === 'light' ? '#007FFF' : 'var(--palette-brand)',
              ...(colorScheme === color && {
                outline: `2px solid var(--palette-brand)`,
                outlineOffset: 4,
              }),
            }}
          />
          <Typography>{color}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default function Joy() {
  return (
    <BrandingProvider>
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          bgcolor: 'var(--background-app)',
        }}
      >
        <CssVarsProvider
          colorSchemes={{
            trueDark: {
              palette: {
                brand: '#3b3b3b',
                neutral: '#e5e5e5',
              },
              background: {
                app: '#000',
                contrast: '#fff',
              },
            },
            valentine: {
              palette: {
                brand: '#ff0000',
                neutral: '#e5e5e5',
              },
              background: {
                app: '#ffdeed',
                contrast: '#ff0000',
              },
            },
          }}
        >
          <Switch />
          <br />
          <Typography sx={{ mb: 1, mt: 4 }}>Pick a color scheme</Typography>
          <Toggle />
        </CssVarsProvider>
      </Box>
    </BrandingProvider>
  );
}
