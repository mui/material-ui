/**
 * Mirrors the runtime CssThemeProvider sandbox while using the aggregate stylesheet.
 * Component breakpoints therefore use MUI's precompiled defaults instead of app values.
 */
import * as React from 'react';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import Slider from '@mui/material/Slider';
import Toolbar from '@mui/material/Toolbar';
import {
  createTheme,
  CssThemeProvider,
  useCssColorScheme,
  useThemeScopeProps,
} from '@mui/material/styles';
import '@mui/material/styles.css';
import './tailwind.css';

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

// PoC portal bridge. Final version should make Modal/Dialog consume ThemeScope internally.
function ScopedDialog({ slotProps, ...props }: DialogProps) {
  const rootScopeProps = useThemeScopeProps(slotProps?.root as React.HTMLAttributes<HTMLElement>);

  return <Dialog {...props} slotProps={{ ...slotProps, root: rootScopeProps }} />;
}

function TailwindSection() {
  return (
    <div className="mb-8 max-w-[720px] rounded-mui bg-primary p-4 text-primary-contrast shadow-4 sm:bg-secondary sm:text-secondary-contrast">
      <p className="typography-body2 m-0">
        Tailwind tokens - colors, radius, shadow, typography, and the default <code>sm=600px</code>{' '}
        breakpoint are generated from the MUI theme.
      </p>
      <div className="mt-3 rounded-mui bg-background-paper p-3 text-text-primary shadow-1">
        This nested panel uses generated MUI palette tokens through Tailwind utilities.
      </div>
      <Slider
        disabled
        defaultValue={40}
        className="mui-disabled:opacity-50"
        aria-label="Tailwind disabled variant slider"
      />
    </div>
  );
}

interface InnerSectionProps {
  innerThemeIndex: number;
  setInnerThemeIndex: (index: number) => void;
}

function InnerSection({ innerThemeIndex, setInnerThemeIndex }: InnerSectionProps) {
  const [value, setValue] = React.useState<number>(40);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {themeNames.map((name, index) => (
          <button
            key={name}
            type="button"
            onClick={() => setInnerThemeIndex(index)}
            style={{ fontWeight: innerThemeIndex === index ? 'bold' : 'normal' }}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 400 }}>
        <p style={{ marginBottom: 4 }}>
          className override - thumb turns inner secondary color via plain CSS:
        </p>
        <Slider
          value={value}
          onChange={(_, newValue) => setValue(newValue as number)}
          className="inner-custom-slider"
          aria-label="Inner custom class slider"
        />
        <p style={{ marginTop: 4, color: 'var(--mui-palette-text-secondary)' }}>Value: {value}</p>
      </div>

      <div style={{ maxWidth: 400, marginTop: 32 }}>
        <p style={{ marginBottom: 4 }}>
          sx override - track should turn inner secondary and thumb should grow (noop engine:
          ignored, see console):
        </p>
        <Slider
          value={value}
          onChange={(_, newValue) => setValue(newValue as number)}
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
          Dialog portal - root slot receives the current theme scope:
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
  );
}

interface AppContentProps {
  themeIndex: number;
  setThemeIndex: (index: number) => void;
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
      <h1 style={{ marginTop: 0 }}>CssThemeProvider aggregate CSS sandbox</h1>
      <p>
        Engine: <code>@mui/styled-engine-noop</code> - components use the precompiled{' '}
        <code>@mui/material/styles.css</code> stylesheet.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {themeNames.map((name, index) => (
          <button
            key={name}
            type="button"
            onClick={() => setThemeIndex(index)}
            style={{ fontWeight: themeIndex === index ? 'bold' : 'normal' }}
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
          Toolbar breakpoint rule - gutters/min-height switch at default <code>sm=600px</code>:
        </p>
        <div style={{ border: '1px solid var(--mui-palette-divider)' }}>
          <Toolbar style={{ background: 'var(--mui-palette-action-hover)' }}>
            Responsive Toolbar
          </Toolbar>
        </div>
      </div>

      <TailwindSection />

      <div style={{ maxWidth: 400 }}>
        <p style={{ marginBottom: 4 }}>
          className override - thumb turns secondary color via plain CSS:
        </p>
        <Slider
          value={value}
          onChange={(_, newValue) => setValue(newValue as number)}
          className="custom-slider"
          aria-label="Custom class slider"
        />
        <p style={{ marginTop: 4, color: 'var(--mui-palette-text-secondary)' }}>Value: {value}</p>
      </div>

      <div style={{ maxWidth: 400, marginTop: 32 }}>
        <p style={{ marginBottom: 4 }}>
          sx override - track should turn secondary and thumb should grow (noop engine: ignored, see
          console):
        </p>
        <Slider
          value={value}
          onChange={(_, newValue) => setValue(newValue as number)}
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
          Nested scoped theme (auto scope wrapper, --mui-palette-* override)
        </h2>
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
          background: var(--mui-palette-secondary-main, #9c27b0);
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
