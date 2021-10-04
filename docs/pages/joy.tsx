import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BrandingProvider from 'docs/src/BrandingProvider';
import { styled, ThemeProvider, CssVarsProvider, useColorScheme } from 'docs/src/JoyDesignSystem'; // @mui/joy

declare module 'docs/src/JoyDesignSystem' {
  interface JoyColorSchemeOverrides {
    valentine: true;
    trueDark: true;
  }
}

const Typography = styled('div')(({ theme: { vars } }) => ({
  fontSize: vars.fontSize.md,
  color: vars.background.contrast,
}));

const Button = styled('button')(({ theme }) => ({
  padding: '8px 16px',
  border: 0,
  backgroundColor: theme.vars.palette.primary[500],
  color: '#fff',
  fontWeight: 500,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  borderRadius: 4,
  cursor: 'pointer',
}));

const Select = styled('select', { name: 'JoySelect', slot: 'Root' })(({ theme: { vars } }) => ({
  fontSize: vars.fontSize.md,
  padding: '4px 8px 4px 2px',
  borderRadius: 4,
}));

const Toggle = () => {
  const [mounted, setMounted] = React.useState(false);
  const { allColorSchemes, colorScheme, setColorScheme } = useColorScheme();

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  return (
    <Select
      value={colorScheme}
      onChange={(event) => {
        setColorScheme(event.target.value as typeof allColorSchemes[number]);
      }}
    >
      {allColorSchemes.map((scheme) => (
        <option key={scheme} value={scheme}>
          {scheme}
        </option>
      ))}
    </Select>
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
        <Typography>@mui/material</Typography>
        <ToggleButtonGroup>
          <ToggleButton value="primary">It</ToggleButton>
          <ToggleButton value="success">works</ToggleButton>
        </ToggleButtonGroup>
        <br />
        <Typography sx={{ mb: 1 }}>Works without Provider</Typography>
        <Button>Default Button</Button>
        <br />
        <ThemeProvider theme={{ palette: { primary: { 500: '#ff5252' } } }}>
          <Typography sx={{ mb: 1 }}>wrapped with {'<ThemeProvider>'}</Typography>
          <Button>Themed Button</Button>
        </ThemeProvider>
        <br />
        <CssVarsProvider
          colorSchemes={{
            trueDark: {
              palette: {
                primary: {
                  500: '#3b3b3b',
                },
                success: {
                  500: '#318200',
                },
              },
              background: {
                app: '#000',
                contrast: '#fff',
              },
            },
            valentine: {
              palette: {
                primary: {
                  500: '#ff0000',
                },
                success: {
                  500: '#dd00c1',
                },
              },
              background: {
                app: '#ffdeed',
                contrast: '#ff0000',
              },
            },
          }}
        >
          <Typography sx={{ mb: 1 }}>wrapped with {'<CssVarsProvider>'}</Typography>
          <Toggle />
          <Button>Button with CssVars</Button>
        </CssVarsProvider>
      </Box>
    </BrandingProvider>
  );
}
