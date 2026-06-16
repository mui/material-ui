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

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: '[data-mui-color-scheme="%s"]',
  },
  colorSchemes: { light: true, dark: true },
});

function AppContent() {
  const [value, setValue] = React.useState<number>(40);
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

      <button
        type="button"
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        style={{ marginBottom: 32 }}
      >
        Switch to {mode === 'light' ? 'dark' : 'light'} mode
      </button>

      <div style={{ maxWidth: 400 }}>
        <p>Slider value: {value}</p>

        {/*
          sx prop intentionally passed to trigger the noop dev warning.
          Open the browser console — you should see:
          "MUI: The `sx` prop was used on <span> but `@mui/styled-engine-noop` is active."
        */}
        <Slider
          value={value}
          onChange={(_, v) => setValue(v as number)}
          // @ts-ignore — sx is valid on Slider types but deliberately passed to trigger the noop warning
          sx={{ color: 'red' }}
          aria-label="Sandbox slider"
        />

        <p style={{ marginTop: 32 }}>
          className override (thumb should be purple, overriding the default via plain CSS that
          beats @layer mui.default):
        </p>

        <Slider
          value={value}
          onChange={(_, v) => setValue(v as number)}
          className="custom-slider"
          aria-label="Custom class slider"
        />
      </div>

      <style>{`
        .custom-slider .MuiSlider-thumb {
          width: 24px;
          height: 24px;
          background: var(--mui-palette-secondary-main, #9c27b0);
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <CssThemeProvider theme={theme}>
      <AppContent />
    </CssThemeProvider>
  );
}
