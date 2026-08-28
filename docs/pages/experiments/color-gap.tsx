/**
 * Color gap prototype — how close can NARROW theme tokens alone get to a real
 * design system's color language?
 *
 * Rules of the experiment:
 * - Theme input is TOKENS ONLY: palette (incl. the vars-channel component slots
 *   like `palette.Alert.*` / `palette.Tooltip.bg` — they are `colorSchemes`
 *   palette input) / typography / shape / shadows. ZERO `styleOverrides` —
 *   that surface is the wide API this experiment deliberately refuses.
 * - Palette values come 1:1 from the captured design token export (semantic
 *   layer, light + dark modes). Typography ramp and radius reuse the density
 *   prototype's medium preset input.
 * - `palette.secondary` is repurposed as the NEUTRAL interactive role (dark
 *   gray label / border, black-overlay hover) — the design's default
 *   outline/flat button. `.dark` slots hold the design's own hover colors so
 *   MUI's hover derivation lands per design.
 * - The visible delta between "Baseline" and "Design tokens" shows what tokens
 *   CAN move; the remaining delta vs the reference images is the gap a future
 *   narrow color/state API must close. Known deltas are annotated per section.
 * - defaultProps lane (allowed, tracked separately from tokens): swapping
 *   intrinsic GLYPHS via theme `components.*.defaultProps` (Checkbox/Radio
 *   icons) is component config, not style authoring — `styleOverrides` stays
 *   forbidden. Glyph geometry from the captured spec: 16×16 control in a 32px
 *   touch target, 1px border, radio-on = solid thick ring; fills use
 *   currentColor + the contrastText CSS var so both schemes stay token-driven.
 */
import * as React from 'react';
import Head from 'next/head';
import {
  createTheme,
  useTheme,
  ThemeProvider,
  ThemeOptions,
  useColorScheme,
  enhanceColorStates,
  alpha,
} from '@mui/material/styles';
import type { Shadows } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Skeleton from '@mui/material/Skeleton';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search';
import SvgIcon from '@mui/material/SvgIcon';

// Design glyphs — 16×16 control drawn centered in the 24px icon box (net 16px
// visual at default fontSize). currentColor follows the component's state
// color; inner marks ride --mui-palette-primary-contrastText (white in light,
// near-black in dark) so the glyph pair stays scheme-correct without styles.
const CONTRAST = 'var(--mui-palette-primary-contrastText, #fff)';

function BoxBlankIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props}>
      <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" fill="none" stroke="currentColor" />
    </SvgIcon>
  );
}

function BoxCheckedIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" />
      <path
        d="M8 12.2 L10.8 15 L16 9.5"
        fill="none"
        stroke={CONTRAST}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function BoxIndeterminateIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" />
      <path d="M8.5 12 H15.5" stroke={CONTRAST} strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function ChevronDownIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props}>
      <path
        d="M8 10 L12 14.5 L16 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function ThinCloseIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props}>
      <path
        d="M8.5 8.5 L15.5 15.5 M15.5 8.5 L8.5 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
}

function CircleBlankIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" />
    </SvgIcon>
  );
}

function CircleCheckedIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="5.75" fill="none" stroke="currentColor" strokeWidth="4.5" />
    </SvgIcon>
  );
}

// Soft, diffuse ladder replacing MUI's triple-umbra defaults (the reference
// surfaces use a single feathered drop; elevation colors black @10%/@20% in
// both modes per the token export).
const softShadows = Array.from({ length: 25 }, (_, i) => {
  if (i === 0) {
    return 'none';
  }
  const y = Math.round(1 + i * 0.75);
  const blur = Math.round(4 + i * 1.5);
  return `0 ${y}px ${blur}px ${alpha('#000000', 0.08 + i * 0.004)}, 0 1px 2px ${alpha(
    '#000000',
    0.06,
  )}`;
}) as Shadows;

