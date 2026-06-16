'use client';
import * as React from 'react';
import { createTheme, ThemeProvider, styled, useColorScheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

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

const GradientSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-track': {
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    background: theme.palette.secondary.main,
  },
}));

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
  const { mode, setMode } = useColorScheme();
  const mounted = useMounted();
  const [value1, setValue1] = React.useState<number>(60);
  const [value2, setValue2] = React.useState<number>(40);
  const [value3, setValue3] = React.useState<number>(30);

  return (
    <div
      style={{
        padding: 32,
        maxWidth: 760,
        margin: '0 auto',
        minHeight: '100vh',
        background: 'var(--mui-palette-background-default)',
        color: 'var(--mui-palette-text-primary)',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ marginTop: 0 }}>Emotion + Slider</h1>
      <p style={{ color: 'var(--mui-palette-text-secondary)', marginTop: 0 }}>
        Verifies Slider works with the Emotion path. Engine: <code>@mui/styled-engine</code>{' '}
        (Emotion).
      </p>

      {/* Theme switcher */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        {(Object.keys(themes) as ThemeKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setThemeKey(key)}
            style={{
              padding: '4px 16px',
              fontWeight: key === themeKey ? 700 : 400,
              outline: key === themeKey ? '2px solid var(--mui-palette-primary-main)' : 'none',
              cursor: 'pointer',
            }}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Dark mode toggle */}
      <button
        type="button"
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        style={{ marginBottom: 32 }}
      >
        {mounted ? `Switch to ${mode === 'light' ? 'dark' : 'light'} mode` : 'Toggle mode'}
      </button>

      {/* ── sx prop ──────────────────────────────────────────────────── */}
      <p style={{ marginBottom: 4 }}>sx prop — secondary color + custom thumb:</p>
      <div style={{ maxWidth: 500 }}>
        <Slider
          value={value1}
          onChange={(_, v) => setValue1(v as number)}
          sx={{
            color: 'secondary.main',
            '& .MuiSlider-thumb': { width: 22, height: 22 },
          }}
          aria-label="sx slider"
        />
      </div>
      <p style={{ marginTop: 4, color: 'var(--mui-palette-text-secondary)' }}>Value: {value1}</p>

      {/* ── className + style tag ─────────────────────────────────────── */}
      <p style={{ marginBottom: 4, marginTop: 24 }}>
        className override — thumb should be purple via plain CSS:
      </p>
      <div style={{ maxWidth: 500 }}>
        <Slider
          value={value2}
          onChange={(_, v) => setValue2(v as number)}
          className="emotion-custom-slider"
          aria-label="className slider"
        />
      </div>
      <p style={{ marginTop: 4, color: 'var(--mui-palette-text-secondary)' }}>Value: {value2}</p>

      {/* ── styled() ────────────────────────────────────────────────── */}
      <p style={{ marginBottom: 4, marginTop: 24 }}>styled() — gradient track:</p>
      <div style={{ maxWidth: 500 }}>
        <GradientSlider
          value={value3}
          onChange={(_, v) => setValue3(v as number)}
          aria-label="gradient slider"
        />
      </div>
      <p style={{ marginTop: 4, color: 'var(--mui-palette-text-secondary)' }}>Value: {value3}</p>

      <style>{`
        .emotion-custom-slider .MuiSlider-thumb {
          width: 24px;
          height: 24px;
          background: var(--mui-palette-secondary-main, #9c27b0);
        }
      `}</style>
    </div>
  );
}

export default function EmotionSlider() {
  const [themeKey, setThemeKey] = React.useState<ThemeKey>('violet');
  return (
    <ThemeProvider theme={themes[themeKey]}>
      <Page themeKey={themeKey} setThemeKey={setThemeKey} />
    </ThemeProvider>
  );
}
