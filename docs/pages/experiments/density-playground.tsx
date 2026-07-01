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
import MenuItem, { private_menuItemVars } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import PaddingIcon from '@mui/icons-material/Padding';
import TitleIcon from '@mui/icons-material/Title';
import {
  createTheme,
  ThemeProvider,
  enhanceCompactDensity,
  enhanceNormalDensity,
  enhanceComfortDensity,
} from '@mui/material/styles';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

const SCALE_KEYS = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
const PRESETS = ['unset', 'compact', 'normal', 'comfort'] as const;
const SIZES = ['small', 'medium', 'large'] as const;
const VARIANTS = ['text', 'outlined', 'contained'] as const;

type Preset = (typeof PRESETS)[number];
type Size = (typeof SIZES)[number];
type MappingKey = `${Size}Pad`;

// Visual-debug overlays, toggled by `data-debug-*` on the canvas. Pure CSS,
// layout-safe (absolute ::before + pointer-events:none), never touches the
// components' real styles. The label span sits above the padding overlay
// (z-index) so text stays crisp; its blue fill only shows in text mode.
const DEBUG_SX = {
  '& .density-debug-text': { position: 'relative', zIndex: 1, borderRadius: '2px' },
  '&[data-debug-padding] .MuiButtonBase-root': { position: 'relative' },
  '&[data-debug-padding] .MuiButtonBase-root::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    // `inset:0` sizes the overlay to the button's padding-box; `padding:inherit`
    // then shrinks its content-box to the button's content box, and the
    // `exclude` mask knocks that center out → green fills only the padding ring.
    padding: 'inherit',
    boxSizing: 'border-box',
    borderRadius: 'inherit',
    backgroundColor: 'rgba(46, 204, 64, 0.5)', // padding = green (DevTools convention)
    pointerEvents: 'none',
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    maskComposite: 'exclude',
  },
  '&[data-debug-text] .density-debug-text': {
    backgroundColor: 'rgba(0, 116, 217, 0.32)', // text box = blue
  },
} as const;

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

// Each preset maps to its `enhance*Density` fn; `unset` applies none.
const PRESET_FN = {
  compact: enhanceCompactDensity,
  normal: enhanceNormalDensity,
  comfort: enhanceComfortDensity,
} as const;

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
                  <span className="density-debug-text">{variant}</span>
                </Button>
              ))}
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
}

// MenuItem's density tokens (single-value each), keyed by the `dense` axis
// rather than Button's small/medium/large. Field key === mapping-state key.
const MENUITEM_FIELDS: DensityField[] = [
  { key: 'minHeight', cssVar: private_menuItemVars.minHeight },
  { key: 'blockPad', cssVar: private_menuItemVars.blockPad },
  { key: 'inlinePad', cssVar: private_menuItemVars.inlinePad },
  { key: 'denseMinHeight', cssVar: private_menuItemVars.denseMinHeight },
  { key: 'denseBlockPad', cssVar: private_menuItemVars.denseBlockPad },
  { key: 'denseInlinePad', cssVar: private_menuItemVars.denseInlinePad },
];

function MenuItemMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  // Element-level tokens win over the preset's styleOverride, so set every valid
  // token on each item (regular items read the plain tokens, dense read the
  // `dense-*` ones — the unused set is inert). At `unset`/invalid emit none →
  // falls back to the literal defaults / preset mapping.
  const itemSx = mappingEnabled
    ? Object.fromEntries(
        MENUITEM_FIELDS.filter((f) => validateMapping(mapping[f.key] ?? '').valid).map((f) => [
          f.cssVar,
          stepsToVar(mapping[f.key]),
        ]),
      )
    : undefined;
  return (
    <MenuList sx={{ mt: 1, width: 240, border: '1px solid', borderColor: 'divider' }}>
      <MenuItem sx={itemSx}>Default item</MenuItem>
      <MenuItem selected sx={itemSx}>
        Selected item
      </MenuItem>
      <MenuItem sx={itemSx}>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>With icon</ListItemText>
      </MenuItem>
      <MenuItem divider sx={itemSx}>
        With divider
      </MenuItem>
      <MenuItem dense sx={itemSx}>
        Dense item
      </MenuItem>
      <MenuItem dense sx={itemSx}>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Dense + icon</ListItemText>
      </MenuItem>
    </MenuList>
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
  MenuItem: {
    canvasLabel: 'MenuItem (default + dense)',
    fields: MENUITEM_FIELDS,
    // Canonical prefill matches enhanceDensity's own MuiMenuItem assignment.
    prefill: {
      minHeight: 'xl',
      blockPad: 'xs',
      inlinePad: 'lg',
      denseMinHeight: 'lg',
      denseBlockPad: 'xxs',
      denseInlinePad: 'md',
    },
    renderMatrix: (args) => <MenuItemMatrix {...args} />,
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
  const [debug, setDebug] = React.useState<string[]>([]);
  const [mapping, setMapping] = React.useState<Record<ComponentName, Record<string, string>>>(
    initialMapping,
  );

  const mappingEnabled = preset !== 'unset';
  const visibleComponents: ComponentName[] = selection === 'All' ? COMPONENTS : [selection];

  const canvasTheme = React.useMemo(() => {
    const base = createTheme({ cssVariables: true });
    return preset === 'unset' ? base : PRESET_FN[preset](base);
  }, [preset]);

  // Active scale in px straight off the enhanced theme — single source of truth
  // for the legend + preview, so it can't drift from what the preset applied.
  const scalePx =
    preset === 'unset'
      ? null
      : (canvasTheme as unknown as { density: Record<string, string> }).density;

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
                      helper = preview.px;
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

        {/* RIGHT COLUMN — debug toolbar (plain theme) + themed canvas. */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              px: 4,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="overline" color="text.secondary">
              Visual debug
            </Typography>
            <ToggleButtonGroup
              size="small"
              value={debug}
              onChange={(_event, next: string[]) => setDebug(next)}
              aria-label="visual debug overlays"
            >
              <ToggleButton value="padding" aria-label="highlight padding" data-debug-toggle="padding">
                <Tooltip title="Padding highlight">
                  <PaddingIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="text" aria-label="highlight text box" data-debug-toggle="text">
                <Tooltip title="Text bounding box">
                  <TitleIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* CANVAS — wrapped in the density-enhanced theme. */}
          <ThemeProvider theme={canvasTheme}>
            <CssBaseline />
            <Box
              id="density-canvas"
              data-debug-padding={debug.includes('padding') ? '' : undefined}
              data-debug-text={debug.includes('text') ? '' : undefined}
              sx={{ p: 4, flexGrow: 1, ...DEBUG_SX }}
            >
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
    </Box>
  );
}
