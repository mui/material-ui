'use client';
import * as React from 'react';
import { createTheme, CssThemeProvider, useCssColorScheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

// ---------- Themes ----------------------------------------------------------

const themes = [
  createTheme({
    cssVariables: { colorSchemeSelector: 'data' },
    colorSchemes: { light: true, dark: true },
  }),
  createTheme({
    cssVariables: { colorSchemeSelector: 'data' },
    colorSchemes: {
      light: { palette: { primary: { main: '#2e7d32' }, secondary: { main: '#e91e63' } } },
      dark: { palette: { primary: { main: '#66bb6a' }, secondary: { main: '#f48fb1' } } },
    },
  }),
  createTheme({
    cssVariables: { colorSchemeSelector: 'data' },
    colorSchemes: {
      light: { palette: { primary: { main: '#c62828' }, secondary: { main: '#f57c00' } } },
      dark: { palette: { primary: { main: '#ef9a9a' }, secondary: { main: '#ffcc02' } } },
    },
  }),
];

const themeNames = ['Blue (default)', 'Green', 'Red'];

const innerThemes = [
  createTheme({
    cssVariables: {
      rootSelector: '.inner-theme-scope',
      colorSchemeSelector: '.inner-theme-scope[data-mui-color-scheme="%s"]',
    },
    colorSchemes: { light: true, dark: true },
  }),
  createTheme({
    cssVariables: {
      rootSelector: '.inner-theme-scope',
      colorSchemeSelector: '.inner-theme-scope[data-mui-color-scheme="%s"]',
    },
    colorSchemes: {
      light: { palette: { primary: { main: '#2e7d32' }, secondary: { main: '#e91e63' } } },
      dark: { palette: { primary: { main: '#66bb6a' }, secondary: { main: '#f48fb1' } } },
    },
  }),
  createTheme({
    cssVariables: {
      rootSelector: '.inner-theme-scope',
      colorSchemeSelector: '.inner-theme-scope[data-mui-color-scheme="%s"]',
    },
    colorSchemes: {
      light: { palette: { primary: { main: '#c62828' }, secondary: { main: '#f57c00' } } },
      dark: { palette: { primary: { main: '#ef9a9a' }, secondary: { main: '#ffcc02' } } },
    },
  }),
];

// ---------- ScopedCssThemeProvider -----------------------------------------

const INNER_STYLE_ID = 'mui-css-vars-inner-scope';

// Uses CssThemeProvider with a dedicated styleId so the inner CSS goes into
// its own <style id="mui-css-vars-inner-scope">, separate from the outer
// provider's <style id="mui-css-vars">.
// colorSchemeNode={null}  — outer div owns data-mui-color-scheme.
// storageWindow={null}    — outer provider owns localStorage.
function ScopedCssThemeProvider({
  theme,
  children,
}: {
  theme: ReturnType<typeof createTheme>;
  children: React.ReactNode;
}) {
  const { colorScheme } = useCssColorScheme();
  return (
    <div className="inner-theme-scope" data-mui-color-scheme={colorScheme}>
      <CssThemeProvider
        theme={theme}
        styleId={INNER_STYLE_ID}
        colorSchemeNode={null}
        storageWindow={null}
      >
        {children}
      </CssThemeProvider>
    </div>
  );
}

// ---------- InnerSection ----------------------------------------------------

interface InnerSectionProps {
  innerThemeIndex: number;
  setInnerThemeIndex: (i: number) => void;
}

function InnerSection({ innerThemeIndex, setInnerThemeIndex }: InnerSectionProps) {
  const [value, setValue] = React.useState<number>(40);
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {themeNames.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => setInnerThemeIndex(i)}
            style={{ fontWeight: i === innerThemeIndex ? 700 : 400 }}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 500 }}>
        <p style={{ marginBottom: 4 }}>
          className override — thumb turns inner secondary color via plain CSS:
        </p>
        <Slider
          value={value}
          onChange={(_, v) => setValue(v as number)}
          className="inner-custom-slider"
          aria-label="Inner custom class slider"
        />
        <p style={{ marginTop: 4, color: 'var(--mui-palette-text-secondary)' }}>Value: {value}</p>
      </div>

      <div style={{ maxWidth: 500, marginTop: 32 }}>
        <p style={{ marginBottom: 4 }}>
          sx override — track should turn inner secondary + thumb should grow (noop engine: ignored,
          see console):
        </p>
        <Slider
          value={value}
          onChange={(_, v) => setValue(v as number)}
          sx={{
            color: 'var(--mui-palette-secondary-main)',
            '& .MuiSlider-thumb': { width: 28, height: 28 },
          }}
          aria-label="Inner sx override slider"
        />
        <p style={{ marginTop: 4, color: 'var(--mui-palette-text-secondary)' }}>Value: {value}</p>
      </div>
    </div>
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
  themeIndex,
  setThemeIndex,
}: {
  themeIndex: number;
  setThemeIndex: (i: number) => void;
}) {
  const { mode, setMode } = useCssColorScheme();
  const mounted = useMounted();
  const [value, setValue] = React.useState<number>(40);
  const [innerThemeIndex, setInnerThemeIndex] = React.useState(0);

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
      <h1 style={{ marginTop: 0 }}>CssThemeProvider + Slider</h1>
      <p style={{ color: 'var(--mui-palette-text-secondary)', marginTop: 0 }}>
        Verifies Slider works with the CSS-only path. Engine: <code>@mui/styled-engine-noop</code> —
        no Emotion.
      </p>

      {/* Theme switcher + dark mode toggle */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {themeNames.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => setThemeIndex(i)}
            style={{ fontWeight: i === themeIndex ? 700 : 400 }}
          >
            {name}
          </button>
        ))}
        <button type="button" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
          {mounted ? `Switch to ${mode === 'light' ? 'dark' : 'light'} mode` : 'Toggle mode'}
        </button>
      </div>

      {/* ── className ────────────────────────────────────────────── */}
      <div style={{ maxWidth: 500 }}>
        <p style={{ marginBottom: 4 }}>
          className override — thumb turns secondary color via plain CSS:
        </p>
        <Slider
          value={value}
          onChange={(_, v) => setValue(v as number)}
          className="custom-slider"
          aria-label="Custom class slider"
        />
        <p style={{ marginTop: 4, color: 'var(--mui-palette-text-secondary)' }}>Value: {value}</p>
      </div>

      {/* ── sx prop ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 500, marginTop: 32 }}>
        <p style={{ marginBottom: 4 }}>
          sx override — track should turn secondary + thumb should grow (noop engine: ignored, see
          console):
        </p>
        <Slider
          value={value}
          onChange={(_, v) => setValue(v as number)}
          sx={{
            color: 'var(--mui-palette-secondary-main)',
            '& .MuiSlider-thumb': { width: 28, height: 28 },
          }}
          aria-label="sx override slider"
        />
        <p style={{ marginTop: 4, color: 'var(--mui-palette-text-secondary)' }}>Value: {value}</p>
      </div>

      {/* ── nested CssThemeProvider ─────────────────────────── */}
      {/* mounted guard: CssVarsInjector renders <style> on the server but null on the
          client, which causes a React hydration mismatch when a second injector is
          present alongside the outer one. Deferring to client-only avoids it. */}
      {mounted && (
        <div
          style={{
            marginTop: 48,
            padding: 24,
            border: '2px dashed var(--mui-palette-divider)',
            borderRadius: 8,
          }}
        >
          <h2 style={{ marginTop: 0 }}>Nested scoped theme (same --mui-palette-* names)</h2>
          <ScopedCssThemeProvider theme={innerThemes[innerThemeIndex]}>
            <InnerSection
              innerThemeIndex={innerThemeIndex}
              setInnerThemeIndex={setInnerThemeIndex}
            />
          </ScopedCssThemeProvider>
        </div>
      )}

      <style>{`
        .custom-slider .MuiSlider-thumb {
          width: 24px;
          height: 24px;
          background: var(--mui-palette-secondary-main, #9c27b0);
        }
        .inner-custom-slider .MuiSlider-thumb {
          width: 24px;
          height: 24px;
          background: var(--mui-palette-secondary-main, #9c27b0);
        }
      `}</style>
    </div>
  );
}

export default function CssSlider() {
  const [themeIndex, setThemeIndex] = React.useState(0);
  return (
    <CssThemeProvider theme={themes[themeIndex]}>
      <Page themeIndex={themeIndex} setThemeIndex={setThemeIndex} />
    </CssThemeProvider>
  );
}