// semantic/* token values, light-gray mode.
const lightPalette = {
  // Plain palette colors — nothing here opts in. The single call to
  // enhanceColorStates() at the bottom of this file derives states for ALL of
  // them, which is the whole public surface.
  primary: { main: '#006DA2', dark: '#006698', contrastText: '#FFFFFF' },
  secondary: { main: '#363636', dark: '#262626', contrastText: '#FFFFFF' },
  error: { main: '#D13F3F', dark: '#C83838' },
  warning: { main: '#BF8014' }, // icon-color/feedback/status/warning
  success: { main: '#547919' },
  info: { main: '#006DA2' },
  text: {
    primary: '#363636',
    secondary: 'rgba(54, 54, 54, 0.75)',
    disabled: 'rgba(54, 54, 54, 0.5)', // opacity/disabled = 50
  },
  divider: 'rgba(0, 0, 0, 0.1)', // border-color/light
  background: { default: '#FAFAFA', paper: '#FFFFFF' }, // surface/200 + surface/100
  action: {
    active: '#363636', // icon-color/default
    hover: 'rgba(0, 0, 0, 0.05)', // input/secondary/hover
    hoverOpacity: 0.05,
    selected: 'rgba(205, 234, 247, 0.4)', // selection/default
    focus: 'rgba(0, 109, 162, 0.12)',
    disabled: 'rgba(54, 54, 54, 0.5)',
    disabledBackground: 'rgba(0, 0, 0, 0.08)',
  },
  // vars-channel component slots — still colorSchemes palette INPUT (tokens-only).
  Alert: {
    errorStandardBg: '#FDEEEE', // feedback/notification/error
    infoStandardBg: '#E6F5FB',
    successStandardBg: '#F3F7EC',
    warningStandardBg: '#FFF9E8',
    errorColor: '#A62626', // text-color/feedback/status/*
    infoColor: '#006698',
    successColor: '#547919',
    warningColor: '#8C530E',
    errorIconColor: '#D13F3F', // icon-color/feedback/status/*
    infoIconColor: '#006DA2',
    successIconColor: '#547919',
    warningIconColor: '#BF8014',
  },
  Tooltip: { bg: '#363636' }, // data-display/info/default
  FilledInput: {
    bg: 'rgba(0, 0, 0, 0.04)', // input/text/default
    hoverBg: 'rgba(0, 0, 0, 0.1)', // input/text/hover
    disabledBg: 'rgba(0, 0, 0, 0.02)',
  },
  Chip: { defaultBorder: 'rgba(0, 0, 0, 0.15)' }, // border-color/medium
};

// semantic/* token values, dark-gray mode.
const darkPalette = {
  primary: { main: '#38ABDF', dark: '#44B0E1', contrastText: '#080808' },
  secondary: { main: '#FFFFFF', dark: '#F5F5F5', contrastText: '#080808' },
  error: { main: '#F18888' },
  warning: { main: '#FFD153' },
  success: { main: '#9FC266' },
  info: { main: '#38ABDF' },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.2)',
  background: { default: '#1F1F1F', paper: '#262626' }, // dark ramp inverts: 100 = lightest
  action: {
    active: '#FFFFFF',
    hover: 'rgba(255, 255, 255, 0.1)',
    hoverOpacity: 0.1,
    selected: 'rgba(56, 171, 223, 0.3)',
    focus: 'rgba(56, 171, 223, 0.12)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
  },
  Alert: {
    errorStandardBg: '#330505',
    infoStandardBg: '#081B34',
    successStandardBg: '#1D2D04',
    warningStandardBg: '#331805',
    errorColor: '#FAD5D5',
    infoColor: '#C1E5F5',
    successColor: '#CFE1B3',
    warningColor: '#FFEDBA',
    errorIconColor: '#F18888',
    infoIconColor: '#38ABDF',
    successIconColor: '#ABCA79',
    warningIconColor: '#FFD153',
  },
  Tooltip: { bg: '#FFFFFF' }, // per design — but tooltip TEXT stays common.white (gap)
  FilledInput: {
    bg: 'rgba(255, 255, 255, 0.1)',
    hoverBg: 'rgba(255, 255, 255, 0.2)',
    disabledBg: 'rgba(255, 255, 255, 0.05)',
  },
  Chip: { defaultBorder: 'rgba(255, 255, 255, 0.3)' },
};

