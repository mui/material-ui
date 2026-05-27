'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, type Theme } from '@mui/material/styles';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';

// Agnostic variables experiment.
// Two themes target the SAME look. Left re-fights Material in every variant ×
// state via styleOverrides; right sets one agnostic var per property and lets
// the component honor it in every state. See CONTEXT.md + docs/adr/0002.
const BLUE = '#2C6CA3';

const beforeTheme = createTheme({
  cssVariables: {
    nativeColor: true,
    colorSchemeSelector: 'data-mui-color-scheme',
    cssVarPrefix: 'demo1',
  },
  colorSchemes: {
    light: {
      palette: { primary: { main: BLUE } },
    },
    dark: {
      palette: { primary: { main: BLUE } },
    },
  },
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 6,
          '&.Mui-focusVisible': { outline: `2px solid ${BLUE}` },
          '&.Mui-disabled': { opacity: 0.4 },
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: ({ theme }: { theme: Theme }) => ({
            color: (theme.vars || theme).palette.text.primary,
            borderColor: (theme.vars || theme).palette.divider,
            '@media (hover:hover)': {
              '&:hover': {
                backgroundColor: (theme.vars || theme).palette.action.hover,
                borderColor: (theme.vars || theme).palette.divider,
              },
            },
            '&:active': { backgroundColor: (theme.vars || theme).palette.action.selected },
            '&.Mui-disabled': {
              color: (theme.vars || theme).palette.text.primary,
              borderColor: (theme.vars || theme).palette.divider,
            },
          }),
        },
        {
          props: { variant: 'text' },
          style: ({ theme }: { theme: Theme }) => ({
            color: (theme.vars || theme).palette.text.primary,
            '@media (hover:hover)': {
              '&:hover': { backgroundColor: (theme.vars || theme).palette.action.hover },
            },
            '&:active': { backgroundColor: (theme.vars || theme).palette.action.selected },
            '&.Mui-disabled': { color: (theme.vars || theme).palette.text.primary },
          }),
        },
        {
          props: { variant: 'contained' },
          style: ({ theme }: { theme: Theme }) => ({
            backgroundColor: (theme.vars || theme).palette.primary.main,
            color: (theme.vars || theme).palette.primary.contrastText,
            '@media (hover:hover)': {
              '&:hover': {
                backgroundColor: theme.darken((theme.vars || theme).palette.primary.main, 0.15),
              },
            },
            '&:active': {
              backgroundColor: theme.darken((theme.vars || theme).palette.primary.main, 0.3),
            },
            '&.Mui-disabled': {
              backgroundColor: (theme.vars || theme).palette.primary.main,
              color: (theme.vars || theme).palette.primary.contrastText,
            },
          }),
        },
      ],
    },
  },
});

const afterTheme = createTheme({
  cssVariables: {
    nativeColor: true,
    colorSchemeSelector: 'data-mui-color-scheme',
    cssVarPrefix: 'demo2',
  },
  colorSchemes: {
    light: {
      palette: { primary: { main: BLUE } },
    },
    dark: {
      palette: { primary: { main: BLUE } },
    },
  },
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          '--Button-radius': '6px',
          '--Button-ring': `2px solid ${BLUE}`,
          '&.Mui-disabled': { opacity: 0.4 },
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: ({ theme }: { theme: Theme }) => ({
            '--Button-color': (theme.vars || theme).palette.text.primary,
            '--Button-border-color': (theme.vars || theme).palette.divider,
            '@media (hover:hover)': {
              '&:hover': { '--Button-bg': (theme.vars || theme).palette.action.hover },
            },
            '&:active': { '--Button-bg': (theme.vars || theme).palette.action.selected },
          }),
        },
        {
          props: { variant: 'text' },
          style: ({ theme }: { theme: Theme }) => ({
            '--Button-color': (theme.vars || theme).palette.text.primary,
            '@media (hover:hover)': {
              '&:hover': { '--Button-bg': (theme.vars || theme).palette.action.hover },
            },
            '&:active': { '--Button-bg': (theme.vars || theme).palette.action.selected },
          }),
        },
        {
          props: { variant: 'contained' },
          style: ({ theme }: { theme: Theme }) => ({
            '--Button-bg': (theme.vars || theme).palette.primary.main,
            '--Button-color': (theme.vars || theme).palette.primary.contrastText,
            '@media (hover:hover)': {
              '&:hover': {
                '--Button-bg': theme.darken((theme.vars || theme).palette.primary.main, 0.15),
              },
            },
            '&:active': {
              '--Button-bg': theme.darken((theme.vars || theme).palette.primary.main, 0.3),
            },
          }),
        },
      ],
    },
  },
});

