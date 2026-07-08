/**
 * static-theme sandbox — Path B (pre-generated CSS).
 *
 * Mirrors the Emotion sandbox scenarios, but there is no provider doing
 * runtime style injection. Theme switching swaps generated scope classes.
 * Component source CSS and generated theme CSS are both imported by the app.
 */
import * as React from 'react';
import Slider from '@mui/material/Slider';
import Toolbar from '@mui/material/Toolbar';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import { useColorScheme } from '@mui/material/colorScheme';
import { ThemeScope, useThemeScopeProps } from '@mui/material/styles';
import '@mui/material/components-source.css';
import './theme.css';

const themeNames = ['Blue (default)', 'Green', 'Red'];
const rootThemeClasses = ['root-theme-blue', 'root-theme-green', 'root-theme-red'];
const innerThemeClasses = ['inner-theme-blue', 'inner-theme-green', 'inner-theme-red'];

// PoC portal bridge. Final version should make Modal/Dialog consume ThemeScope internally.
function ScopedDialog({ slotProps, ...props }: DialogProps) {
  const rootScopeProps = useThemeScopeProps(slotProps?.root as React.HTMLAttributes<HTMLElement>);

  return <Dialog {...props} slotProps={{ ...slotProps, root: rootScopeProps }} />;
}

interface InnerSectionProps {
  colorScheme: string | undefined;
  innerThemeIndex: number;
  setInnerThemeIndex: (i: number) => void;
}

function InnerSection({ colorScheme, innerThemeIndex, setInnerThemeIndex }: InnerSectionProps) {
  const [value, setValue] = React.useState<number>(40);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <ThemeScope className={innerThemeClasses[innerThemeIndex]} colorScheme={colorScheme}>
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
            sx override — track should turn inner secondary + thumb should grow (noop engine:
            ignored, see console):
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

        <div style={{ marginTop: 32 }}>
          <p style={{ marginBottom: 4 }}>
            Dialog portal — root slot receives the current theme scope:
          </p>
          <button type="button" onClick={() => setDialogOpen(true)}>
            Open scoped Dialog
          </button>
          <ScopedDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <div style={{ padding: 24, minWidth: 320 }}>
              <p style={{ marginTop: 0 }}>
                This Slider portals to <code>document.body</code>, but the Dialog root carries the
                nested scope.
              </p>
              <Slider defaultValue={40} aria-label="Dialog scoped slider" />
              <button type="button" onClick={() => setDialogOpen(false)}>
                Close
              </button>
            </div>
          </ScopedDialog>
        </div>
      </div>
    </ThemeScope>
  );
}

interface AppContentProps {
  colorScheme: string | undefined;
  mode: 'light' | 'dark' | 'system' | undefined;
  setMode: (mode: 'light' | 'dark' | 'system' | null) => void;
  themeIndex: number;
  setThemeIndex: (i: number) => void;
}

function AppContent({ colorScheme, mode, setMode, themeIndex, setThemeIndex }: AppContentProps) {
  const [value, setValue] = React.useState<number>(40);
  const [innerThemeIndex, setInnerThemeIndex] = React.useState(0);

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
      <h1 style={{ marginTop: 0 }}>static-theme sandbox</h1>
      <p>
        Engine: <code>@mui/styled-engine-noop</code> — no Emotion. Theme delivered via generated{' '}
        <code>theme.css</code> (no runtime CSS variable injection).
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
        <button type="button" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
          Switch to {mode === 'light' ? 'dark' : 'light'} mode
        </button>
      </div>

      <div style={{ maxWidth: 720, marginBottom: 32 }}>
        <p style={{ marginBottom: 4 }}>
          Toolbar breakpoint rule — gutters/min-height switch at custom <code>sm=720px</code>:
        </p>
        <div style={{ border: '1px solid var(--mui-palette-divider)' }}>
          <Toolbar style={{ background: 'var(--mui-palette-action-hover)' }}>
            Responsive Toolbar
          </Toolbar>
        </div>
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

      <div
        style={{
          marginTop: 48,
          padding: 24,
          border: '2px dashed var(--mui-palette-divider)',
          borderRadius: 8,
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          Nested scoped theme (generated scope wrapper, --mui-palette-* override)
        </h2>
        <InnerSection
          colorScheme={colorScheme}
          innerThemeIndex={innerThemeIndex}
          setInnerThemeIndex={setInnerThemeIndex}
        />
      </div>

      <style>{`
        body {
          margin: 0;
        }
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

export default function App() {
  const [themeIndex, setThemeIndex] = React.useState(0);
  const { mode, setMode, colorScheme } = useColorScheme({ noSsr: true });

  return (
    <ThemeScope className={rootThemeClasses[themeIndex]} colorScheme={colorScheme}>
      <AppContent
        colorScheme={colorScheme}
        mode={mode}
        setMode={setMode}
        themeIndex={themeIndex}
        setThemeIndex={setThemeIndex}
      />
    </ThemeScope>
  );
}
