'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, enhanceDensity, DensityScale } from '@mui/material/styles';
import demos from 'docs/src/modules/components/densityDemos';

// Client-facing showcase for the CSS-var density adapter (docs/adr/0001).
// Three presets each map to one `enhanceDensity(theme, { scale })` call — the
// only knob is the 7-step density scale. Flip a preset -> the whole gallery
// reflows because every component pulls its sized tokens from `--mui-density-*`.

type PresetKey = 'compact' | 'normal' | 'comfort';

// `normal` = enhanceDensity defaults (theme.spacing) -> pixel-identical to today.
// compact/comfort override every step explicitly.
const presetScales: Record<PresetKey, Partial<DensityScale> | undefined> = {
  compact: {
    xxs: '2px',
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '18px',
    xxl: '24px',
  },
  normal: undefined,
  comfort: {
    xxs: '6px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '40px',
  },
};

const presetLabels: Record<PresetKey, string> = {
  compact: 'Compact',
  normal: 'Normal',
  comfort: 'Comfort',
};

const scaleKeys: (keyof DensityScale)[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

// Build the three enhanced themes once.
const baseTheme = createTheme({ cssVariables: true });
const themes: Record<PresetKey, ReturnType<typeof enhanceDensity>> = {
  compact: enhanceDensity(createTheme({ cssVariables: true }), { scale: presetScales.compact }),
  normal: enhanceDensity(createTheme({ cssVariables: true })),
  comfort: enhanceDensity(createTheme({ cssVariables: true }), { scale: presetScales.comfort }),
};

// Clean px readout for the scale. Under `cssVariables`, `theme.spacing()` returns
// a `calc(... var(--mui-spacing) ...)` string, so for the Normal preset we read
// the resolved px from a non-css-var theme instead.
const displayScales: Record<PresetKey, DensityScale> = {
  compact: presetScales.compact as DensityScale,
  normal: enhanceDensity(createTheme()).density,
  comfort: presetScales.comfort as DensityScale,
};

// Pull the density-var mappings enhanceDensity injected per component. Each
// component's `styleOverrides.root` is `[originalRoot, { '--Component-*': ... }]`;
// scan every plain-object element for the top-level `--*` token entries.
type VarMap = Record<string, string>;
function collectComponentVars(theme: ReturnType<typeof enhanceDensity>): Record<string, VarMap> {
  const out: Record<string, VarMap> = {};
  const components = (theme.components ?? {}) as Record<string, any>;
  Object.keys(components).forEach((name) => {
    if (name === 'MuiCssBaseline') {
      return;
    }
    const root = components[name]?.styleOverrides?.root;
    const elements = Array.isArray(root) ? root : [root];
    const vars: VarMap = {};
    elements.forEach((el) => {
      if (!el || typeof el !== 'object') {
        return;
      }
      Object.keys(el).forEach((key) => {
        if (key.startsWith('--')) {
          vars[key] = String(el[key]);
        }
      });
    });
    if (Object.keys(vars).length > 0) {
      out[name.replace(/^Mui/, '')] = vars;
    }
  });
  return out;
}

const componentVarsByPreset: Record<PresetKey, Record<string, VarMap>> = {
  compact: collectComponentVars(themes.compact),
  normal: collectComponentVars(themes.normal),
  comfort: collectComponentVars(themes.comfort),
};

const mono = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 12,
} as const;

// Outline every box inside a demo so the density effect (padding/height shifts)
// is visible at a glance. `outline` is drawn outside the box and takes no layout
// space, so toggling it never reflows the gallery — the geometry stays honest.
const demoOutlineSx = {
  '& *': {
    outline: '1px solid rgba(244, 67, 54, 0.5)',
    outlineOffset: '-1px',
  },
} as const;

function ScalePanel({ preset }: { preset: PresetKey }) {
  const scale = displayScales[preset];
  return (
    <div>
      <Typography variant="overline" color="text.secondary">
        Density scale
      </Typography>
      <Stack spacing={0.5} sx={{ mt: 0.5 }}>
        {scaleKeys.map((key) => (
          <Stack key={key} direction="row" sx={{ ...mono, justifyContent: 'space-between' }}>
            <Box component="span" sx={{ color: 'primary.main' }}>{`--mui-density-${key}`}</Box>
            <span>{scale[key]}</span>
          </Stack>
        ))}
      </Stack>
    </div>
  );
}

function VarsPanel({ preset }: { preset: PresetKey }) {
  const byComponent = componentVarsByPreset[preset];
  const names = Object.keys(byComponent);
  return (
    <div>
      <Typography variant="overline" color="text.secondary">
        Component tokens ({names.length})
      </Typography>
      <Box sx={{ mt: 0.5 }}>
        {names.map((name) => (
          <Accordion key={name} disableGutters square elevation={0} sx={{ bgcolor: 'transparent' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: 36, px: 0 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0 }}>
              <Stack spacing={1}>
                {Object.entries(byComponent[name]).map(([key, value]) => (
                  <Box key={key} sx={mono}>
                    <Box component="span" sx={{ color: 'primary.main' }}>
                      {key}
                    </Box>
                    {': '}
                    <Box component="span" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                      {value}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </div>
  );
}

export default function DensityShowcase() {
  const [preset, setPreset] = React.useState<PresetKey>('normal');
  const [outline, setOutline] = React.useState(false);

  return (
    // Outer shell uses the base theme; the gallery + sidebar readouts use the
    // enhanced theme so they reflect the active preset.
    <ThemeProvider theme={baseTheme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Paper
          square
          elevation={0}
          sx={{
            width: 400,
            flexShrink: 0,
            borderRight: '1px solid',
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            alignSelf: 'flex-start',
            height: '100vh',
            overflowY: 'auto',
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Density presets
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            One scale drives every component. Normal is pixel-identical to today.
          </Typography>
          <ToggleButtonGroup
            exclusive
            fullWidth
            size="small"
            color="primary"
            value={preset}
            onChange={(_, next) => next && setPreset(next)}
            sx={{ mb: 2 }}
          >
            {(Object.keys(presetLabels) as PresetKey[]).map((key) => (
              <ToggleButton key={key} value={key}>
                {presetLabels[key]}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={outline}
                onChange={(event) => setOutline(event.target.checked)}
              />
            }
            label="Outline demos"
            sx={{ mb: 2, display: 'flex' }}
          />
          <ScalePanel preset={preset} />
          <Divider sx={{ my: 2 }} />
          <VarsPanel preset={preset} />
        </Paper>

        <Box sx={{ flexGrow: 1, minWidth: 0, p: 3 }}>
          <ThemeProvider theme={themes[preset]}>
            <CssBaseline />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                gap: 2,
              }}
            >
              {Object.keys(demos).map((name) => (
                <Paper
                  key={name}
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 3,
                    overflow: 'auto',
                    bgcolor: 'background.paper',
                    breakInside: 'avoid',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1.5, color: 'text.secondary', fontFamily: mono.fontFamily }}
                  >
                    {name}
                  </Typography>
                  <Box sx={outline ? demoOutlineSx : undefined}>{demos[name]}</Box>
                </Paper>
              ))}
            </Box>
          </ThemeProvider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
