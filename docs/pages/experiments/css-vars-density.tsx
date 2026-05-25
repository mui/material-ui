'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Public CSS variables + density POC.
// See CONTEXT.md, docs/adr/0002-agnostic-public-css-vars.md,
// docs/design/public-css-var-layering.md.
const theme = createTheme({ cssVariables: true });

// --- "Steel UI": an alternate design language built only from agnostic vars. ---
// Agnostic vars carry color / shape / elevation. They flatten across variants
// (overriding = opting out of the Material spec), so color is applied per button.
const steelVars = {
  '--Button-bg': '#3c6997',
  '--Button-color': '#ffffff',
  '--Button-radius': '12px',
  '--Button-shadow': 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -5px 8px rgba(15,32,56,0.40)',
  '--Button-padding-block': '5px',
  '--Button-padding-inline': '14px',
  '--Button-ring': '2px solid #2f5377',
} as const;

// No var exists for typographic identity — the loudest Material tells. Plain CSS.
const steelType = {
  textTransform: 'none',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  fontWeight: 500,
  letterSpacing: 'normal',
} as const;

// Per-variant agnostic color, parameterised by palette (Steel | Neutral).
const palettes = {
  Steel: { fill: '#3c6997', line: '#2f5377' },
  Neutral: { fill: '#6c757d', line: '#495057' },
} as const;
type PaletteKey = keyof typeof palettes;

const variantVars = (p: PaletteKey) => ({
  contained: {
    '--Button-bg': palettes[p].fill,
    '--Button-color': '#fff',
    '--Button-shadow': 'none',
    '&.Mui-disabled': {
      opacity: 0.5,
    },
  },
  outlined: {
    '--Button-border-color': palettes[p].line,
    '--Button-color': palettes[p].line,
    '&.Mui-disabled': {
      opacity: 0.5,
    },
  },
  text: {
    '--Button-color': palettes[p].line,
    '&.Mui-disabled': {
      opacity: 0.5,
    },
  },
});

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: 'block', mt: 1, maxWidth: 200 }}
    >
      {children}
    </Typography>
  );
}

function fmt(obj: Record<string, string | number>) {
  return Object.entries(obj)
    .map(
      ([k, v]) =>
        `  ${k.startsWith('--') ? `'${k}'` : k}: ${typeof v === 'string' ? `'${v}'` : v},`,
    )
    .join('\n');
}

// Renders the exact objects applied below — auditable, cannot drift from what renders.
function CodeBlock() {
  return (
    <Box
      component="pre"
      sx={{
        m: 0,
        p: 2,
        bgcolor: 'grey.900',
        color: 'grey.100',
        borderRadius: 1,
        fontSize: 12,
        lineHeight: 1.6,
        overflow: 'auto',
      }}
    >
      {`sx={{
  // agnostic vars — color / shape / elevation
${fmt(steelVars)}
  // no var yet — raw CSS for type
${fmt(steelType)}
}}`}
    </Box>
  );
}

function Scope({ title, sx, children }: { title: string; sx?: object; children: React.ReactNode }) {
  return (
    <Box sx={{ p: 3, border: '1px dashed', borderColor: 'divider', borderRadius: 1, ...sx }}>
      <Typography variant="overline" color="text.secondary">
        {title}
      </Typography>
      <Box sx={{ mt: 1 }}>{children}</Box>
    </Box>
  );
}

function Controls() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="contained" size="small">
          Small
        </Button>
        <Button variant="contained">Medium</Button>
        <Button variant="contained" size="large">
          Large
        </Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Stack>
      <Stack direction="row" spacing={2} useFlexGap sx={{ alignItems: 'start', flexWrap: 'wrap' }}>
        <TextField label="Outlined" defaultValue="Value" />
        <TextField label="Small" size="small" defaultValue="Value" />
      </Stack>
    </Stack>
  );
}

// Matrix: one palette × {contained, outlined, text} × {enabled, disabled}.
function MatrixGroup({ palette }: { palette: PaletteKey }) {
  const vv = variantVars(palette);
  const row = (disabled: boolean) => (
    <Stack
      direction="row"
      spacing={2}
      useFlexGap
      sx={{
        alignItems: 'center',
        flexWrap: 'wrap',
        '--Button-radius': '8px',
        '--Button-ring': '2px solid #2f5377',
        ...steelType,
      }}
    >
      <Button variant="contained" disableRipple disabled={disabled} sx={vv.contained}>
        Label
      </Button>
      <Button variant="outlined" disableRipple disabled={disabled} sx={vv.outlined}>
        Label
      </Button>
      <Button variant="text" disableRipple disabled={disabled} sx={vv.text}>
        Label
      </Button>
    </Stack>
  );
  return (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2">{palette}</Typography>
      {row(false)}
      {row(true)}
      <Caption>
        Disabled (2nd row) keeps the custom color — an agnostic var opts that property out of the
        spec in <i>every</i> state, so the default disabled grey-out is gone too (ADR-0002). The
        cue is now yours: here we re-add one with <code>&.Mui-disabled</code> opacity 0.5.
      </Caption>
    </Stack>
  );
}

