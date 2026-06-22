/**
 * CssThemeProvider sandbox — Path A (Mantine analogy).
 *
 * Same as noop-vite-sandbox but with CssThemeProvider instead of no provider.
 * The engine alias is still @mui/styled-engine-noop — no Emotion in the bundle.
 * Theme delivery is runtime (JS createTheme → CssThemeProvider injects CSS vars)
 * rather than a pre-generated .css file.
 *
 * Verifies that:
 *   1. @mui/styled-engine is aliased to @mui/styled-engine-noop (no Emotion).
 *   2. CssThemeProvider injects --mui-* CSS variables at runtime without Emotion.
 *   3. Slider renders correctly using Slider.css + runtime CSS vars.
 *   4. The `sx` prop fires a console.error in dev and is otherwise ignored.
 *   5. className-based overrides beat @layer mui.default without !important.
 *   6. Dark mode works via CssThemeProvider by toggling data-mui-color-scheme
 *      on <html>.
 *   7. useTheme() returns JS theme values (breakpoints, spacing, etc.).
 *
 * To confirm no Emotion is bundled, run:
 *   pnpm -F @mui-internal/css-theme-provider-vite-sandbox build
 * Then:
 *   grep -r "@emotion/react\|@emotion/styled\|@emotion/cache\|EmotionCacheContext" dist/
 *   # should print nothing
 */
import * as React from 'react';
import { createTheme, CssThemeProvider, useCssColorScheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

const themes = [
  createTheme({
    cssVariables: { colorSchemeSelector: '[data-mui-color-scheme="%s"]' },
    colorSchemes: { light: true, dark: true },
  }),
  createTheme({
    cssVariables: { colorSchemeSelector: '[data-mui-color-scheme="%s"]' },
    colorSchemes: {
      light: { palette: { primary: { main: '#2e7d32' }, secondary: { main: '#e91e63' } } },
      dark: { palette: { primary: { main: '#66bb6a' }, secondary: { main: '#f48fb1' } } },
    },
  }),
  createTheme({
    cssVariables: { colorSchemeSelector: '[data-mui-color-scheme="%s"]' },
    colorSchemes: {
      light: { palette: { primary: { main: '#c62828' }, secondary: { main: '#f57c00' } } },
      dark: { palette: { primary: { main: '#ef9a9a' }, secondary: { main: '#ffcc02' } } },
    },
  }),
];

const themeNames = ['Blue (default)', 'Green', 'Red'];

const innerThemes = [
  createTheme({
    cssVariables: { cssVarPrefix: 'inner', colorSchemeSelector: '[data-mui-color-scheme="%s"]' },
    colorSchemes: { light: true, dark: true },
  }),
  createTheme({
    cssVariables: { cssVarPrefix: 'inner', colorSchemeSelector: '[data-mui-color-scheme="%s"]' },
    colorSchemes: {
      light: { palette: { primary: { main: '#2e7d32' }, secondary: { main: '#e91e63' } } },
      dark: { palette: { primary: { main: '#66bb6a' }, secondary: { main: '#f48fb1' } } },
    },
  }),
  createTheme({
    cssVariables: { cssVarPrefix: 'inner', colorSchemeSelector: '[data-mui-color-scheme="%s"]' },
    colorSchemes: {
      light: { palette: { primary: { main: '#c62828' }, secondary: { main: '#f57c00' } } },
      dark: { palette: { primary: { main: '#ef9a9a' }, secondary: { main: '#ffcc02' } } },
    },
  }),
];

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
            style={{ fontWeight: innerThemeIndex === i ? 'bold' : 'normal' }}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 400 }}>
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

      <div style={{ maxWidth: 400, marginTop: 32 }}>
        <p style={{ marginBottom: 4 }}>
          sx override — track should turn inner secondary + thumb should grow (noop engine: ignored, see console):
        </p>
        <Slider
          value={value}
          onChange={(_, v) => setValue(v as number)}
          sx={{
            color: 'secondary.main',
            '& .MuiSlider-thumb': { width: 28, height: 28 },
          }}
          aria-label="Inner sx override slider"
        />
        <p style={{ marginTop: 4, color: 'var(--mui-palette-text-secondary)' }}>Value: {value}</p>
      </div>
    </div>
  );
}

interface AppContentProps {
  themeIndex: number;
  setThemeIndex: (i: number) => void;
}

function AppContent({ themeIndex, setThemeIndex }: AppContentProps) {
  const [value, setValue] = React.useState<number>(40);
  const [innerThemeIndex, setInnerThemeIndex] = React.useState(0);
  const { mode, setMode } = useCssColorScheme();

  return (
    <div
      style={{
        padding: 32,
        minHeight: '100vh',
        background: 'var(--mui-palette-background-default)',
        color: 'var(--mui-palette-text-primary)',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ marginTop: 0 }}>CssThemeProvider sandbox</h1>
      <p>
        Engine: <code>@mui/styled-engine-noop</code> — no Emotion. Theme delivered via{' '}
        <code>CssThemeProvider</code> (runtime CSS variable injection).
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {themeNames.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => setThemeIndex(i)}
            style={{ fontWeight: themeIndex === i ? 'bold' : 'normal' }}
          >
            {name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        >
          Switch to {mode === 'light' ? 'dark' : 'light'} mode
        </button>
      </div>

      <div style={{ maxWidth: 400 }}>
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

      <div style={{ maxWidth: 400, marginTop: 32 }}>
        <p style={{ marginBottom: 4 }}>
          sx override — track should turn secondary + thumb should grow (noop engine: ignored, see console):
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

      <div
        style={{
          marginTop: 48,
          padding: 24,
          border: '2px dashed var(--mui-palette-divider)',
          borderRadius: 8,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Nested CssThemeProvider (cssVarPrefix: inner)</h2>
        <CssThemeProvider theme={innerThemes[innerThemeIndex]}>
          <InnerSection innerThemeIndex={innerThemeIndex} setInnerThemeIndex={setInnerThemeIndex} />
        </CssThemeProvider>
      </div>

      <style>{`
        .custom-slider .MuiSlider-thumb {
          width: 24px;
          height: 24px;
          background: var(--mui-palette-secondary-main, #9c27b0);
        }
        .inner-custom-slider .MuiSlider-thumb {
          width: 24px;
          height: 24px;
          background: var(--inner-palette-secondary-main, #9c27b0);
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [themeIndex, setThemeIndex] = React.useState(0);
  return (
    <CssThemeProvider theme={themes[themeIndex]}>
      <AppContent themeIndex={themeIndex} setThemeIndex={setThemeIndex} />
    </CssThemeProvider>
  );
}
