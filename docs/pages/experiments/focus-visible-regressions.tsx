'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';

// ─────────────────────────────────────────────────────────────────────────────
// Repro playground for LukasTy's "Still broken" items (PR #48743 review):
// 1. Switch track colors under theme.focusVisible (default checked 0.5 → 0.38,
//    vars-mode disabled 0.12 → 0.38).
// 2. Theme resolution reads back its own output (recompose, palette merge arg,
//    vars vs no-vars divergence on a focusVisible merge arg).
// ─────────────────────────────────────────────────────────────────────────────

const noRipple = { MuiButtonBase: { defaultProps: { disableRipple: true } } };

// Section 1 themes — distinct var prefixes so the two vars themes don't collide on :root.
const S1_THEMES: { key: string; label: string; theme: Theme }[] = [
  {
    key: 'novars-off',
    label: 'vars off · focusVisible off (baseline)',
    theme: createTheme({ cssVariables: false, components: noRipple }),
  },
  {
    key: 'novars-on',
    label: 'vars off · focusVisible ON',
    theme: createTheme({ cssVariables: false, focusVisible: true, components: noRipple }),
  },
  {
    key: 'vars-off',
    label: 'vars on · focusVisible off (baseline)',
    theme: createTheme({ cssVariables: { cssVarPrefix: 's1a' }, components: noRipple }),
  },
  {
    key: 'vars-on',
    label: 'vars on · focusVisible ON',
    theme: createTheme({
      cssVariables: { cssVarPrefix: 's1b' },
      focusVisible: true,
      components: noRipple,
    }),
  },
];

// Reads the track's computed background-color + opacity after transitions settle.
function TrackReadout({
  label,
  dep,
  children,
}: {
  label: string;
  dep: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [info, setInfo] = React.useState('…');
  React.useEffect(() => {
    const id = setTimeout(() => {
      const track = ref.current?.querySelector('.MuiSwitch-track');
      if (track) {
        const cs = getComputedStyle(track);
        setInfo(`bg ${cs.backgroundColor} · opacity ${cs.opacity}`);
      }
    }, 400);
    return () => clearTimeout(id);
  }, [dep]);
  return (
    <Stack spacing={0.25} sx={{ alignItems: 'center', width: 150 }}>
      <span ref={ref}>{children}</span>
      <Typography variant="caption" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontFamily: 'monospace', fontSize: 10, textAlign: 'center' }}
      >
        {info}
      </Typography>
    </Stack>
  );
}

function SwitchStates({ themeKey }: { themeKey: string }) {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
      {/* Switch's default color PROP is "primary" — the literal color="default" columns are the
          ones exercising the non-palette rules from the review claim. */}
      <TrackReadout label='color="default" unchecked' dep={themeKey}>
        <Switch color="default" />
      </TrackReadout>
      <TrackReadout label='color="default" checked' dep={themeKey}>
        <Switch color="default" defaultChecked />
      </TrackReadout>
      <TrackReadout label='color="default" checked + disabled' dep={themeKey}>
        <Switch color="default" defaultChecked disabled />
      </TrackReadout>
      <TrackReadout label="primary disabled" dep={themeKey}>
        <Switch disabled />
      </TrackReadout>
      <TrackReadout label="primary checked + disabled" dep={themeKey}>
        <Switch defaultChecked disabled />
      </TrackReadout>
      <TrackReadout label="primary checked" dep={themeKey}>
        <Switch defaultChecked />
      </TrackReadout>
    </Stack>
  );
}

// Section 2 — theme-resolution scenarios.
const recomposeBase = createTheme({
  cssVariables: { cssVarPrefix: 'rc' },
  colorSchemes: { light: true, dark: true },
  focusVisible: true,
  components: noRipple,
});
const recomposed = createTheme(recomposeBase, {});

const paletteMergeArg = createTheme(
  { cssVariables: false, focusVisible: true, components: noRipple },
  { palette: { primary: { main: '#e91e63' } } },
);

