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

// Active preset's 7-step scale in px (for the legend + live preview).
// compact/comfort = explicit; `normal` = spacing-derived (unit 8px = enhanceDensity default).
const NORMAL_MULTIPLIER: Record<(typeof SCALE_KEYS)[number], number> = {
  xxs: 0.5,
  xs: 0.75,
  sm: 1,
  md: 1.5,
  lg: 2,
  xl: 3,
  xxl: 4,
};
const SPACING_UNIT = 8;

function presetScalePx(preset: Preset): Record<string, string> | null {
  if (preset === 'unset') {
    return null;
  }
  if (preset === 'normal') {
    return Object.fromEntries(
      SCALE_KEYS.map((k) => [k, `${NORMAL_MULTIPLIER[k] * SPACING_UNIT}px`]),
    );
  }
  return (DENSITY_PRESETS[preset] ?? {}) as Record<string, string>;
}

// Resolved var string + px for a valid mapping value under the active scale —
// e.g. `md` → { varStr: 'var(--mui-density-md)', px: '8px' } (compact).
function resolvePreview(value: string, scalePx: Record<string, string> | null) {
  const tokens = value.trim().split(/\s+/).filter(Boolean);
  return { varStr: stepsToVar(value), px: scalePx ? tokens.map((t) => scalePx[t]).join(' ') : '' };
}

// ---------------------------------------------------------------------------
// Density-component registry. Only Button is de-prefixed/wired in this
// prototype; add entries here as more families gain a static `private_*Vars`
// map — the dropdown, canvas and mapping controls all iterate this registry.
// ---------------------------------------------------------------------------
interface DensityField {
  key: string; // mapping-state key, e.g. 'smallPad'
  cssVar: string; // e.g. '--Button-small-pad'
}
interface DensityComponentDef {
  canvasLabel: string;
  fields: DensityField[];
  prefill: Record<string, string>;
  renderMatrix: (args: { mapping: Record<string, string>; mappingEnabled: boolean }) => React.ReactNode;
}

function ButtonMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  return (
    <Stack spacing={4} sx={{ mt: 1 }}>
      {SIZES.map((size) => {
        const key = `${size}Pad`;
        const { valid } = validateMapping(mapping[key] ?? '');
        // TO5/TO6: element-level token wins over the preset's styleOverride.
        // At `unset` (or invalid input) emit NO token → falls back to the literal
        // `--_pad` default (unset) or the preset's own mapping.
        const sx = mappingEnabled && valid ? { [buttonVar(size)]: stepsToVar(mapping[key]) } : undefined;
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
  );
}

const COMPONENT_DEFS = {
  Button: {
    canvasLabel: 'Button (color="primary")',
    // Canonical prefill matches enhanceDensity's own Button assignment.
    fields: SIZES.map((size) => ({ key: `${size}Pad`, cssVar: buttonVar(size) })),
    prefill: { smallPad: 'xxs sm', mediumPad: 'xs lg', largePad: 'sm xl' },
    renderMatrix: (args) => <ButtonMatrix {...args} />,
  },
} satisfies Record<string, DensityComponentDef>;

type ComponentName = keyof typeof COMPONENT_DEFS;
type Selection = 'All' | ComponentName;

const COMPONENTS = Object.keys(COMPONENT_DEFS) as ComponentName[];

const initialMapping = () =>
  Object.fromEntries(COMPONENTS.map((c) => [c, { ...COMPONENT_DEFS[c].prefill }])) as unknown as Record<
    ComponentName,
    Record<string, string>
  >;

export default function DensityExperiment() {
  const [preset, setPreset] = React.useState<Preset>('unset');
  const [selection, setSelection] = React.useState<Selection>('All');
  const [mapping, setMapping] = React.useState<Record<ComponentName, Record<string, string>>>(
    initialMapping,
  );

  const mappingEnabled = preset !== 'unset';
  const scalePx = presetScalePx(preset);
  const visibleComponents: ComponentName[] = selection === 'All' ? COMPONENTS : [selection];

  const canvasTheme = React.useMemo(() => {
    if (preset === 'unset') {
      return createTheme({ cssVariables: true });
    }
    return enhanceDensity(createTheme({ cssVariables: true }), {
      scale: DENSITY_PRESETS[preset],
    });
  }, [preset]);

  const setField = (comp: ComponentName, key: string, value: string) =>
    setMapping((m) => ({ ...m, [comp]: { ...m[comp], [key]: value } }));

  const resetMapping = () => setMapping(initialMapping());

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
            <Select
              aria-labelledby="component-label"
              value={selection}
              onChange={(event) => setSelection(event.target.value as Selection)}
              slotProps={{ input: { 'data-component-select': true } as Record<string, unknown> }}
            >
              <MenuItem value="All">All</MenuItem>
              {COMPONENTS.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box component="section" sx={{ opacity: mappingEnabled ? 1 : 0.5 }}>
            <Typography component="h2" sx={{ fontWeight: 'medium', fontSize: 14 }}>
              Vars mapping
            </Typography>
            {!mappingEnabled && (
              <Typography variant="caption" color="text.secondary">
                ⓘ pick a preset to enable steps
              </Typography>
            )}
            {mappingEnabled && scalePx && (
              <Typography
                variant="caption"
                color="text.secondary"
                component="p"
                data-legend
                sx={{ mt: 0.5 }}
              >
                {SCALE_KEYS.map((k) => `${k}=${scalePx[k]}`).join(' · ')}
              </Typography>
            )}
            {/* Single datalist shared by all fields — key typeahead. */}
            <Box component="datalist" id="density-keys" sx={{ display: 'none' }}>
              {SCALE_KEYS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </Box>
            {visibleComponents.map((comp) => (
              <Box key={comp} sx={{ mt: 2 }} data-mapping-group={comp}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                  {comp}
                </Typography>
                <Stack spacing={1.5} sx={{ mt: 1 }}>
                  {COMPONENT_DEFS[comp].fields.map((field) => {
                    const value = mapping[comp][field.key] ?? '';
                    const { valid, error } = validateMapping(value);
                    const showError = mappingEnabled && !valid;
                    const preview = resolvePreview(value, scalePx);
                    let helper = ' ';
                    if (showError) {
                      helper = error ?? ' ';
                    } else if (mappingEnabled && valid) {
                      helper = `${value.trim()} → ${preview.varStr} = ${preview.px}`;
                    }
                    return (
                      <TextField
                        key={field.key}
                        size="small"
                        label={field.cssVar}
                        value={value}
                        disabled={!mappingEnabled}
                        error={showError}
                        helperText={helper}
                        onChange={(event) => setField(comp, field.key, event.target.value)}
                        slotProps={{
                          htmlInput: {
                            'data-mapping-field': `${comp}-${field.key}`,
                            list: 'density-keys',
                          },
                        }}
                      />
                    );
                  })}
                </Stack>
              </Box>
            ))}
            <Button
              size="small"
              variant="outlined"
              onClick={resetMapping}
              disabled={!mappingEnabled}
              sx={{ mt: 2 }}
            >
              Reset mapping
            </Button>
          </Box>
        </Box>

        {/* CANVAS — wrapped in the density-enhanced theme. */}
        <ThemeProvider theme={canvasTheme}>
          <CssBaseline />
          <Box id="density-canvas" sx={{ p: 4, flexGrow: 1 }}>
            <Stack spacing={6}>
              {visibleComponents.map((comp) => (
                <Box key={comp} data-canvas-component={comp}>
                  <Typography variant="overline" color="text.secondary">
                    {COMPONENT_DEFS[comp].canvasLabel}
                  </Typography>
                  {COMPONENT_DEFS[comp].renderMatrix({ mapping: mapping[comp], mappingEnabled })}
                </Box>
              ))}
            </Stack>
          </Box>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
