'use client';
import * as React from 'react';
import { createTheme, ThemeProvider, enhanceDensity } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

// Density experiment — CSS-var adapter (docs/adr/0001-css-var-density-adapter.md).
// Agnostic layer: Button consumes `var(--Button-pad, var(--_pad))`. Material UI
// layer sets the (variant, size) literal default `--_pad` and the built-in-size
// routing `--Button-pad: var(--Button-<size>-pad, var(--_pad))` in `variants`
// (custom sizes route inline). `enhanceDensity` wires the sized tokens to the
// `--mui-density-*` scale. OutlinedInput applies the same model block-only: the
// root routes `--OutlinedInput-padBlock`, the input inherits it.

const VARIANTS = ['text', 'outlined', 'contained'] as const;
const SIZES = ['small', 'medium', 'large'] as const;

const theme = enhanceDensity(createTheme({ cssVariables: true }));

function ButtonMatrix() {
  return (
    <Stack spacing={2}>
      {VARIANTS.map((variant) => (
        <Box key={variant}>
          <Typography variant="overline" color="text.secondary">
            {variant}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: 'wrap', alignItems: 'center' }}
          >
            {SIZES.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size}
              </Button>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

function OutlinedInputMatrix() {
  return (
    <Stack spacing={1.5}>
      {(['small', 'medium'] as const).map((size) => (
        <Stack
          key={size}
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: 'wrap', alignItems: 'flex-start' }}
        >
          <OutlinedInput size={size} placeholder={size} />
          <OutlinedInput size={size} placeholder="multiline" multiline />
          <OutlinedInput
            size={size}
            placeholder="adornment"
            startAdornment={<InputAdornment position="start">@</InputAdornment>}
          />
          <FormControl size={size}>
            <InputLabel>{`label ${size}`}</InputLabel>
            <OutlinedInput label={`label ${size}`} />
          </FormControl>
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
    <Paper variant="outlined" sx={{ p: 2, flex: 1, minWidth: 0 }} style={style}>
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
  // Per-token overrides (sized-only).
  const [smallPad, setSmallPad] = React.useState('');
  const [largePad, setLargePad] = React.useState('');
  // OutlinedInput block-density overrides.
  const [smallPadBlock, setSmallPadBlock] = React.useState('');
  const [mediumPadBlock, setMediumPadBlock] = React.useState('');

  const densityScope: React.CSSProperties = {
    // Retunes every enhanced button without rebuilding the theme.
    ['--mui-density-xs' as any]: `${densityXs}px`,
    ['--mui-density-lg' as any]: `${densityLg}px`,
  };

  const tokenScope: React.CSSProperties = {
    ...(smallPad ? { ['--Button-small-pad' as any]: smallPad } : null),
    ...(largePad ? { ['--Button-large-pad' as any]: largePad } : null),
  };

  const inputTokenScope: React.CSSProperties = {
    ...(smallPadBlock ? { ['--OutlinedInput-small-padBlock' as any]: smallPadBlock } : null),
    ...(mediumPadBlock ? { ['--OutlinedInput-medium-padBlock' as any]: mediumPadBlock } : null),
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head
        title="Density tokens experiment"
        description="CSS-var adapter density experiment for Button and OutlinedInput."
      />
      <Box sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom>
          Density tokens — CSS-var adapter
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          The agnostic layer consumes <code>--Button-pad</code>; the Material UI layer feeds it
          inline through the sized token <code>--Button-&lt;size&gt;-pad</code> over an internal
          literal default, so the default is pixel-identical. Resolution is sized-only (no all-sizes
          base token). <code>enhanceDensity</code> wires the sized tokens to the{' '}
          <code>--mui-density-*</code> scale.
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
            caption="Retuning --mui-density-* at this scope reflows all wired buttons. Each size keeps its own step."
            style={densityScope}
          >
            <ButtonMatrix />
          </Panel>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mb: 4 }}>
          <Stack spacing={3} sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2">Density scale</Typography>
            <Box sx={{ width: '100%' }}>
              <Typography variant="caption">
                --mui-density-xs (medium block): {densityXs}px
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
                --mui-density-lg (medium inline): {densityLg}px
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

          <Stack spacing={2} sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2">Per-token override (granular)</Typography>
            <TextField
              label="--Button-small-pad (sized)"
              placeholder="e.g. 2px 6px"
              size="small"
              value={smallPad}
              onChange={(event) => setSmallPad(event.target.value)}
            />
            <TextField
              label="--Button-large-pad (sized)"
              placeholder="e.g. 12px 28px"
              size="small"
              value={largePad}
              onChange={(event) => setLargePad(event.target.value)}
            />
            <Paper variant="outlined" sx={{ p: 2 }} style={tokenScope}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Scoped preview
              </Typography>
              <ButtonMatrix />
            </Paper>
          </Stack>
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>
          OutlinedInput — block density
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Input density is vertical only: the root routes the size-resolved{' '}
          <code>--OutlinedInput-padBlock</code> and the input inherits it; the{' '}
          <code>14px</code> inline gutter is constant. Set{' '}
          <code>--OutlinedInput-&lt;size&gt;-padBlock</code> to retune — it reflows the input
          (non-multiline) and the root (multiline) together, across adornments. The last column
          is a <code>FormControl + InputLabel + OutlinedInput</code>: <code>OutlinedInput</code>
          reaches its sibling label via <code>:has</code> and sets <code>--InputLabel-y</code> from
          the same token, so the resting label stays centered under override.
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <Panel title="Default" caption="Plain · multiline · adornment · InputLabel, per size.">
            <OutlinedInputMatrix />
          </Panel>
          <Panel
            title="Token override (scoped)"
            caption="--OutlinedInput-<size>-padBlock applied at this scope."
            style={inputTokenScope}
          >
            <OutlinedInputMatrix />
          </Panel>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <TextField
            label="--OutlinedInput-small-padBlock"
            placeholder="e.g. 4px"
            size="small"
            value={smallPadBlock}
            onChange={(event) => setSmallPadBlock(event.target.value)}
          />
          <TextField
            label="--OutlinedInput-medium-padBlock"
            placeholder="e.g. 24px"
            size="small"
            value={mediumPadBlock}
            onChange={(event) => setMediumPadBlock(event.target.value)}
          />
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
