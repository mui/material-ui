'use client';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button, { getButtonVars } from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

// Var-prefix experiment (docs/adr/0003-density-var-prefix.md). The PUBLIC token
// (the Material UI layer's designer knob) carries the prefix, which tracks the
// css-var feature: a theme with `cssVariables` resolves it to
// `--mui-Button-small-pad`; a plain `createTheme()` to bare `--Button-small-pad`.
// The agnostic seam (`--comp-pad`) and internal default (`--_pad`) are a separate,
// literal/unprefixed layer and aren't in `buttonVars`. The styled component AND
// the consumer both resolve the public token through the SAME `getButtonVars(theme)`,
// so emitted and targeted names can't drift. No `theme.vars.*`, no `getCssVar`.

const THEMES = [
  { id: 'plain', label: 'createTheme()', theme: createTheme() },
  {
    id: 'vars',
    label: 'createTheme({ cssVariables: true })',
    theme: createTheme({ cssVariables: true }),
  },
  {
    id: 'acme',
    label: "createTheme({ cssVariables: { cssVarPrefix: 'acme' } })",
    theme: createTheme({ cssVariables: { cssVarPrefix: 'acme' } }),
  },
];

const codeSx = {
  fontFamily: 'monospace',
  fontSize: 13,
  bgcolor: 'action.hover',
  px: 0.5,
  borderRadius: 0.5,
} as const;

function Column({ label, theme }: { label: string; theme: any }) {
  const [pad, setPad] = React.useState('2px 8px');
  // Consumer resolves the bare token name through the SAME resolver the
  // component uses — so this override targets exactly what the component reads.
  const v = getButtonVars(theme);
  const scope = { [v.smallPad]: pad } as React.CSSProperties;

  return (
    <Paper variant="outlined" sx={{ p: 2, flex: 1, minWidth: 0 }}>
      <Box component="code" sx={{ ...codeSx, display: 'block', mb: 1, whiteSpace: 'normal' }}>
        {label}
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
        getButtonVars(theme).smallPad →
      </Typography>
      <Chip
        size="small"
        color="primary"
        label={v.smallPad}
        sx={{ mb: 2, fontFamily: 'monospace' }}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack direction="row" spacing={2} alignItems="center">
          <div>
            <Typography variant="overline" display="block">
              default
            </Typography>
            <Button variant="contained" size="small">
              small
            </Button>
          </div>
          <Box style={scope}>
            <Typography variant="overline" display="block">
              overridden
            </Typography>
            <Button variant="contained" size="small">
              small
            </Button>
          </Box>
        </Stack>
      </ThemeProvider>
      <TextField
        label={`set ${v.smallPad}`}
        value={pad}
        onChange={(event) => setPad(event.target.value)}
        size="small"
        fullWidth
        sx={{ mt: 2 }}
      />
    </Paper>
  );
}

export default function DensityVarPrefix() {
  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Head
        title="Density var-prefix experiment"
        description="Prefixed density tokens whose prefix tracks the css-var feature, resolved by one shared helper."
      />
      <Typography variant="h4" gutterBottom>
        Density tokens — variable prefix
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        The <strong>public token</strong> (the designer knob) carries the prefix — but the prefix{' '}
        <strong>tracks the css-var feature</strong>. A theme made with{' '}
        <Box component="code" sx={codeSx}>
          cssVariables
        </Box>{' '}
        resolves it to{' '}
        <Box component="code" sx={codeSx}>
          --mui-Button-small-pad
        </Box>{' '}
        (or your custom prefix); a plain{' '}
        <Box component="code" sx={codeSx}>
          createTheme()
        </Box>{' '}
        to bare{' '}
        <Box component="code" sx={codeSx}>
          --Button-small-pad
        </Box>
        . The agnostic seam{' '}
        <Box component="code" sx={codeSx}>
          --comp-pad
        </Box>{' '}
        stays literal/unprefixed. The styled component and the consumer below both resolve the
        public token through the same{' '}
        <Box component="code" sx={codeSx}>
          getButtonVars(theme)
        </Box>
        , so the override always lands — in every mode.
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        {THEMES.map((t) => (
          <Column key={t.id} label={t.label} theme={t.theme} />
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        The whole consumer API
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        One import, one call. Bare names (usable as a custom-property key), resolved per theme,
        cached by prefix. No{' '}
        <Box component="code" sx={codeSx}>
          theme.vars.Button
        </Box>
        , no{' '}
        <Box component="code" sx={codeSx}>
          getCssVar
        </Box>
        .
      </Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box component="pre" sx={{ m: 0, fontSize: 13, overflow: 'auto' }}>
          {`import { getButtonVars } from '@mui/material/Button';

function Compact({ children }) {
  const theme = useTheme();
  const v = getButtonVars(theme);
  return <Box sx={{ [v.smallPad]: '2px 8px' }}>{children}</Box>;
}`}
        </Box>
      </Paper>
    </Box>
  );
}