export default function App() {
  const [spacing, setSpacing] = React.useState(8);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4, display: 'grid', gap: 4, maxWidth: 860 }}>
        <div>
          <Typography variant="h5">Agnostic CSS variables — leaving Material Design</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            One agnostic var per property (no variant/size/color in the name). Overriding opts that
            property out of the spec — so the same Button can host a different design language.
          </Typography>
        </div>

        {/* === HERO: static triptych — what we escaped, what vars carry, what raw CSS finishes === */}
        <Scope title="Stock Material → vars only → finished 'Steel UI'">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
              gap: 3,
              alignItems: 'start',
            }}
          >
            <div>
              <Button variant="contained">Label</Button>
              <Caption>
                <b>Stock Material.</b> Uppercase, Roboto, MD blue, 4px radius — what MUI ships.
              </Caption>
            </div>
            <div>
              <Button variant="contained" sx={steelVars}>
                Label
              </Button>
              <Caption>
                <b>Agnostic vars only.</b> Steel-blue, rounded, custom shadow + focus ring (tab to
                see) — but still UPPERCASE Roboto and still ripples. Vars carry
                color/shape/elevation; type & behaviour are the gap.
              </Caption>
            </div>
            <div>
              <Button variant="contained" disableRipple sx={{ ...steelVars, ...steelType }}>
                Label
              </Button>
              <Caption>
                <b>+ raw-CSS type & disableRipple.</b> No var for type or ripple → plain CSS + a
                prop. No longer Material.
              </Caption>
            </div>
          </Box>
          <Box sx={{ mt: 3 }}>
            <CodeBlock />
          </Box>
        </Scope>

        {/* === Matrix: Steel UI as a coherent system across variants + palettes === */}
        <Scope title="'Steel UI' across variants & palettes (same vars, per-variant color)">
          <Stack spacing={3}>
            <MatrixGroup palette="Steel" />
            <MatrixGroup palette="Neutral" />
          </Stack>
        </Scope>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Everyday knobs — the same vars for small tweaks
        </Typography>

        {/* --- Fine-grained per-component knobs --- */}
        <Scope title="Per-component knobs">
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            sx={{ alignItems: 'center', flexWrap: 'wrap' }}
          >
            <Button variant="contained" sx={{ '--Button-padding-block': '2px' }}>
              --Button-padding-block: 2px
            </Button>
            <Button variant="outlined" sx={{ '--Button-padding-inline': '40px' }}>
              --Button-padding-inline: 40px
            </Button>
            <TextField
              label="--TextField-height: 64px"
              defaultValue="Value"
              sx={{ '--TextField-height': '64px' }}
            />
            <TextField
              label="--InputBase-line-height: 2"
              defaultValue="Value"
              sx={{ '--InputBase-line-height': '2' }}
            />
          </Stack>
        </Scope>

        {/* --- Responsive typography --- */}
        <Scope
          title="Responsive font-size — 1rem mobile, 0.875rem desktop (≥900px). Resize to see."
          sx={{
            '--Button-font-size': '1rem',
            '--TextField-font-size': '1rem',
            '@media (min-width:900px)': {
              '--Button-font-size': '0.875rem',
              '--TextField-font-size': '0.875rem',
            },
          }}
        >
          <Controls />
        </Scope>

        {/* --- Color knobs --- */}
        <Scope title="Color knobs — --Button-radius scopes all; --Button-bg/color are per-button">
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            sx={{ alignItems: 'center', flexWrap: 'wrap', '--Button-radius': '16px' }}
          >
            <Button variant="contained">Rounded (scope)</Button>
            <Button variant="contained" sx={{ '--Button-bg': 'tomato' }}>
              --Button-bg: tomato
            </Button>
            <Button variant="outlined" sx={{ '--Button-border-color': 'rebeccapurple' }}>
              --Button-border-color
            </Button>
            <Button variant="outlined" sx={{ '--Button-border-width': '3px' }}>
              --Button-border-width: 3px
            </Button>
            <Button variant="text" sx={{ '--Button-color': 'seagreen' }}>
              --Button-color
            </Button>
            <Button variant="contained" sx={{ '--Button-shadow': '0 4px 12px rgba(0,0,0,0.4)' }}>
              --Button-shadow
            </Button>
            <Button
              disableRipple
              variant="outlined"
              sx={{ '--Button-ring': '2px solid dodgerblue' }}
            >
              --Button-ring (tab to focus)
            </Button>
          </Stack>
        </Scope>

        {/* --- TextField knobs (partial escape) --- */}
        <Scope title="TextField knobs — border/radius/color (focus still thickens to 2px default)">
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            sx={{ alignItems: 'start', flexWrap: 'wrap' }}
          >
            <TextField
              label="--TextField-radius: 16px"
              defaultValue="Value"
              sx={{ '--TextField-radius': '16px' }}
            />
            <TextField
              label="--TextField-border-width: 2px"
              defaultValue="Value"
              sx={{ '--TextField-border-width': '2px' }}
            />
            <TextField
              label="--TextField-border-color"
              defaultValue="Value"
              sx={{ '--TextField-border-color': 'rebeccapurple' }}
            />
            <TextField
              label="--TextField-color"
              defaultValue="Value"
              sx={{ '--TextField-color': 'seagreen' }}
            />
          </Stack>
          <Caption>
            Partial escape: color/border/radius leave the spec, but the notched outline + floating
            label are structural — still Material. Full structural escape needs future vars.
          </Caption>
        </Scope>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Density — a different axis (one --mui-spacing dial)
        </Typography>

        {/* --- Different Apps: drive --mui-spacing live --- */}
        <Box sx={{ px: 1 }}>
          <Typography variant="overline" color="text.secondary">
            {`App density — --mui-spacing: ${spacing}px`}
          </Typography>
          <Slider
            value={spacing}
            onChange={(_, value) => setSpacing(value as number)}
            min={4}
            max={12}
            step={1}
            marks
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}px`}
          />
        </Box>
        <Scope title="Controls" sx={{ '--mui-spacing': `${spacing}px` }}>
          <Controls />
        </Scope>

        {/* --- Different Viewports --- */}
        <Scope
          title="Viewport — --mui-spacing: 6px below 900px (resize to see)"
          sx={{ '@media (max-width:900px)': { '--mui-spacing': '6px' } }}
        >
          <Controls />
        </Scope>
      </Box>
    </ThemeProvider>
  );
}
