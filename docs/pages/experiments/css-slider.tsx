'use client';
import * as React from 'react';
import { createTheme, CssThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

// ---------- Themes ----------------------------------------------------------

const themes = {
  violet: createTheme({
    cssVariables: { colorSchemeSelector: 'data' },
    colorSchemes: {
      light: { palette: { primary: { main: '#7c3aed' }, secondary: { main: '#db2777' } } },
      dark: { palette: { primary: { main: '#a78bfa' }, secondary: { main: '#f472b6' } } },
    },
    shape: { borderRadius: 12 },
  }),
  teal: createTheme({
    cssVariables: { colorSchemeSelector: 'data' },
    colorSchemes: {
      light: { palette: { primary: { main: '#0d9488' }, secondary: { main: '#f59e0b' } } },
      dark: { palette: { primary: { main: '#2dd4bf' }, secondary: { main: '#fbbf24' } } },
    },
    shape: { borderRadius: 4 },
    components: {
      MuiSlider: {
        styleOverrides: {
          thumb: { width: 24, height: 24 },
          track: { height: 6 },
          rail: { height: 6 },
        },
      },
    },
  }),
  blue: createTheme({
    cssVariables: { colorSchemeSelector: 'data' },
    colorSchemes: {
      light: { palette: { primary: { main: '#1d4ed8' }, secondary: { main: '#dc2626' } } },
      dark: { palette: { primary: { main: '#60a5fa' }, secondary: { main: '#f87171' } } },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiSlider: {
        defaultProps: { size: 'small' },
      },
    },
  }),
} as const;

type ThemeKey = keyof typeof themes;

// ---------- styled() example ------------------------------------------------
// CssThemeProvider does not inject an Emotion ThemeContext, so CSS variables
// are used directly in place of theme token references.

const GradientSlider = styled(Slider)({
  '& .MuiSlider-track': {
    background: `linear-gradient(90deg, var(--mui-palette-primary-main), var(--mui-palette-secondary-main))`,
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    background: 'var(--mui-palette-secondary-main)',
  },
});

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="overline"
        sx={{
          color: 'text.disabled',
          fontWeight: 700,
          letterSpacing: '0.1em',
          display: 'block',
          mb: 1.5,
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}

// ---------- useMounted guard (avoid SSR hydration mismatch) ----------------

function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

// ---------- Page ------------------------------------------------------------

function Page({
  themeKey,
  setThemeKey,
}: {
  themeKey: ThemeKey;
  setThemeKey: (key: ThemeKey) => void;
}) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const mounted = useMounted();
  const [value1, setValue1] = React.useState<number>(40);
  const [value2, setValue2] = React.useState<number>(60);
  const [value3, setValue3] = React.useState<number>(30);
  const [value4, setValue4] = React.useState<number[]>([20, 70]);

  return (
    <Box
      data-mui-color-scheme={mode}
      sx={{
        p: { xs: 3, md: 5 },
        maxWidth: 760,
        mx: 'auto',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        CssThemeProvider + Slider
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        Verifies Slider still works with the CSS-only path: <code>sx</code>,{' '}
        <code>styled()</code>, <code>styleOverrides</code>, and <code>defaultProps</code> via{' '}
        <code>createTheme</code>.
      </Typography>

      {/* ── Theme + dark mode switcher ──────────────────────────────────── */}
      <Section label="Live theme">
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <ToggleButtonGroup
            value={themeKey}
            exclusive
            onChange={(_, v) => v && setThemeKey(v as ThemeKey)}
            size="small"
          >
            {(Object.keys(themes) as ThemeKey[]).map((key) => (
              <ToggleButton key={key} value={key} sx={{ textTransform: 'capitalize', px: 2 }}>
                {key}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="body2">Light</Typography>
            <Switch
              checked={mounted ? mode === 'dark' : false}
              onChange={(event) => setMode(event.target.checked ? 'dark' : 'light')}
            />
            <Typography variant="body2">Dark</Typography>
          </Stack>
        </Stack>
        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.disabled' }}>
          {themeKey === 'teal' &&
            'This theme overrides MuiSlider — larger thumb & track via styleOverrides.'}
          {themeKey === 'blue' && 'This theme sets size="small" on all Sliders via defaultProps.'}
          {themeKey === 'violet' && 'Default theme with rounded corners (borderRadius: 12).'}
        </Typography>
      </Section>

      {/* ── Default ─────────────────────────────────────────────────────── */}
      <Section label="Default — color follows primary palette">
        <Slider value={value1} onChange={(_, v) => setValue1(v as number)} />
        <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
          Value: {value1}
        </Typography>
      </Section>

      {/* ── sx prop ─────────────────────────────────────────────────────── */}
      <Section label="sx prop — secondary color + custom thumb size">
        <Slider
          value={value2}
          onChange={(_, v) => setValue2(v as number)}
          sx={{
            color: 'var(--mui-palette-secondary-main)',
            '& .MuiSlider-thumb': {
              width: 22,
              height: 22,
              boxShadow: '0 0 0 7px color-mix(in srgb, var(--mui-palette-secondary-main) 16%, transparent)',
            },
            '& .MuiSlider-rail': { opacity: 0.3 },
          }}
        />
        <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
          Value: {value2}
        </Typography>
      </Section>

      {/* ── styled() ────────────────────────────────────────────────────── */}
      <Section label="styled() — gradient track via styled(Slider)">
        <GradientSlider value={value3} onChange={(_, v) => setValue3(v as number)} />
        <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
          Value: {value3}
        </Typography>
      </Section>

      {/* ── Range slider ────────────────────────────────────────────────── */}
      <Section label="Range slider with sx marks">
        <Slider
          value={value4}
          onChange={(_, v) => setValue4(v as number[])}
          marks
          step={10}
          valueLabelDisplay="auto"
          sx={{ '& .MuiSlider-markLabel': { fontSize: '0.7rem' } }}
        />
        <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
          Value: [{value4.join(', ')}]
        </Typography>
      </Section>

      {/* ── Disabled ────────────────────────────────────────────────────── */}
      <Section label="Disabled state">
        <Slider value={50} disabled />
      </Section>

      {/* ── Vertical ────────────────────────────────────────────────────── */}
      <Section label="Vertical orientation">
        <Box sx={{ height: 160, display: 'flex', gap: 4 }}>
          <Slider
            orientation="vertical"
            value={value1}
            onChange={(_, v) => setValue1(v as number)}
          />
          <Slider
            orientation="vertical"
            value={value2}
            onChange={(_, v) => setValue2(v as number)}
            sx={{ color: 'var(--mui-palette-secondary-main)' }}
          />
        </Box>
      </Section>
    </Box>
  );
}

export default function CssSlider() {
  const [themeKey, setThemeKey] = React.useState<ThemeKey>('violet');
  return (
    <CssThemeProvider theme={themes[themeKey]}>
      <Page themeKey={themeKey} setThemeKey={setThemeKey} />
    </CssThemeProvider>
  );
}
