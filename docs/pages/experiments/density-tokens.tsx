'use client';
import * as React from 'react';
import { createTheme, ThemeProvider, enhanceDensity } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

// Density experiment — CSS-var adapter (docs/adr/0001-css-var-density-adapter.md).
// Button consumes `var(--_Button-padding*)`, resolved inline from a (variant,
// size) lookup through `var(--Button-<size>-prop, var(--Button-prop, <literal>))`.
// `enhanceDensity` wires `--Button-*` to the `--mui-density-*` scale.

const VARIANTS = ['text', 'outlined', 'contained'] as const;
const SIZES = ['small', 'medium', 'large'] as const;

const theme = enhanceDensity(createTheme({ cssVariables: true }));

function ButtonMatrix() {
  return (
    <Stack spacing={1.5}>
      {VARIANTS.map((variant) => (
        <Stack key={variant} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          {SIZES.map((size) => (
            <Button key={size} variant={variant} size={size}>
              {variant}/{size}
            </Button>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}

function Panel({
  title,
  caption,
  style,
  children,
}: {
  title: string;
  caption: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <Paper variant="outlined" sx={{ p: 2, flex: 1, minWidth: 320 }} style={style}>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        {caption}
      </Typography>
      {children}
    </Paper>
  );
}

export default function DensityTokens() {
  // --mui-density-* live retune (overrides the scale at this scope).
  const [densityXs, setDensityXs] = React.useState(6);
  const [densityLg, setDensityLg] = React.useState(16);
  // Per-token overrides (granular, base + sized).
  const [baseInline, setBaseInline] = React.useState('');
  const [smallInline, setSmallInline] = React.useState('');

  const densityScope: React.CSSProperties = {
    // Retunes every enhanced button without rebuilding the theme.
    ['--mui-density-xs' as any]: `${densityXs}px`,
    ['--mui-density-lg' as any]: `${densityLg}px`,
  };

  const tokenScope: React.CSSProperties = {
    ...(baseInline ? { ['--Button-paddingInline' as any]: baseInline } : null),
    ...(smallInline ? { ['--Button-small-paddingInline' as any]: smallInline } : null),
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head
        title="Density tokens experiment"
        description="CSS-var adapter density experiment for Button."
      />
      <Box sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom>
          Density tokens — CSS-var adapter
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Button padding is exposed as <code>--Button-paddingInline</code> /{' '}
          <code>--Button-paddingBlock</code> (base),{' '}
          <code>--Button-&lt;size&gt;-paddingInline</code> (sized, wins over base), with a
          literal-px fallback so the default is pixel-identical. <code>enhanceDensity</code> wires
          the base tokens to the <code>--mui-density-*</code> scale.
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <Panel
            title="Default (no overrides)"
            caption="Literal-px fallbacks — identical to today across every variant × size."
          >
            <ButtonMatrix />
          </Panel>
          <Panel
            title="enhanceDensity scale (live)"
            caption="Retuning --mui-density-* at this scope reflows all wired buttons. Sizes flatten to the base step."
            style={densityScope}
          >
            <ButtonMatrix />
          </Panel>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mb: 4 }}>
          <Stack spacing={3} sx={{ flex: 1, minWidth: 280 }}>
            <Typography variant="subtitle2">Density scale</Typography>
            <Box sx={{ width: '100%' }}>
              <Typography variant="caption">
                --mui-density-xs (base block): {densityXs}px
              </Typography>
              <Slider
                value={densityXs}
                min={0}
                max={24}
                onChange={(_, value) => setDensityXs(value as number)}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography variant="caption">
                --mui-density-lg (base inline): {densityLg}px
              </Typography>
              <Slider
                value={densityLg}
                min={0}
                max={48}
                onChange={(_, value) => setDensityLg(value as number)}
              />
            </Box>
          </Stack>

          <Divider orientation="vertical" flexItem />

          <Stack spacing={2} sx={{ flex: 1, minWidth: 280 }}>
            <Typography variant="subtitle2">Per-token override (granular)</Typography>
            <TextField
              label="--Button-paddingInline (base)"
              placeholder="e.g. 24px"
              size="small"
              value={baseInline}
              onChange={(event) => setBaseInline(event.target.value)}
            />
            <TextField
              label="--Button-small-paddingInline (sized, wins)"
              placeholder="e.g. 4px"
              size="small"
              value={smallInline}
              onChange={(event) => setSmallInline(event.target.value)}
            />
            <Paper variant="outlined" sx={{ p: 2 }} style={tokenScope}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Scoped preview
              </Typography>
              <ButtonMatrix />
            </Paper>
          </Stack>
        </Stack>

        <Typography variant="subtitle2" gutterBottom>
          enhanceDensity toggle
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked disabled />}
          label="enhanceDensity is applied to this page's theme (createTheme is untouched)."
        />
      </Box>
    </ThemeProvider>
  );
}
