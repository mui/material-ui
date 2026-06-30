'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button, { private_buttonVars } from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider, enhanceDensity, DENSITY_PRESETS } from '@mui/material/styles';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

const SCALE_KEYS = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
const PRESETS = ['unset', 'compact', 'normal', 'comfort'] as const;
const SIZES = ['small', 'medium', 'large'] as const;
const VARIANTS = ['text', 'outlined', 'contained'] as const;

type Preset = (typeof PRESETS)[number];
type Size = (typeof SIZES)[number];
type MappingKey = `${Size}Pad`;

const PRESET_LABEL: Record<Preset, string> = {
  unset: 'unset — no fn · today · 0-diff',
  compact: 'compact',
  normal: 'normal — default density scale',
  comfort: 'comfort',
};

// Canonical Button prefill (matches enhanceDensity's own assignment).
const PREFILL: Record<MappingKey, string> = {
  smallPad: 'xxs sm',
  mediumPad: 'xs lg',
  largePad: 'sm xl',
};

const buttonVar = (size: Size) => private_buttonVars[`${size}Pad` as MappingKey];

// Keys-only → density-var string. The validator guarantees each token ∈ SCALE_KEYS.
// 1 step → applies to all sides; 2 steps → `block inline`.
const stepsToVar = (input: string) =>
  input
    .trim()
    .split(/\s+/)
    .map((t) => `var(--mui-density-${t})`)
    .join(' ');

function validateMapping(input: string): { valid: boolean; error: string | null } {
  const tokens = input.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) {
    return { valid: false, error: 'enter 1–2 density steps' };
  }
  if (tokens.length > 2) {
    return { valid: false, error: 'max 2 steps (block inline)' };
  }
  const bad = tokens.find((t) => !(SCALE_KEYS as readonly string[]).includes(t));
  if (bad) {
    return { valid: false, error: `"${bad}" is not a density key` };
  }
  return { valid: true, error: null };
}

export default function DensityExperiment() {
  const [preset, setPreset] = React.useState<Preset>('unset');
  const [component] = React.useState('Button');
  const [mapping, setMapping] = React.useState<Record<MappingKey, string>>(PREFILL);

  const mappingEnabled = preset !== 'unset';

  const canvasTheme = React.useMemo(() => {
    if (preset === 'unset') {
      return createTheme({ cssVariables: true });
    }
    return enhanceDensity(createTheme({ cssVariables: true }), {
      scale: DENSITY_PRESETS[preset],
    });
  }, [preset]);

  const setField = (key: MappingKey, value: string) =>
    setMapping((m) => ({ ...m, [key]: value }));

  const resetMapping = () => setMapping(PREFILL);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Head title="Density — experiment" description="enhanceDensity preset × token mapping" />
      <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h5" component="h1">
          Density — experiment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Flip the preset · pick a component · remap its tokens to density steps
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* CONTROLS — outside the themed scope, so they don't pick up density. */}
        <Box
          component="aside"
          sx={{
            position: 'sticky',
            top: 0,
            alignSelf: 'flex-start',
            width: 320,
            flexShrink: 0,
            p: 3,
            borderRight: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <FormControl>
            <FormLabel id="preset-label">enhanceDensity preset</FormLabel>
            <RadioGroup
              aria-labelledby="preset-label"
              value={preset}
              onChange={(event) => setPreset(event.target.value as Preset)}
            >
              {PRESETS.map((p) => (
                <FormControlLabel
                  key={p}
                  value={p}
                  control={<Radio size="small" />}
                  label={PRESET_LABEL[p]}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth size="small">
            <FormLabel id="component-label" sx={{ mb: 0.5 }}>
              Component
            </FormLabel>
            <Select aria-labelledby="component-label" value={component} disabled>
              <MenuItem value="Button">Button</MenuItem>
            </Select>
          </FormControl>

          <Box component="section" sx={{ opacity: mappingEnabled ? 1 : 0.5 }}>
            <Typography component="h2" sx={{ fontWeight: 'medium', fontSize: 14 }}>
              Vars mapping · {component}
            </Typography>
            {!mappingEnabled && (
              <Typography variant="caption" color="text.secondary">
                ⓘ pick a preset to enable steps
              </Typography>
            )}
            <Stack spacing={1.5} sx={{ mt: 1.5 }}>
              {SIZES.map((size) => {
                const key = `${size}Pad` as MappingKey;
                const value = mapping[key];
                const { valid, error } = validateMapping(value);
                const showError = mappingEnabled && !valid;
                return (
                  <TextField
                    key={key}
                    size="small"
                    label={buttonVar(size)}
                    value={value}
                    disabled={!mappingEnabled}
                    error={showError}
                    helperText={showError ? error : ' '}
                    onChange={(event) => setField(key, event.target.value)}
                    slotProps={{ htmlInput: { 'data-mapping-field': key } }}
                  />
                );
              })}
            </Stack>
            <Button
              size="small"
              variant="outlined"
              onClick={resetMapping}
              disabled={!mappingEnabled}
              sx={{ mt: 1 }}
            >
              Reset mapping
            </Button>
          </Box>
        </Box>

        {/* CANVAS — wrapped in the density-enhanced theme. */}
        <ThemeProvider theme={canvasTheme}>
          <CssBaseline />
          <Box id="density-canvas" sx={{ p: 4, flexGrow: 1 }}>
            <Typography variant="overline" color="text.secondary">
              {component} (color=&quot;primary&quot;)
            </Typography>
            <Stack spacing={4} sx={{ mt: 1 }}>
              {SIZES.map((size) => {
                const key = `${size}Pad` as MappingKey;
                const { valid } = validateMapping(mapping[key]);
                // TO5/TO6: element-level token wins over the preset's styleOverride.
                // At `unset` (or invalid input) emit NO token → falls back to the
                // literal `--_pad` default (unset) or the preset's own mapping.
                const sx =
                  mappingEnabled && valid
                    ? { [buttonVar(size)]: stepsToVar(mapping[key]) }
                    : undefined;
                return (
                  <Box key={size} data-size-section={size}>
                    <Divider textAlign="left" sx={{ mb: 1.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {size}
                      </Typography>
                    </Divider>
                    <Stack direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center' }}>
                      {VARIANTS.map((variant) => (
                        <Button
                          key={variant}
                          variant={variant}
                          size={size}
                          color="primary"
                          sx={sx}
                          data-cell={`${variant}-${size}`}
                        >
                          {variant}
                        </Button>
                      ))}
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
