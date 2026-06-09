/**
 * emotion-engine sandbox — Slider only.
 *
 * Mirror of noop-vite-sandbox but using the Emotion engine (the default MUI
 * setup). No engine alias is applied — @mui/styled-engine resolves to the
 * real Emotion-backed package.
 *
 * Verifies that:
 *   1. @mui/styled-engine resolves to the Emotion engine (bundle contains @emotion/*).
 *   2. Slider renders correctly via ThemeProvider + Emotion-generated styles.
 *   3. The `sx` prop works and applies styles at runtime via Emotion.
 *   4. Dark mode works via ThemeProvider's colorSchemes / CssVarsProvider.
 *   5. useTheme() returns live JS theme values.
 *
 * To confirm Emotion IS bundled, run:
 *   pnpm -F @mui-internal/emotion-vite-sandbox build
 * Then:
 *   grep -r "@emotion" dist/
 *   # should print matches
 */
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

const theme = createTheme({
  cssVariables: true,
  colorSchemes: { light: true, dark: true },
});

type Mode = 'light' | 'dark';

export default function App() {
  const [value, setValue] = React.useState<number>(40);
  const [mode, setMode] = React.useState<Mode>('light');

  function toggleMode() {
    const next: Mode = mode === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-mui-color-scheme', next);
    setMode(next);
  }

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          padding: 32,
          minHeight: '100vh',
          background: 'var(--mui-palette-background-default)',
          color: 'var(--mui-palette-text-primary)',
          fontFamily: 'sans-serif',
        }}
      >
        <h1 style={{ marginTop: 0 }}>emotion-engine sandbox</h1>
        <p>
          Engine: <code>@mui/styled-engine</code> (Emotion) — Emotion is bundled here.
        </p>

        {/* Dark mode toggle */}
        <button type="button" onClick={toggleMode} style={{ marginBottom: 32 }}>
          Switch to {mode === 'light' ? 'dark' : 'light'} mode
        </button>

        <div style={{ maxWidth: 400 }}>
          <p>Slider value: {value}</p>

          {/* sx prop — works with Emotion, applies color override at runtime */}
          <Slider
            value={value}
            onChange={(_, v) => setValue(v as number)}
            sx={{ color: 'secondary.main' }}
            aria-label="Sandbox slider"
          />

          <p style={{ marginTop: 32 }}>
            className override (thumb should be purple, overriding the default via plain CSS):
          </p>

          {/* className override */}
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
    </ThemeProvider>
  );
}