// Stock Material — no component overrides. The reference look.
const materialTheme = createTheme({
  cssVariables: {
    nativeColor: true,
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  colorSchemes: {
    light: { palette: { primary: { main: BLUE } } },
    dark: { palette: { primary: { main: BLUE } } },
  },
});

// Root-only agnostic vars → the same component takes a different shape: a soft,
// pill baseline. Geometry, density, elevation, font-size, and the ring all come
// from vars, flattened across every variant; colors follow the teal palette.
const TEAL = '#0F766E';
const baselineTheme = createTheme({
  cssVariables: {
    nativeColor: true,
    colorSchemeSelector: 'data-mui-color-scheme',
    cssVarPrefix: 'demo4',
  },
  colorSchemes: {
    light: { palette: { primary: { main: TEAL } } },
    dark: { palette: { primary: { main: TEAL } } },
  },
  components: {
    MuiButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          '--Button-radius': '999px',
          '--Button-padding-block': '10px',
          '--Button-padding-inline': '24px',
          '--Button-font-size': '0.9375rem',
          '--Button-border-width': '1.5px',
          '--Button-shadow': 'none',
          '--Button-ring': `3px solid ${theme.alpha((theme.vars || theme).palette.primary.main, 0.35)}`,
        }),
      },
    },
  },
});

const baselineCode = `MuiButton: {
  defaultProps: { disableRipple: true },
  styleOverrides: {
    root: ({ theme }) => ({
      '--Button-radius': '999px',
      '--Button-padding-block': '10px',
      '--Button-padding-inline': '24px',
      '--Button-font-size': '0.9375rem',
      '--Button-border-width': '1.5px',
      '--Button-shadow': 'none',
      '--Button-ring': \`3px solid \${theme.alpha(theme.palette.primary.main, 0.35)}\`,
    }),
  },
}`;

const beforeCode = `MuiButton: {
  defaultProps: { disableElevation: true },
  styleOverrides: {
    root: {
      textTransform: 'none',
      fontWeight: 600,
      borderRadius: 6,
      '&.Mui-focusVisible': { outline: '2px solid #2C6CA3' },
      '&.Mui-disabled': { opacity: 0.4 },
    },
  },
  variants: [
    { props: { variant: 'outlined' }, style: ({ theme }) => ({
      color: theme.palette.text.primary,
      borderColor: theme.palette.divider,
      '&:hover': { backgroundColor: theme.palette.action.hover },
      '&.Mui-disabled': { // re-state to stop gray-out
        color: theme.palette.text.primary,
        borderColor: theme.palette.divider,
      },
    }) },
    { props: { variant: 'text' }, style: ({ theme }) => ({
      color: theme.palette.text.primary,
      '&:hover': { backgroundColor: theme.palette.action.hover },
      '&.Mui-disabled': { color: theme.palette.text.primary }, // re-state
    }) },
    { props: { variant: 'contained' }, style: ({ theme }) => ({
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': { backgroundColor: theme.darken(theme.palette.primary.main, 0.15) },
      '&.Mui-disabled': { // re-state
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    }) },
  ],
}`;

const afterCode = `MuiButton: {
  defaultProps: { disableElevation: true },
  styleOverrides: {
    root: {
      textTransform: 'none',
      fontWeight: 600,
      '--Button-radius': '6px',
      '--Button-ring': '2px solid #2C6CA3',
      '&.Mui-disabled': { opacity: 0.4 },
    },
  },
  variants: [
    { props: { variant: 'outlined' }, style: ({ theme }) => ({
      '--Button-color': theme.palette.text.primary,
      '--Button-border-color': theme.palette.divider,
      '&:hover': { '--Button-bg': theme.palette.action.hover },
      // no .Mui-disabled block — color + border cascade through the vars
    }) },
    { props: { variant: 'text' }, style: ({ theme }) => ({
      '--Button-color': theme.palette.text.primary,
      '&:hover': { '--Button-bg': theme.palette.action.hover },
    }) },
    { props: { variant: 'contained' }, style: ({ theme }) => ({
      '--Button-bg': theme.palette.primary.main,
      '--Button-color': theme.palette.primary.contrastText,
      '&:hover': { '--Button-bg': theme.darken(theme.palette.primary.main, 0.15) },
    }) },
  ],
}`;

