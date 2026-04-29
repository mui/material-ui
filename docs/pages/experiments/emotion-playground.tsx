'use client';
import * as React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

// ---------- Themes ----------------------------------------------------------

const themes = {
  violet: createTheme({
    palette: { primary: { main: '#7c3aed' }, secondary: { main: '#db2777' } },
    shape: { borderRadius: 12 },
  }),
  teal: createTheme({
    palette: { primary: { main: '#0d9488' }, secondary: { main: '#f59e0b' } },
    shape: { borderRadius: 4 },
    components: {
      MuiButton: {
        styleOverrides: { root: { textTransform: 'uppercase', letterSpacing: '0.12em' } },
      },
    },
  }),
  blue: createTheme({
    palette: { primary: { main: '#1d4ed8' }, secondary: { main: '#dc2626' } },
    shape: { borderRadius: 8 },
    components: {
      MuiButton: { defaultProps: { disableElevation: true } },
    },
  }),
} as const;

type ThemeKey = keyof typeof themes;

// ---------- styled() example ------------------------------------------------

const GlowButton = styled(Button)(({ theme }) => ({
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: `radial-gradient(ellipse at 50% 150%, ${theme.palette.primary.light}, transparent 70%)`,
    opacity: 0,
    transition: 'opacity 0.25s',
    pointerEvents: 'none',
  },
  '&:hover::after': { opacity: 1 },
  position: 'relative',
  overflow: 'hidden',
}));

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

export default function EmotionPlayground() {
  const [themeKey, setThemeKey] = React.useState<ThemeKey>('violet');
  const [sliderValue, setSliderValue] = React.useState<number>(40);
  const [chips, setChips] = React.useState(['React', 'TypeScript']);

  function toggleChip(label: string) {
    setChips((prev) => (prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]));
  }

  return (
    <ThemeProvider theme={themes[themeKey]}>
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          maxWidth: 760,
          mx: 'auto',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        {/* Header */}
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          Emotion playground
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
          Explore <code>sx</code>, <code>styled()</code>, live theme switching, and{' '}
          <code>createTheme</code> component overrides.
        </Typography>

        {/* ── Theme switcher ─────────────────────────────────────────────── */}
        <Section label="Live theme">
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
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.disabled' }}>
            {themeKey === 'teal' && 'This theme overrides MuiButton — uppercase + wide tracking.'}
            {themeKey === 'blue' && 'This theme sets disableElevation on all Buttons by default.'}
            {themeKey === 'violet' && 'Default theme with rounded corners (borderRadius: 12).'}
          </Typography>
        </Section>

        {/* ── sx prop ────────────────────────────────────────────────────── */}
        <Section label="sx prop — theme-aware inline styles">
          <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Button variant="contained">Primary</Button>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
            <Button
              variant="contained"
              sx={{
                background: (t) =>
                  `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                boxShadow: 'none',
                '&:hover': { boxShadow: 4, filter: 'brightness(1.05)' },
              }}
            >
              Gradient
            </Button>
            <Button variant="outlined" sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 } }}>
              Thick border
            </Button>
          </Stack>
        </Section>

        {/* ── styled() ───────────────────────────────────────────────────── */}
        <Section label="styled() — component factory">
          <Stack direction="row" spacing={2}>
            <GlowButton variant="contained">Hover: glow effect</GlowButton>
            <GlowButton variant="contained" color="secondary">
              Secondary glow
            </GlowButton>
          </Stack>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.disabled' }}>
            Radial gradient injected via <code>styled(Button)</code> using{' '}
            <code>theme.palette.primary.light</code>.
          </Typography>
        </Section>

        {/* ── Responsive sx ──────────────────────────────────────────────── */}
        <Section label="Responsive sx values">
          <Box
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 2,
              fontSize: { xs: '0.8rem', sm: '1rem', md: '1.15rem' },
              transition: 'all 0.2s',
            }}
          >
            Padding and font-size step up at 600 px (sm) and 900 px (md). Resize the window to see
            the change.
          </Box>
        </Section>

        {/* ── Slider sx ──────────────────────────────────────────────────── */}
        <Section label="Slider with sx overrides">
          <Slider
            value={sliderValue}
            onChange={(_, v) => setSliderValue(v as number)}
            sx={{
              color: 'secondary.main',
              '& .MuiSlider-thumb': {
                width: 22,
                height: 22,
                boxShadow: (t) => `0 0 0 7px ${t.palette.secondary.main}28`,
              },
              '& .MuiSlider-rail': { opacity: 0.3 },
            }}
          />
          <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
            Value: {sliderValue}
          </Typography>
        </Section>

        {/* ── TextField sx ───────────────────────────────────────────────── */}
        <Section label="TextField with sx slot targeting">
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <TextField label="Default" />
            <TextField
              label="borderRadius × 4 via sx"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            />
            <TextField label="Error state" error helperText="This field has an error" />
          </Stack>
        </Section>

        {/* ── Chip interactive ───────────────────────────────────────────── */}
        <Section label="Chips — toggled via sx color tokens">
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {['React', 'TypeScript', 'Emotion', 'MUI', 'styled()'].map((label) => {
              const active = chips.includes(label);
              return (
                <Chip
                  key={label}
                  label={label}
                  onClick={() => toggleChip(label)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    ...(active
                      ? { bgcolor: 'primary.main', color: 'primary.contrastText' }
                      : { bgcolor: 'action.hover' }),
                    '&:hover': { filter: 'brightness(0.95)' },
                  }}
                />
              );
            })}
          </Stack>
          <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.disabled' }}>
            Active: {chips.join(', ') || 'none'}
          </Typography>
        </Section>
      </Box>
    </ThemeProvider>
  );
}