const designTokens: ThemeOptions = {
  colorSchemes: {
    light: { palette: lightPalette },
    dark: { palette: darkPalette },
  },
  typography: {
    // Fira Sans = closest open font to the design's typeface (same designers:
    // Spiekermann/Carrois); loaded via Google Fonts in the page Head.
    fontFamily: '"Fira Sans", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: { fontSize: '1.75rem', lineHeight: '36px' },
    h2: { fontSize: '1.5rem', lineHeight: '30px' },
    h3: { fontSize: '1rem', lineHeight: '26px' },
    h4: { fontSize: '0.9375rem', lineHeight: '24px' },
    h5: { fontSize: '0.875rem', lineHeight: '22px' },
    h6: { fontSize: '0.8125rem', lineHeight: '20px' },
    subtitle1: { fontSize: '0.875rem', lineHeight: '22px' },
    subtitle2: { fontSize: '0.8125rem', lineHeight: '20px' },
    body1: { fontSize: '0.875rem', lineHeight: '20px' },
    body2: { fontSize: '0.8125rem', lineHeight: '18px' },
    caption: { fontSize: '0.75rem', lineHeight: '16px' },
    button: {
      fontSize: '0.875rem',
      lineHeight: '20px',
      textTransform: 'initial',
      letterSpacing: 0,
    },
  },
  shape: { borderRadius: 6 },
  shadows: softShadows,
  // defaultProps lane — component config only, never styleOverrides.
  components: {
    // Flat buttons per design (the reference solid button has no drop shadow).
    // disableElevation exists ONLY on Button + ButtonGroup.
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiButtonGroup: { defaultProps: { disableElevation: true } },
    MuiCheckbox: {
      defaultProps: {
        icon: <BoxBlankIcon />,
        checkedIcon: <BoxCheckedIcon />,
        indeterminateIcon: <BoxIndeterminateIcon />,
      },
    },
    MuiRadio: {
      defaultProps: {
        icon: <CircleBlankIcon />,
        checkedIcon: <CircleCheckedIcon />,
      },
    },
    MuiSelect: {
      defaultProps: { IconComponent: ChevronDownIcon },
    },
    MuiAutocomplete: {
      defaultProps: {
        popupIcon: <ChevronDownIcon />,
        clearIcon: <ThinCloseIcon fontSize="small" />,
      },
    },
    MuiAccordionSummary: {
      defaultProps: { expandIcon: <ChevronDownIcon /> },
    },
    MuiChip: {
      defaultProps: { deleteIcon: <ThinCloseIcon /> },
    },
  },
};

// The proposed narrow state API: levels are semantic and shared; the magnitudes
// live PER SCHEME, because measured overlay steps differ 5% light vs 10% dark.
// Total user-facing surface for every interaction colour in the library:
// three integers + two percentages per scheme.
const tokensTheme = enhanceColorStates(
  createTheme({
    cssVariables: { colorSchemeSelector: 'class' },
    // Opt-in keyboard focus ring (#48743). No outlineColor authored → each scheme
    // rings with its own primary.main, which IS the design's focus color
    // (box-shadow state/focus token) in both schemes.
    focusVisible: true,
    ...designTokens,
    colorSchemes: {
      // Calibrated against the reference tokens by minimising worst-channel error.
      // The SOLID step lands at ~4.5% in both schemes — flipping the pole absorbs
      // the asymmetry, so it barely varies. The OVERLAY step does not: it is an
      // authored alpha and the reference doubles it in dark (5% → 10%). That one
      // magnitude is the reason `states` has to live per scheme.
      // Per-scheme levers ride `palette.states` so the EXISTING var emitter ships
      // them per scheme as `--mui-palette-states-*`. The generator reads those vars,
      // which is why one set of generated styles is correct in both schemes.
      // Upstream this wants its own `--mui-state-*` namespace rather than a palette key.
      light: { palette: { ...lightPalette, states: { step: '4.6%', overlayStep: '5%' } } },
      dark: { palette: { ...darkPalette, states: { step: '4.4%', overlayStep: '10%' } } },
    },
    components: {
      MuiButtonBase: { defaultProps: { disableRipple: true } },
    },
  }),
  {
    // PROTOTYPE PLUMBING, deliberately here and not in the package: the levers are
    // passed as `var()` references so they resolve PER SCHEME off `palette.states`
    // above. The library defaults are plain values ('4.5%' / '5%') — it must not
    // invent a custom-property name, since it cannot know this theme's prefix.
    step: 'var(--mui-palette-states-step, 4.5%)',
    overlayStep: 'var(--mui-palette-states-overlayStep, 5%)',
  },
);

const baselineTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: { light: true, dark: true },
  // Keep the stock expand icon visible in the Baseline state — the sheet no
  // longer passes expandIcon per instance (the tokens theme defaults it).
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiAccordionSummary: { defaultProps: { expandIcon: <ExpandMoreIcon /> } },
  },
});

function Section({
  title,
  gap,
  children,
}: {
  title: string;
  /** known token-unreachable deltas vs the reference — the gap evidence */
  gap?: string;
  children: React.ReactNode;
}) {
  return (
    <Stack spacing={1} sx={{ breakInside: 'avoid' }}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Stack direction="row" spacing={3} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        {children}
      </Stack>
      {gap ? (
        <Typography variant="caption" sx={{ color: 'warning.main', maxWidth: 560 }}>
          gap: {gap}
        </Typography>
      ) : null}
    </Stack>
  );
}

/** A swatch painted with a ready-to-use value straight out of `theme.states`. */
function StateChip({ value, label }: { value?: string; label: string }) {
  return (
    <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
      <Box
        sx={{
          width: 96,
          height: 40,
          borderRadius: 1,
          border: 1,
          borderColor: 'divider',
          backgroundColor: value ?? 'transparent',
        }}
      />
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
    </Stack>
  );
}

/** The same swatch, painted with the verbatim reference token for comparison. */
function RefChip({ light, dark, label }: { light: string; dark: string; label: string }) {
  return (
    <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
      <Box
        sx={(theme) => ({
          width: 96,
          height: 40,
          borderRadius: 1,
          border: 1,
          borderColor: 'divider',
          backgroundColor: light,
          ...theme.applyStyles('dark', { backgroundColor: dark }),
        })}
      />
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
    </Stack>
  );
}