function Demo() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Stack>
      <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Button variant="contained" disabled>
          Contained
        </Button>
        <Button variant="outlined" disabled>
          Outlined
        </Button>
        <Button variant="text" disabled>
          Text
        </Button>
      </Stack>
      <Typography variant="caption" color="text.secondary">
        Hover / focus / disabled — identity preserved
      </Typography>
    </Stack>
  );
}

function Column({
  title,
  subtitle,
  theme,
  code,
  badge,
}: {
  title: string;
  subtitle: string;
  theme: Theme;
  code: string;
  badge?: string;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {badge ?? `${code.split('\n').length} lines`}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <ThemeProvider theme={theme}>
          <Demo />
        </ThemeProvider>
      </Box>
      <Box
        sx={{
          bgcolor: 'grey.900',
          overflow: 'auto',
          '& pre': { m: 0, p: 2, backgroundColor: 'transparent' },
        }}
      >
        <HighlightedCode copyButtonHidden code={code} language="jsx" plainStyle />
      </Box>
    </Box>
  );
}

// Density: override --mui-spacing at a scope. Button padding is spacing-derived,
// the outlined TextField's height defaults to a spacing multiple — both reflow.
function DensityShowcase() {
  const [spacing, setSpacing] = React.useState(8);
  return (
    <ThemeProvider theme={materialTheme}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3, maxWidth: 420 }}>
        <Typography variant="body2" sx={{ whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
          --mui-spacing
        </Typography>
        <Slider
          value={spacing}
          min={4}
          max={12}
          step={1}
          valueLabelDisplay="auto"
          onChange={(_, value) => setSpacing(value as number)}
          aria-label="--mui-spacing"
        />
        <Typography variant="body2" sx={{ width: 48, textAlign: 'right' }}>
          {spacing}px
        </Typography>
      </Stack>
      <Box
        sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
        style={{ '--mui-spacing': `${spacing}px` } as React.CSSProperties}
      >
        <Stack spacing={2} useFlexGap sx={{ maxWidth: 320, mx: 'auto' }}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Sign in
          </Typography>
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <Button variant="contained" fullWidth>
            Sign in
          </Button>
          <Button variant="text" size="small">
            Forgot password?
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1180, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Agnostic variables
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
        Opt out of Material Design by setting one var per property. Both columns render identically
        — the right does it with far less code, and the customization survives every state.
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: 'stretch' }}>
        <Column
          title="Before — styleOverrides"
          subtitle="re-fight every variant × state"
          theme={beforeTheme}
          code={beforeCode}
        />
        <Column
          title="After — agnostic vars"
          subtitle="set the knob, it cascades"
          theme={afterTheme}
          code={afterCode}
        />
      </Stack>

      <Typography variant="h5" sx={{ mt: 6 }} gutterBottom>
        Re-express as a different design language
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
        Set the agnostic vars on the root and the same component takes a different shape — a soft,
        pill-shaped baseline. Geometry, density, elevation, font-size, and the focus ring all come
        from vars, set once and flattened across every variant and state; colors follow the teal
        palette via Material&apos;s own variant mapping.
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: 'stretch' }}>
        <Column
          title="Material (default)"
          subtitle="rounded, elevated — the reference"
          badge="stock"
          theme={materialTheme}
          code={'// stock Material — no component overrides'}
        />
        <Column
          title="Different baseline"
          subtitle="pill, teal — root vars only"
          badge="root vars"
          theme={baselineTheme}
          code={baselineCode}
        />
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
        Still Material: uppercase text (typography axis — no var yet); the ripple is turned off via
        a prop (anatomy, not a var). The var layer expresses look, not anatomy.
      </Typography>

      <Typography variant="h5" sx={{ mt: 6 }} gutterBottom>
        Adjust density with one dial
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
        Spacing-derived properties ride a single runtime variable, <code>--mui-spacing</code>.
        Override it at any scope and the whole control set reflows: Button padding scales directly;
        the outlined TextField scales by height (its <code>--InputBase-height</code> defaults to a
        spacing multiple) with padding re-derived to keep text centered. One dial — no per-component
        knobs.
      </Typography>
      <DensityShowcase />
    </Box>
  );
}