const dashedNoVars = createTheme(
  { cssVariables: false, focusVisible: true, components: noRipple },
  { focusVisible: { outlineStyle: 'dashed' } },
);
const dashedVars = createTheme(
  { cssVariables: { cssVarPrefix: 'dv' }, focusVisible: true, components: noRipple },
  { focusVisible: { outlineStyle: 'dashed' } },
);

// `theme.focusVisible` is typed `boolean | CSSProperties` — narrow to the object form.
function ring(theme: Theme): React.CSSProperties | undefined {
  return typeof theme.focusVisible === 'object' ? theme.focusVisible : undefined;
}

function JsonBlock({ data }: { data: unknown }) {
  return (
    <Box
      component="pre"
      sx={{
        m: 0,
        p: 1,
        borderRadius: 1,
        bgcolor: 'action.hover',
        fontSize: 11,
        overflowX: 'auto',
        whiteSpace: 'pre-wrap',
      }}
    >
      {JSON.stringify(data, null, 2)}
    </Box>
  );
}

function Scenario({
  title,
  claim,
  data,
  theme,
}: {
  title: string;
  claim: string;
  data: unknown;
  theme: Theme;
}) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        {claim}
      </Typography>
      <JsonBlock data={data} />
      <ThemeProvider theme={theme}>
        <Button variant="outlined" sx={{ mt: 1.5 }}>
          Tab to me
        </Button>
      </ThemeProvider>
    </Paper>
  );
}

export default function FocusVisibleRegressions() {
  return (
    <Box sx={{ maxWidth: 980, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        focusVisible regressions — review repro
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
        1. Switch track colors
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Light-mode expectations (from the baseline rows): unchecked <strong>0.38</strong> · checked{' '}
        <strong>0.5</strong> · disabled <strong>0.12</strong>. Claim: with focusVisible ON,{' '}
        <code>color=&quot;default&quot;</code> checked renders 0.38 (identical to unchecked), and in
        vars mode disabled / checked+disabled render 0.38 instead of 0.12. Compare each column
        against its baseline — the alpha is either in the <code>opacity</code> (baseline) or inside
        the <code>rgba()</code> background (focusVisible).
      </Typography>
      <Stack spacing={2}>
        {S1_THEMES.map(({ key, label, theme }) => (
          <Paper key={key} variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              {label}
            </Typography>
            <ThemeProvider theme={theme}>
              <SwitchStates themeKey={key} />
            </ThemeProvider>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        2. Theme resolution reads back its own output
      </Typography>
      <Stack spacing={2}>
        <Scenario
          title="a) Recompose a colorSchemes theme — createTheme(base, {})"
          claim="Claim: after recompose the ring color is a hardcoded light-primary (#1976d2) instead of the scheme-reactive palette var, so dark mode shows a light-blue ring while the dark palette is #90caf9."
          data={{
            'base.focusVisible.outlineColor': ring(recomposeBase)?.outlineColor,
            'recomposed.focusVisible.outlineColor': ring(recomposed)?.outlineColor,
            'recomposed dark palette primary': recomposed.colorSchemes?.dark?.palette.primary.main,
          }}
          theme={recomposed}
        />
        <Scenario
          title="b) Palette in a merge argument — createTheme({ focusVisible: true }, { palette })"
          claim="Claim: the ring resolves against the default palette before the merge argument applies, so the button turns pink but the ring stays #1976d2."
          data={{
            'palette.primary.main': paletteMergeArg.palette.primary.main,
            'focusVisible.outlineColor': ring(paletteMergeArg)?.outlineColor,
          }}
          theme={paletteMergeArg}
        />
        <Scenario
          title="c) focusVisible in a merge argument — vars vs no-vars"
          claim="Claim: extractFocusVisibleInput takes the LAST argument instead of deep-merging, and the two modes disagree — no-vars keeps outlineStyle: 'dashed', vars mode drops it. Same input, different ring."
          data={{
            'no-vars outlineStyle': ring(dashedNoVars)?.outlineStyle,
            'vars outlineStyle': ring(dashedVars)?.outlineStyle,
          }}
          theme={dashedVars}
        />
      </Stack>
    </Box>
  );
}