function StateEngineSection() {
  const theme = useTheme();
  const states = theme.states;
  const solid = states?.primary;
  const ghost = states?.default;
  return (
    <Stack spacing={2}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
        State engine — generated once, stored as ready-to-use styles
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 660 }}>
        A generator runs once per theme and writes{' '}
        <Box component="code" sx={{ fontSize: 12 }}>
          theme.states
        </Box>{' '}
        — plain style objects, no logic to interpret. Components spread them; nothing derives a
        colour at render time. Swatches below read those objects directly.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              theme.states.primary — colour-derived, vs. reference tokens
            </Typography>
            <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <StateChip value="var(--mui-palette-primary-main)" label="rest" />
              <StateChip value={solid?.hover?.backgroundColor} label="hover" />
              <StateChip value={solid?.active?.backgroundColor} label="active" />
              <Divider orientation="vertical" flexItem />
              <RefChip light="#006DA2" dark="#38ABDF" label="ref rest" />
              <RefChip light="#006698" dark="#44B0E1" label="ref hover" />
              <RefChip light="#005F8E" dark="#51B6E3" label="ref active" />
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              theme.states.default — colour-independent overlays (ghost surfaces, list rows)
            </Typography>
            <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <StateChip value="transparent" label="rest" />
              <StateChip value={ghost?.hover?.backgroundColor} label="hover" />
              <StateChip value={ghost?.active?.backgroundColor} label="active" />
              <StateChip value={ghost?.selectedHover?.backgroundColor} label="selected:hover" />
              <Divider orientation="vertical" flexItem />
              <RefChip light="rgba(0,0,0,0)" dark="rgba(255,255,255,0)" label="ref rest" />
              <RefChip light="rgba(0,0,0,0.05)" dark="rgba(255,255,255,0.10)" label="ref hover" />
              <RefChip light="rgba(0,0,0,0.10)" dark="rgba(255,255,255,0.20)" label="ref active" />
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      <Stack
        direction="row"
        spacing={3}
        useFlexGap
        sx={{ flexWrap: 'wrap', alignItems: 'flex-start' }}
      >
        <Stack spacing={1}>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Live — hover, hold, and note the disabled fade
          </Typography>
          <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Button variant="contained">Solid</Button>
            <Button variant="contained" color="error">
              Danger
            </Button>
            <Button variant="outlined" color="secondary">
              Ghost
            </Button>
            <Button variant="text" color="secondary">
              Text
            </Button>
            <Button variant="contained" disabled>
              Disabled
            </Button>
            <Button variant="outlined" color="secondary" disabled>
              Disabled
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Compound — selected × hover, enumerated by the generator
          </Typography>
          <Paper elevation={2} sx={{ width: 240 }}>
            <MenuList>
              <MenuItem>Rest → hover → pressed</MenuItem>
              <MenuItem selected>Selected</MenuItem>
              <MenuItem disabled>Disabled</MenuItem>
            </MenuList>
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
}

