'use client';
import * as React from 'react';
import { createTheme, CssThemeProvider, useTheme, type Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

// ---------- Themes ----------------------------------------------------------
// Each theme must be created with `cssVariables: true` — that's the contract
// of `CssThemeProvider`. Without it `generateStyleSheets` is undefined and
// the imported component CSS files would have no variables to read.

const themes = {
  violet: createTheme({
    cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
    colorSchemes: {
      light: { palette: { primary: { main: '#7c3aed' }, secondary: { main: '#db2777' } } },
      dark: { palette: { primary: { main: '#a78bfa' }, secondary: { main: '#f472b6' } } },
    },
    shape: { borderRadius: 12 },
  }),
  teal: createTheme({
    cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
    colorSchemes: {
      light: { palette: { primary: { main: '#0d9488' }, secondary: { main: '#f59e0b' } } },
      dark: { palette: { primary: { main: '#2dd4bf' }, secondary: { main: '#fbbf24' } } },
    },
    shape: { borderRadius: 4 },
    components: {
      MuiSlider: {
        defaultProps: { size: 'small' },
      },
    },
  }),
  blue: createTheme({
    cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
    colorSchemes: {
      light: { palette: { primary: { main: '#1d4ed8' }, secondary: { main: '#dc2626' } } },
      dark: { palette: { primary: { main: '#60a5fa' }, secondary: { main: '#f87171' } } },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiButton: { defaultProps: { disableElevation: true } },
    },
  }),
} as const;

type ThemeKey = keyof typeof themes;

// ---------- Probe: reads theme via useTheme() -------------------------------
// Demonstrates that JS-only theme values (breakpoints, transitions, spacing)
// are reachable through React context — the whole reason `CssThemeProvider`
// also wires up `SystemThemeProvider`, not just the CSS injector.

function ThemeProbe() {
  const theme = useTheme() as Theme;
  // Re-render on resize so the breakpoint readout reflects reality.
  const [width, setWidth] = React.useState<number | null>(null);
  React.useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <Box
      component="dl"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        gap: '4px 16px',
        m: 0,
        fontSize: '0.85rem',
        fontFamily: 'monospace',
        color: 'text.secondary',
      }}
    >
      <dt>theme.spacing(2)</dt>
      <dd>{theme.spacing(2)}</dd>
      <dt>theme.transitions.duration.shortest</dt>
      <dd>{theme.transitions.duration.shortest}ms</dd>
      <dt>theme.breakpoints.values.sm</dt>
      <dd>{theme.breakpoints.values.sm}px</dd>
      <dt>theme.palette.primary.main</dt>
      <dd>{theme.palette.primary.main}</dd>
      <dt>window.innerWidth</dt>
      <dd>{width ?? '?'}px</dd>
    </Box>
  );
}

// ---------- Layout helpers --------------------------------------------------

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

// ---------- Page ------------------------------------------------------------

type Mode = 'light' | 'dark';

function Page({
  themeKey,
  setThemeKey,
  mode,
  setMode,
}: {
  themeKey: ThemeKey;
  setThemeKey: (key: ThemeKey) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
}) {
  const [sliderValue, setSliderValue] = React.useState<number>(40);
  const [chips, setChips] = React.useState(['React', 'CSS vars']);
  const [textValue, setTextValue] = React.useState('');

  function toggleChip(label: string) {
    setChips((prev) => (prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]));
  }

  return (
    <Box
      data-mui-color-scheme={mode}
      sx={{
        p: { xs: 3, md: 5 },
        maxWidth: 760,
        mx: 'auto',
        minHeight: '100vh',
        bgcolor: 'var(--mui-palette-background-default)',
        color: 'var(--mui-palette-text-primary)',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        CssThemeProvider playground
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        No Emotion <code>styled()</code>, no <code>sx</code>. All visuals come from the imported{' '}
        <code>.css</code> files; <code>CssThemeProvider</code> only injects CSS variables and
        exposes the theme via <code>useTheme()</code>.
      </Typography>

      {/* ── Theme switcher ────────────────────────────────────────────── */}
      <Section label="Live theme switching">
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
              checked={mode === 'dark'}
              onChange={(event) => setMode(event.target.checked ? 'dark' : 'light')}
            />
            <Typography variant="body2">Dark</Typography>
          </Stack>
        </Stack>
        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.disabled' }}>
          Theme switching re-injects CSS variables into <code>&lt;head&gt;</code>. The dark/light
          toggle only sets <code>data-mui-color-scheme</code> on the container — no re-render.
        </Typography>
      </Section>

      {/* ── Components ────────────────────────────────────────────────── */}
      <Section label="Buttons (default + color + disabled)">
        <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Button variant="contained">Primary</Button>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
        </Stack>
      </Section>

      <Section label="Slider (animations confirm the transition fallbacks)">
        <Slider value={sliderValue} onChange={(_, v) => setSliderValue(v as number)} />
        <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
          Value: {sliderValue}. Drag the thumb — movement should ease, not snap.
        </Typography>
      </Section>

      <Section label="TextField (color + focus + helper)">
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <TextField
            label="Default"
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
          />
          <TextField label="Error state" error helperText="This field has an error" />
        </Stack>
      </Section>

      <Section label="Chips (interactive)">
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {['React', 'CSS vars', 'No Emotion', 'CssThemeProvider'].map((label) => (
            <Chip
              key={label}
              label={label}
              color={chips.includes(label) ? 'primary' : 'default'}
              onClick={() => toggleChip(label)}
            />
          ))}
        </Stack>
      </Section>

      <Section label="Switch">
        <Switch defaultChecked />
        <Switch />
        <Switch defaultChecked color="secondary" />
      </Section>

      {/* ── Probe ─────────────────────────────────────────────────────── */}
      <Section label="useTheme() snapshot — JS-only values reach the tree">
        <ThemeProbe />
      </Section>
    </Box>
  );
}

export default function CssPlayground() {
  const [themeKey, setThemeKey] = React.useState<ThemeKey>('violet');
  const [mode, setMode] = React.useState<Mode>('light');
  return (
    <CssThemeProvider theme={themes[themeKey]}>
      <Page themeKey={themeKey} setThemeKey={setThemeKey} mode={mode} setMode={setMode} />
    </CssThemeProvider>
  );
}