function ComponentSheet() {
  const [tab, setTab] = React.useState(0);
  const [toggle, setToggle] = React.useState<string | null>('list');
  return (
    <Stack spacing={4} sx={{ p: 4, maxWidth: 1280 }}>
      <StateEngineSection />
      <Divider />
      <Section
        title="Button — solid primary / neutral (secondary) / danger"
        gap="neutral role now rides palette.secondary (label+hover per design); still unreachable: PRESSED bg (black 10% — MUI has ripple only), outlined border alpha hardcoded 0.5 vs the design's border-color/heavy 40%, and .dark burned as the hover slot"
      >
        <Button variant="contained">Label</Button>
        <Button variant="outlined" color="secondary">
          Label
        </Button>
        <Button variant="text" color="secondary">
          Label
        </Button>
        <Button variant="contained" disabled>
          Label
        </Button>
        <Button variant="outlined" color="secondary" disabled>
          Label
        </Button>
        <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button variant="outlined">Primary outline</Button>
        <IconButton aria-label="add">
          <AddIcon />
        </IconButton>
        <IconButton color="primary" aria-label="search">
          <SearchIcon />
        </IconButton>
        <IconButton disabled aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <ButtonGroup variant="outlined" color="secondary">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Section>

      <Section
        title="Selection controls — Checkbox / Radio / Switch"
        gap="checkbox/radio glyphs now swapped via defaultProps (16px box, 1px border, radio donut) with contrastText marks; still unreachable: UNCHECKED border color rides the component's color state (text.secondary-ish), not border-color/heavy; switch-off track (white + gray border) has no token (palette.Switch only covers the uncolored thumb)"
      >
        <Checkbox defaultChecked />
        <Checkbox />
        <Checkbox indeterminate />
        <Checkbox defaultChecked disabled />
        <Radio defaultChecked name="r" />
        <Radio name="r2" />
        <Radio disabled name="r3" />
        <Switch defaultChecked />
        <Switch />
        <Switch disabled />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Option" />
      </Section>

      <Section
        title="Text input — TextField / Select / Autocomplete"
        gap="outlined resting/hover border colors are hardcoded alphas of text color — cannot consume border-color/light|medium|heavy tokens; filled bg IS tokenizable (palette.FilledInput)"
      >
        <TextField label="Label" placeholder="Placeholder" size="small" />
        <TextField label="Focused" size="small" focused defaultValue="Value" />
        <TextField label="Error" size="small" error helperText="Message" />
        <TextField label="Disabled" size="small" disabled defaultValue="Value" />
        <TextField label="Filled" size="small" variant="filled" defaultValue="Value" />
        <TextField label="Search" size="small" select defaultValue="a" sx={{ minWidth: 140 }}>
          <MenuItem value="a">Option A</MenuItem>
          <MenuItem value="b">Option B</MenuItem>
        </TextField>
        <Autocomplete
          size="small"
          options={['Option A', 'Option B', 'Option C']}
          defaultValue="Option A"
          sx={{ minWidth: 180 }}
          renderInput={(params) => <TextField {...params} label="Autocomplete" />}
        />
      </Section>

      <Section
        title="Menu (inline MenuList) — hover / selected"
        gap="MenuItem selected bg = alpha(primary, selectedOpacity), NOT action.selected — the design's selection tint (#CDEAF7 @40%) is its own color, unreachable without a selection token"
      >
        <Paper elevation={4} sx={{ width: 220 }}>
          <MenuList>
            <MenuItem>Item name</MenuItem>
            <MenuItem selected>Selected item</MenuItem>
            <MenuItem>Item name</MenuItem>
            <MenuItem disabled>Disabled item</MenuItem>
          </MenuList>
        </Paper>
      </Section>

      <Section title="Tabs / Link / Breadcrumbs">
        <Tabs value={tab} onChange={(_e, v) => setTab(v)}>
          <Tab label="Active" />
          <Tab label="Default" />
          <Tab label="Disabled" disabled />
        </Tabs>
        <Link href="#color-gap">Text link</Link>
        <Breadcrumbs>
          <Link href="#color-gap">Home</Link>
          <Link href="#color-gap">Files</Link>
          <Typography sx={{ color: 'text.primary' }}>Current</Typography>
        </Breadcrumbs>
      </Section>

      <Section
        title="Alert — 4 severities"
        gap="CLOSED via vars-channel palette.Alert slots (standard bg / text / icon set 1:1 from the token export) — but ONLY the CSS-vars channel exposes them; without cssVariables the same input is ignored"
      >
        <Stack spacing={1} sx={{ width: '100%' }}>
          <Alert severity="error">Message</Alert>
          <Alert severity="info">Message</Alert>
          <Alert severity="success">Message</Alert>
          <Alert severity="warning">Message</Alert>
        </Stack>
      </Section>

      <Section title="Progress / Skeleton / Badge">
        <CircularProgress size={24} />
        <CircularProgress size={24} variant="determinate" value={70} />
        <LinearProgress variant="determinate" value={60} sx={{ width: 160 }} />
        <LinearProgress sx={{ width: 160 }} />
        <Skeleton variant="rounded" width={120} height={24} />
        <Badge badgeContent={4} color="primary">
          <FolderIcon />
        </Badge>
        <Badge variant="dot" color="success">
          <FolderIcon />
        </Badge>
      </Section>

      <Section
        title="Chip / Tag"
        gap="outlined border now rides palette.Chip.defaultBorder; still unreachable: pill radius hardcoded 16 (height/2), shape.borderRadius does not reach it"
      >
        <Chip label="Label" />
        <Chip label="Label" variant="outlined" />
        <Chip label="Label" color="primary" />
        <Chip label="Deletable" variant="outlined" onDelete={() => {}} />
        <Chip label="Disabled" disabled />
      </Section>

      <Section
        title="Avatar / Tooltip"
        gap="dark-mode tooltip bg per design is WHITE with dark text — palette.Tooltip.bg is tokenizable but tooltip TEXT is hardcoded common.white → unreadable in dark (visible below); fg needs a token"
      >
        <Avatar sx={{ width: 24, height: 24 }}>A</Avatar>
        <AvatarGroup max={3}>
          <Avatar sx={{ width: 24, height: 24 }}>B</Avatar>
          <Avatar sx={{ width: 24, height: 24 }}>C</Avatar>
          <Avatar sx={{ width: 24, height: 24 }}>D</Avatar>
          <Avatar sx={{ width: 24, height: 24 }}>E</Avatar>
        </AvatarGroup>
        <Tooltip
          title="Tooltip label"
          open
          arrow
          placement="right"
          slotProps={{ popper: { disablePortal: true } }}
        >
          <Button variant="outlined" color="secondary" size="small">
            Anchor
          </Button>
        </Tooltip>
      </Section>

      <Section title="ToggleButton / Slider">
        <ToggleButtonGroup value={toggle} exclusive onChange={(_e, v) => setToggle(v)}>
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="grid">Grid</ToggleButton>
          <ToggleButton value="table" disabled>
            Table
          </ToggleButton>
        </ToggleButtonGroup>
        <Slider defaultValue={40} sx={{ width: 160 }} />
        <Slider defaultValue={40} disabled sx={{ width: 160 }} />
      </Section>

      <Section title="Stepper">
        <Stepper activeStep={1} sx={{ width: '100%' }}>
          <Step>
            <StepLabel>Done</StepLabel>
          </Step>
          <Step>
            <StepLabel>Active</StepLabel>
          </Step>
          <Step>
            <StepLabel>Pending</StepLabel>
          </Step>
        </Stepper>
      </Section>

      <Section title="Accordion / Card / Paper elevation">
        <Stack spacing={1} sx={{ width: 320 }}>
          <Accordion defaultExpanded>
            <AccordionSummary>Expanded</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">Details content</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Collapsed</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">Details content</Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Card sx={{ width: 200 }}>
          <CardContent>
            <Typography variant="subtitle2">Card title</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Supporting copy on the card surface.
            </Typography>
          </CardContent>
        </Card>
        <Paper elevation={1} sx={{ p: 2 }}>
          e1
        </Paper>
        <Paper elevation={4} sx={{ p: 2 }}>
          e4
        </Paper>
        <Paper elevation={8} sx={{ p: 2 }}>
          e8
        </Paper>
      </Section>

      <Section
        title="Table — hover / selected rows"
        gap="header background + row hover in the reference use the neutral subtle bg; table has no bg token of its own (rides action.hover / action.selected)"
      >
        <Table size="small" sx={{ maxWidth: 480 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell>Alpha</TableCell>
              <TableCell>Active</TableCell>
              <TableCell align="right">24</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Beta (selected)</TableCell>
              <TableCell>Active</TableCell>
              <TableCell align="right">18</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gamma</TableCell>
              <TableCell>Paused</TableCell>
              <TableCell align="right">7</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      <Section title="Typography ramp / Divider">
        <Stack spacing={0.5}>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="body1">Body 1 — primary text</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Body 2 — secondary text
          </Typography>
          <Typography variant="caption">Caption</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">Below the divider</Typography>
        </Stack>
      </Section>
    </Stack>
  );
}

function ModeSwitch() {
  const { mode, setMode } = useColorScheme();
  return (
    <FormControlLabel
      control={
        <Switch
          checked={mode === 'dark'}
          onChange={(event) => setMode(event.target.checked ? 'dark' : 'light')}
        />
      }
      label="Dark"
    />
  );
}

export default function ColorGapPage() {
  const [useTokens, setUseTokens] = React.useState(true);
  return (
    <ThemeProvider theme={useTokens ? tokensTheme : baselineTheme} defaultMode="light">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&display=swap"
        />
      </Head>
      <CssBaseline />
      <Stack
        direction="row"
        spacing={2}
        sx={{ p: 2, px: 4, alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}
      >
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          Color gap — tokens-only theme
        </Typography>
        <FormControlLabel
          control={
            <Switch checked={useTokens} onChange={(event) => setUseTokens(event.target.checked)} />
          }
          label={useTokens ? 'Design tokens' : 'Baseline'}
        />
        <ModeSwitch />
      </Stack>
      <ComponentSheet />
    </ThemeProvider>
  );
}
