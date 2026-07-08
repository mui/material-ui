'use client';
import * as React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Fab from '@mui/material/Fab';
import Pagination from '@mui/material/Pagination';
import SnackbarContent from '@mui/material/SnackbarContent';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CssBaseline from '@mui/material/CssBaseline';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Menu from '@mui/material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import PaddingIcon from '@mui/icons-material/Padding';
import TitleIcon from '@mui/icons-material/Title';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  createTheme,
  ThemeProvider,
  enhanceCompactDensity,
  enhanceNormalDensity,
  enhanceComfortDensity,
} from '@mui/material/styles';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import {
  densityGroups,
  densityRow,
  knobLabel,
  orderFamilyComponents,
  stripComponentSlot,
} from 'docs/src/modules/components/density/densityFields';
import {
  densityVirtualKnobs,
  type DensityVirtualKnob,
} from 'docs/src/modules/components/density/densityExtraFields';
import {
  buildOverrides,
  mergeOntoPreset,
} from 'docs/src/modules/components/density/buildDensityOverrides';
import {
  themeTokenGroups,
  readThemeToken,
  setThemeToken,
} from 'docs/src/modules/components/density/themeTokens';
import {
  SCALE_KEYS,
  parseMapping,
  previewText,
  shortenDensityVars,
} from 'docs/src/modules/components/density/mappingValue';
import {
  collectDensityEdits,
  collectThemeTokenEdits,
} from 'docs/src/modules/components/density/collectEdits';
import { buildExportSource } from 'docs/src/modules/components/density/buildExportSource';
import { buildExportInput } from 'docs/src/modules/components/density/exportPayload';
import { KnobInput } from 'docs/src/modules/components/density/KnobInput';

const PRESETS = ['unset', 'compact', 'normal', 'comfort'] as const;
const SIZES = ['small', 'medium', 'large'] as const;
const VARIANTS = ['text', 'outlined', 'contained'] as const;

type Preset = (typeof PRESETS)[number];

// Layout tabs — lowercase ids are the URL param values, decoupled from labels.
type TabKey = 'components' | 'typography' | 'radius';
// Radius is hidden for now — its wiring (TAB_TOKEN_GROUP, preview, token knobs)
// stays intact; re-enable by adding it back here. Hidden tabs are also invalid
// as `?tab=` values (they fall back to the default).
const VISIBLE_TABS: readonly TabKey[] = ['components', 'typography'];
const TAB_LABEL: Record<TabKey, string> = {
  components: 'Components',
  typography: 'Typography',
  radius: 'Radius',
};
// Token tabs → their themeTokenGroups key.
const TAB_TOKEN_GROUP: Record<Exclude<TabKey, 'components'>, string> = {
  typography: 'Typography',
  radius: 'Border Radius',
};

// Stable empty mapping for `unset` (no workspace) — module-scope identity so it
// never defeats the FamilyKnobs/KnobInput memos.
const EMPTY_MAPPING: Record<string, string> = {};

// "How to use" walkthrough — a vertical timeline, all steps visible at once
// (no Next/Back paging); last step is the export.
const HOW_TO_STEPS = [
  {
    label: 'Pick a density preset',
    body: 'Choose compact, normal, or comfort in the top bar — the whole canvas reflows off that preset. "none" keeps today\'s defaults (and hides the knobs).',
  },
  {
    label: 'Explore components',
    body: 'On the Components tab, pick a family (or All) to see its demo. Toggle the visual-debug overlays (padding ring, text box, outline) to read the reflow at a glance.',
  },
  {
    label: 'Tweak the knobs',
    body: 'Each knob accepts a density step (xxs…xxl) or any raw CSS value (12px, 2rem). The placeholder shows what the preset ships; the helper shows what your input resolves to. Edits belong to the ACTIVE preset — switch presets and each keeps its own overrides.',
  },
  {
    label: 'Adjust typography',
    body: 'The Typography tab edits theme-level type tokens (per-variant fontSize / lineHeight) with the same rules; the canvas shows a live type preview.',
  },
  {
    label: 'Export density.ts',
    body: 'Click "Export density.ts" to download a self-contained file with all three enhance*Density functions and your edits baked in (annotated with comments). Paste it into any app on released @mui/material — just render <CssBaseline /> so the density variables materialise.',
  },
] as const;

function HowToUseDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth data-howto-dialog>
      <DialogTitle>How to use the playground</DialogTitle>
      <DialogContent>
        <Timeline
          sx={{
            p: 0,
            m: 0,
            // left-align content: collapse the empty opposite-content gutter
            // (must target the missingOppositeContent rule's own ::before to win)
            [`& .${timelineItemClasses.missingOppositeContent}::before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {HOW_TO_STEPS.map((s, i) => (
            <TimelineItem key={s.label}>
              <TimelineSeparator>
                <TimelineDot color="primary" sx={{ boxShadow: 'none' }}>
                  <Typography variant="caption" sx={{ width: 16, textAlign: 'center' }}>
                    {i + 1}
                  </Typography>
                </TimelineDot>
                {i < HOW_TO_STEPS.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ pb: 3 }}>
                <Typography variant="subtitle2">{s.label}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {s.body}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

// Sidebar slot captions render as small tags for visual distinction from labels.
const SLOT_TAG_SX = {
  display: 'inline-block',
  px: 0.75,
  py: 0.125,
  borderRadius: 0.75,
  bgcolor: 'action.hover',
  border: '1px solid',
  borderColor: 'divider',
  lineHeight: 1.4,
} as const;

// Visual-debug overlays, toggled by `data-debug-*` on the canvas. Pure CSS,
// layout-safe (absolute ::before + pointer-events:none), never touches the
// components' real styles. The label span sits above the padding overlay
// (z-index) so text stays crisp; its blue fill only shows in text mode.
// The padding-ring overlay: `inset:0` sizes it to the element's padding-box;
// `padding:inherit` shrinks its content-box to the element's content box, and
// the `exclude` mask knocks that center out → green fills only the padding ring.
const PADDING_RING = {
  content: '""',
  position: 'absolute',
  inset: 0,
  padding: 'inherit',
  boxSizing: 'border-box',
  borderRadius: 'inherit',
  backgroundColor: 'rgba(46, 204, 64, 0.5)', // padding = green (DevTools convention)
  pointerEvents: 'none',
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
} as const;

// Slots the padding-ring overlay decorates. ButtonBase covers the buttony
// components (Button/MenuItem/Tab/Checkbox/ToggleButton/AccordionSummary…);
// the rest are padded non-button slots that would otherwise show nothing. The
// `padding:inherit` mask needs the padding on the element itself, so input
// `<input>` boxes are excluded (replaced elements ignore ::before).
const PADDING_RING_SLOTS = [
  '.MuiButtonBase-root',
  '.MuiTooltip-tooltip',
  '.MuiAlert-root',
  '.MuiCardContent-root',
  '.MuiCardActions-root',
  '.MuiCardHeader-root',
  '.MuiDialogTitle-root',
  '.MuiDialogContent-root',
  '.MuiDialogActions-root',
  '.MuiTableCell-root',
  '.MuiSnackbarContent-root',
  '.MuiAccordionDetails-root',
  '.MuiToolbar-root',
  '.MuiChip-label',
  '.MuiStepLabel-iconContainer',
  '.MuiStep-root',
  '.MuiBadge-badge',
  '.MuiAutocomplete-option',
];

const DEBUG_SX = {
  // inline-block (not inline) so the highlight fills the full line box (line-height),
  // surfacing line-height density shifts. Layout-neutral for these labels: single-line
  // spans shrink-wrap like inline; labels inside flex rows are blockified either way.
  '& .density-debug-text': {
    display: 'inline-block',
    position: 'relative',
    zIndex: 1,
    borderRadius: '2px',
  },
  // Padding ring: each slot needs position:relative to anchor the ::before overlay.
  ...Object.fromEntries(
    PADDING_RING_SLOTS.map((s) => [`&[data-debug-padding] ${s}`, { position: 'relative' }]),
  ),
  ...Object.fromEntries(
    PADDING_RING_SLOTS.map((s) => [`&[data-debug-padding] ${s}::before`, PADDING_RING]),
  ),
  '&[data-debug-text] .density-debug-text': {
    backgroundColor: 'rgba(0, 116, 217, 0.32)', // text box = blue
  },
  // Outline every box in the demo area (scoped under [data-canvas-demo], so the
  // per-cell label header + wrapper are skipped) so density shifts read at a glance.
  // `outline` draws outside the box and takes no layout space → no reflow on toggle.
  // The debug-text label spans are excluded — they're overlay helpers, not real boxes.
  '&[data-debug-outline] [data-canvas-demo] *:not(.density-debug-text):not(path)': {
    outline: '1px solid rgba(244, 67, 54, 0.5)',
    outlineOffset: '-1px',
  },
} as const;

const PRESET_LABEL: Record<Preset, string> = {
  unset: 'none',
  compact: 'compact',
  normal: 'normal',
  comfort: 'comfort',
};

// Each preset maps to its `enhance*Density` fn; `unset` applies none.
const PRESET_FN = {
  compact: enhanceCompactDensity,
  normal: enhanceNormalDensity,
  comfort: enhanceComfortDensity,
} as const;

interface DensityComponentDef {
  canvasLabel: string;
  // Memoized component reference (not a per-render element factory) — keystroke
  // page re-renders skip the matrices entirely; theme changes still reach the
  // styled components through context, which penetrates React.memo.
  Matrix: React.ComponentType;
}

function ButtonMatrix() {
  return (
    <Stack spacing={4} sx={{ mt: 1 }}>
      {SIZES.map((size) => (
        <Box key={size} data-size-section={size}>
          <Divider textAlign="left" sx={{ mb: 1.5 }}>
            <Typography variant="caption" color="text.secondary">
              {size}
            </Typography>
          </Divider>
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            sx={{ alignItems: 'center', flexWrap: 'wrap' }}
          >
            {VARIANTS.map((variant) => (
              <Button
                key={variant}
                variant={variant}
                size={size}
                color="primary"
                data-cell={`${variant}-${size}`}
              >
                <span className="density-debug-text">{variant}</span>
              </Button>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

// One realistic account menu; `dense` toggles the whole list. Dense and default
// items never coexist in one list, so the demo shows two lists side by side.
function MenuDemoItems({ dense = false }: { dense?: boolean }) {
  return (
    <React.Fragment>
      <MenuItem dense={dense}>
        <span className="density-debug-text">Profile</span>
      </MenuItem>
      <MenuItem dense={dense} selected>
        <span className="density-debug-text">My account</span>
      </MenuItem>
      <MenuItem dense={dense}>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <span className="density-debug-text">Archived</span>
        </ListItemText>
      </MenuItem>
      <MenuItem dense={dense} divider>
        <span className="density-debug-text">Settings</span>
      </MenuItem>
      <MenuItem dense={dense}>
        <span className="density-debug-text">Sign out</span>
      </MenuItem>
    </React.Fragment>
  );
}

function MenuListDemo({ dense = false }: { dense?: boolean }) {
  return (
    <div>
      <Typography variant="caption" color="text.secondary">
        {dense ? 'dense' : 'default'}
      </Typography>
      <MenuList sx={{ width: 220, border: '1px solid', borderColor: 'divider' }}>
        <MenuDemoItems dense={dense} />
      </MenuList>
    </div>
  );
}

function MenuMatrix() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  // Overrides now ride the theme (ThemeProvider context), so the portaled popover
  // gets them too — unlike the old `#density-canvas`-scoped GlobalStyles, which
  // reached only the in-canvas static list.
  return (
    <Stack
      direction="row"
      spacing={4}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      <MenuListDemo />
      <MenuListDemo dense />
      <div>
        <Button variant="outlined" onClick={(event) => setAnchorEl(event.currentTarget)}>
          <span className="density-debug-text">Open menu</span>
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuDemoItems />
        </Menu>
      </div>
    </Stack>
  );
}

function TooltipMatrix() {
  // Force open + inline (no portal) so the bubble sits inside the debug scope,
  // picks up the padding-ring / text-box overlays, and receives the canvas-scoped
  // token overrides.
  const slotProps = {
    popper: { disablePortal: true },
  } as const;
  // One tooltip per placement so the offset margins all render. Two rows: arrow
  // (surfaces arrow-size + the left/right offset) and no-arrow (adds the
  // top/bottom offset — the `Offset [arrow=false]` knob).
  const tips = [
    { placement: 'top', label: 'Copy' },
    { placement: 'bottom', label: 'Edit' },
    { placement: 'left', label: 'Delete' },
    { placement: 'right', label: 'Share' },
  ] as const;
  const row = (arrow: boolean) => (
    <Box key={arrow ? 'arrow' : 'no-arrow'}>
      <Typography variant="caption" color="text.secondary">
        {arrow ? 'arrow' : 'no arrow'}
      </Typography>
      <Stack
        direction="row"
        spacing={12}
        useFlexGap
        sx={{ mt: 4, mb: 8, minHeight: 120, alignItems: 'center', flexWrap: 'wrap' }}
      >
        {tips.map((t) => (
          <Tooltip
            key={t.placement}
            title={<span className="density-debug-text">{t.label}</span>}
            arrow={arrow}
            open
            placement={t.placement}
            slotProps={slotProps}
          >
            <Button variant="outlined">
              <span className="density-debug-text">{t.label}</span>
            </Button>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
  return (
    <React.Fragment>
      {row(true)}
      {row(false)}
    </React.Fragment>
  );
}

function OutlinedInputMatrix() {
  return (
    <Stack
      direction="row"
      spacing={4}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      <Stack spacing={3} sx={{ width: 220 }}>
        <Typography variant="caption" color="text.secondary">
          medium
        </Typography>
        <TextField label={<span className="density-debug-text">Label</span>} variant="outlined" />
        <TextField
          label={<span className="density-debug-text">Start adornment</span>}
          variant="outlined"
          slotProps={{
            input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          }}
        />
        <TextField
          label={<span className="density-debug-text">End adornment</span>}
          variant="outlined"
          slotProps={{
            input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> },
          }}
        />
        <TextField
          label={<span className="density-debug-text">Multiline</span>}
          variant="outlined"
          multiline
          rows={3}
          defaultValue={'Line one\nLine two\nLine three'}
        />
      </Stack>
      <Stack spacing={3} sx={{ width: 220 }}>
        <Typography variant="caption" color="text.secondary">
          small
        </Typography>
        <TextField
          label={<span className="density-debug-text">Label</span>}
          variant="outlined"
          size="small"
        />
        <TextField
          label={<span className="density-debug-text">Start adornment</span>}
          variant="outlined"
          size="small"
          slotProps={{
            input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          }}
        />
        <TextField
          label={<span className="density-debug-text">End adornment</span>}
          variant="outlined"
          size="small"
          slotProps={{
            input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> },
          }}
        />
      </Stack>
    </Stack>
  );
}

function FilledInputMatrix() {
  // Resting (empty) vs shrunk (filled) label per size — the label rest/shrink Y
  // reflows differ. The adornment field exercises the filled adornment marginTop.
  return (
    <Stack
      direction="row"
      spacing={4}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      <Stack spacing={3} sx={{ width: 200 }}>
        <Typography variant="caption" color="text.secondary">
          medium
        </Typography>
        <TextField label={<span className="density-debug-text">Label</span>} variant="filled" />
        <TextField
          label={<span className="density-debug-text">Label</span>}
          variant="filled"
          defaultValue="Filled value"
        />
        <TextField
          label={<span className="density-debug-text">Amount</span>}
          variant="filled"
          slotProps={{
            input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          }}
        />
        <TextField
          label={<span className="density-debug-text">Multiline</span>}
          variant="filled"
          multiline
          rows={3}
          defaultValue={'Line one\nLine two\nLine three'}
        />
      </Stack>
      <Stack spacing={3} sx={{ width: 200 }}>
        <Typography variant="caption" color="text.secondary">
          small
        </Typography>
        <TextField
          label={<span className="density-debug-text">Label</span>}
          variant="filled"
          size="small"
        />
        <TextField
          label={<span className="density-debug-text">Label</span>}
          variant="filled"
          size="small"
          defaultValue="Filled value"
        />
        <TextField
          label={<span className="density-debug-text">Amount</span>}
          variant="filled"
          size="small"
          slotProps={{
            input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          }}
        />
        <TextField
          label={<span className="density-debug-text">Weight</span>}
          variant="filled"
          size="small"
          slotProps={{
            input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> },
          }}
        />
      </Stack>
    </Stack>
  );
}

function InputMatrix() {
  return (
    <Stack
      direction="row"
      spacing={4}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      <Stack spacing={3} sx={{ width: 220 }}>
        <Typography variant="caption" color="text.secondary">
          medium
        </Typography>
        <TextField label={<span className="density-debug-text">Label</span>} variant="standard" />
        <TextField
          label={<span className="density-debug-text">Start adornment</span>}
          variant="standard"
          slotProps={{
            input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          }}
        />
        <TextField
          label={<span className="density-debug-text">End adornment</span>}
          variant="standard"
          slotProps={{
            input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> },
          }}
        />
        <TextField
          label={<span className="density-debug-text">Multiline</span>}
          variant="standard"
          multiline
          rows={3}
          defaultValue={'Line one\nLine two\nLine three'}
        />
      </Stack>
      <Stack spacing={3} sx={{ width: 220 }}>
        <Typography variant="caption" color="text.secondary">
          small
        </Typography>
        <TextField
          label={<span className="density-debug-text">Label</span>}
          variant="standard"
          size="small"
        />
        <TextField
          label={<span className="density-debug-text">Start adornment</span>}
          variant="standard"
          size="small"
          slotProps={{
            input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          }}
        />
        <TextField
          label={<span className="density-debug-text">End adornment</span>}
          variant="standard"
          size="small"
          slotProps={{
            input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> },
          }}
        />
      </Stack>
    </Stack>
  );
}

function TextFieldMatrix() {
  return (
    <Stack spacing={4} sx={{ mt: 1 }}>
      {(
        [
          ['outlined', <OutlinedInputMatrix />],
          ['filled', <FilledInputMatrix />],
          ['standard', <InputMatrix />],
        ] as const
      ).map(([variant, node]) => (
        <Box key={variant} data-variant-section={variant}>
          <Divider textAlign="left" sx={{ mb: 1.5 }}>
            <Typography variant="caption" color="text.secondary">
              {variant}
            </Typography>
          </Divider>
          {node}
        </Box>
      ))}
    </Stack>
  );
}

function TabsMatrix() {
  const lbl = (t: string) => <span className="density-debug-text">{t}</span>;
  return (
    <Stack spacing={3} sx={{ mt: 1, width: 460 }}>
      <Tabs value={0}>
        <Tab label={lbl('Overview')} />
        <Tab label={lbl('Activity')} />
        <Tab label={lbl('Settings')} />
      </Tabs>
      <Tabs value={0}>
        <Tab icon={<InboxIcon />} label={lbl('Recents')} iconPosition="top" />
        <Tab icon={<InboxIcon />} label={lbl('Favorites')} iconPosition="top" />
        <Tab icon={<InboxIcon />} label={lbl('Nearby')} iconPosition="top" />
      </Tabs>
      <Tabs value={0}>
        <Tab icon={<InboxIcon />} label={lbl('Inbox')} iconPosition="start" />
        <Tab icon={<InboxIcon />} label={lbl('Starred')} iconPosition="start" />
      </Tabs>
      <Tabs
        value={2}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label={lbl('Item One')} />
        <Tab label={lbl('Item Two')} />
        <Tab label={lbl('Item Three')} />
        <Tab label={lbl('Item Four')} />
        <Tab label={lbl('Item Five')} />
        <Tab label={lbl('Item Six')} />
        <Tab label={lbl('Item Seven')} />
      </Tabs>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
        <Tabs
          value={3}
          orientation="vertical"
          variant="scrollable"
          aria-label="Vertical tabs example"
        >
          <Tab label={lbl('Item One')} />
          <Tab label={lbl('Item Two')} />
          <Tab label={lbl('Item Three')} />
          <Tab label={lbl('Item Four')} />
          <Tab label={lbl('Item Five')} />
          <Tab label={lbl('Item Six')} />
          <Tab label={lbl('Item Seven')} />
        </Tabs>
      </Box>
    </Stack>
  );
}

function CheckboxGroupDemo({ size }: { size: 'small' | 'medium' }) {
  const opts = [
    { label: 'Email', checked: true },
    { label: 'SMS', checked: false },
    { label: 'Push notifications', checked: true },
  ];
  return (
    <FormControl component="fieldset">
      <FormLabel sx={{ typography: 'caption' }}>Notifications ({size})</FormLabel>
      <FormGroup>
        {opts.map((o) => (
          <FormControlLabel
            key={o.label}
            control={<Checkbox size={size} defaultChecked={o.checked} />}
            label={<span className="density-debug-text">{o.label}</span>}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

function CheckboxMatrix() {
  return (
    <Stack
      direction="row"
      spacing={6}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      <CheckboxGroupDemo size="medium" />
      <CheckboxGroupDemo size="small" />
    </Stack>
  );
}

function CardMatrix() {
  return (
    <Card variant="outlined" sx={{ mt: 1, width: 300 }}>
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        title={<span className="density-debug-text">Card header</span>}
        subheader={<span className="density-debug-text">With avatar</span>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <span className="density-debug-text">Body content with last-child bottom padding.</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <span className="density-debug-text">Share</span>
        </Button>
        <Button size="small">
          <span className="density-debug-text">Learn more</span>
        </Button>
      </CardActions>
    </Card>
  );
}

function RatingMatrix() {
  return (
    <Stack spacing={2} sx={{ mt: 1, alignItems: 'flex-start' }}>
      <Rating value={3} size="small" readOnly />
      <Rating value={3} readOnly />
      <Rating value={3} size="large" readOnly />
    </Stack>
  );
}

function SvgIconMatrix() {
  // No label text → no `.density-debug-text` wrappers (outline overlay still applies).
  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      {(['small', 'medium', 'large'] as const).map((fontSize) => (
        <Box key={fontSize} data-size-section={fontSize}>
          <Typography variant="caption" color="text.secondary" component="div">
            {fontSize}
          </Typography>
          <Stack
            direction="row"
            spacing={1.5}
            useFlexGap
            sx={{ alignItems: 'center', flexWrap: 'wrap' }}
          >
            <InboxIcon fontSize={fontSize} />
            <PaddingIcon fontSize={fontSize} />
            <TitleIcon fontSize={fontSize} />
            <MoreVertIcon fontSize={fontSize} />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

function SelectDemo({
  variant,
  size,
}: {
  variant: 'outlined' | 'filled' | 'standard';
  size: 'medium' | 'small';
}) {
  const labelId = `pg-select-${variant}-${size}-label`;
  return (
    <FormControl variant={variant} size={size} sx={{ width: 200 }}>
      <InputLabel id={labelId}>
        <span className="density-debug-text">Age</span>
      </InputLabel>
      <Select labelId={labelId} value={10} label="Age">
        <MenuItem value={10}>
          <span className="density-debug-text">Ten</span>
        </MenuItem>
        <MenuItem value={20}>
          <span className="density-debug-text">Twenty</span>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function SelectMatrix() {
  // All three variants (padding rides MuiOutlinedInput/MuiFilledInput/MuiInput),
  // medium + small side by side.
  return (
    <Stack spacing={3} sx={{ mt: 1 }}>
      {(['outlined', 'filled', 'standard'] as const).map((variant) => (
        <Box key={variant} data-variant-section={variant}>
          <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 1 }}>
            {variant}
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            useFlexGap
            sx={{ alignItems: 'flex-start', flexWrap: 'wrap' }}
          >
            <SelectDemo variant={variant} size="medium" />
            <SelectDemo variant={variant} size="small" />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

function AlertMatrix() {
  return (
    <Stack spacing={2} sx={{ mt: 1, width: 380 }}>
      <Alert severity="info">
        <span className="density-debug-text">Info alert — icon gap + root padding.</span>
      </Alert>
      <Alert severity="success" onClose={() => {}}>
        <span className="density-debug-text">Success alert with a close action.</span>
      </Alert>
    </Stack>
  );
}

function ChipMatrix() {
  return (
    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1, width: 400 }}>
      <Chip
        avatar={<Avatar>N</Avatar>}
        label={<span className="density-debug-text">Natacha</span>}
        onDelete={() => {}}
      />
      <Chip icon={<InboxIcon />} label={<span className="density-debug-text">Archived</span>} />
      <Chip
        label={<span className="density-debug-text">In review</span>}
        variant="outlined"
        onDelete={() => {}}
      />
      <Chip
        label={<span className="density-debug-text">Bug</span>}
        color="error"
        size="small"
        onDelete={() => {}}
      />
      <Chip
        label={<span className="density-debug-text">Draft</span>}
        size="small"
        variant="outlined"
      />
    </Box>
  );
}

function AccordionMatrix() {
  return (
    <Box sx={{ mt: 1, width: 360 }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="density-accordion1-content"
          id="density-accordion1-header"
        >
          <Typography component="span" className="density-debug-text">
            Accordion 1
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <span className="density-debug-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </span>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="density-accordion2-content"
          id="density-accordion2-header"
        >
          <Typography component="span" className="density-debug-text">
            Accordion 2
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <span className="density-debug-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </span>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

function RadioGroupDemo({ size }: { size: 'small' | 'medium' }) {
  return (
    <FormControl>
      <FormLabel sx={{ typography: 'caption' }}>Shipping ({size})</FormLabel>
      <RadioGroup defaultValue="standard" name={`shipping-${size}`}>
        {['Standard', 'Priority', 'Express'].map((label) => (
          <FormControlLabel
            key={label}
            value={label.toLowerCase()}
            control={<Radio size={size} />}
            label={<span className="density-debug-text">{label}</span>}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

function RadioMatrix() {
  return (
    <Stack
      direction="row"
      spacing={6}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      <RadioGroupDemo size="medium" />
      <RadioGroupDemo size="small" />
    </Stack>
  );
}

function BreadcrumbsMatrix() {
  return (
    <Breadcrumbs sx={{ mt: 1 }}>
      <Link underline="hover" color="inherit" href="#">
        <span className="density-debug-text">Home</span>
      </Link>
      <Link underline="hover" color="inherit" href="#">
        <span className="density-debug-text">Catalog</span>
      </Link>
      <Typography color="text.primary">
        <span className="density-debug-text">Current</span>
      </Typography>
    </Breadcrumbs>
  );
}

function ToggleButtonMatrix() {
  return (
    <Stack spacing={2} sx={{ mt: 1, alignItems: 'flex-start' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Stack
          key={size}
          direction="row"
          spacing={1.5}
          useFlexGap
          sx={{ alignItems: 'center', flexWrap: 'wrap' }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ width: 52 }}>
            {size}
          </Typography>
          <ToggleButtonGroup value="left" size={size} exclusive aria-label="text alignment">
            <ToggleButton value="left" aria-label="align left">
              <FormatAlignLeftIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="center" aria-label="align center">
              <FormatAlignCenterIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="right" aria-label="align right">
              <FormatAlignRightIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      ))}
    </Stack>
  );
}

function AvatarMatrix() {
  return (
    <Stack
      direction="row"
      spacing={2}
      useFlexGap
      sx={{ mt: 1, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Avatar>A</Avatar>
      <Avatar>B</Avatar>
    </Stack>
  );
}

function BadgeMatrix() {
  return (
    <Stack
      direction="row"
      spacing={4}
      useFlexGap
      sx={{ mt: 1, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Badge badgeContent={4} color="primary">
        <InboxIcon />
      </Badge>
      <Badge variant="dot" color="primary">
        <InboxIcon />
      </Badge>
    </Stack>
  );
}

function ButtonGroupMatrix() {
  return (
    <ButtonGroup variant="outlined" sx={{ mt: 1 }}>
      <Button>
        <span className="density-debug-text">One</span>
      </Button>
      <Button>
        <span className="density-debug-text">Two</span>
      </Button>
      <Button>
        <span className="density-debug-text">Three</span>
      </Button>
    </ButtonGroup>
  );
}

const DESSERT_ROWS = [
  { name: 'Frozen yoghurt', calories: 159, fat: 6.0 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0 },
  { name: 'Eclair', calories: 262, fat: 16.0 },
  { name: 'Cupcake', calories: 305, fat: 3.7 },
];

function TableCellMatrix() {
  // Covers all four padding leaves: size=medium/small (the two tables), the
  // leading padding="checkbox" cells, and the trailing padding="none" actions.
  return (
    <Stack spacing={4} sx={{ mt: 1, width: 440 }}>
      {(['medium', 'small'] as const).map((size) => (
        <div key={size}>
          <Typography variant="caption" color="text.secondary">
            {size}
          </Typography>
          <Table size={size}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox size="small" />
                </TableCell>
                <TableCell>
                  <span className="density-debug-text">Dessert</span>
                </TableCell>
                <TableCell align="right">
                  <span className="density-debug-text">Calories</span>
                </TableCell>
                <TableCell align="right">
                  <span className="density-debug-text">Fat&nbsp;(g)</span>
                </TableCell>
                <TableCell padding="none" align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {DESSERT_ROWS.map((row, i) => (
                <TableRow key={row.name}>
                  <TableCell padding="checkbox">
                    <Checkbox size="small" defaultChecked={i === 0} />
                  </TableCell>
                  <TableCell>
                    <span className="density-debug-text">{row.name}</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="density-debug-text">{row.calories}</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="density-debug-text">{row.fat.toFixed(1)}</span>
                  </TableCell>
                  <TableCell padding="none" align="right">
                    <IconButton size="small" aria-label="more">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </Stack>
  );
}

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Elderberry', 'Fig'];
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];

function AutocompleteMatrix() {
  return (
    // Row so the forced-open listbox (absolutely positioned) sits beside the
    // multiple demo instead of overlapping it; minHeight reserves its height.
    <Stack
      direction="row"
      spacing={4}
      useFlexGap
      sx={{ mt: 1, minHeight: 260, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      <Autocomplete
        open
        disablePortal
        options={FRUITS}
        sx={{ width: 260 }}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <span className="density-debug-text">{option}</span>
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label={<span className="density-debug-text">Fruit</span>} />
        )}
      />
      <Stack spacing={2} sx={{ width: 500 }}>
        <Autocomplete
          id="size-small-standard"
          size="small"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={top100Films[13]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label={<span className="density-debug-text">Size small</span>}
              placeholder="Favorites"
            />
          )}
        />
        <Autocomplete
          multiple
          id="size-small-standard-multi"
          size="small"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[13]]}
          renderValue={(values, getItemProps) =>
            values.map((option, index) => {
              const { key, ...itemProps } = getItemProps({ index });
              return (
                <Chip
                  key={key}
                  variant="outlined"
                  label={<span className="density-debug-text">{option.title}</span>}
                  size="small"
                  {...itemProps}
                />
              );
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label={<span className="density-debug-text">Size small</span>}
              placeholder="Favorites"
            />
          )}
        />
        <Autocomplete
          id="size-small-outlined"
          size="small"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={top100Films[13]}
          renderInput={(params) => (
            <TextField
              {...params}
              label={<span className="density-debug-text">Size small</span>}
              placeholder="Favorites"
            />
          )}
        />
        <Autocomplete
          multiple
          id="size-small-outlined-multi"
          size="small"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[13]]}
          renderValue={(values, getItemProps) =>
            values.map((option, index) => {
              const { key, ...itemProps } = getItemProps({ index });
              return (
                <Chip
                  key={key}
                  variant="outlined"
                  label={<span className="density-debug-text">{option.title}</span>}
                  size="small"
                  {...itemProps}
                />
              );
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={<span className="density-debug-text">Size small</span>}
              placeholder="Favorites"
            />
          )}
        />
        <Autocomplete
          id="size-small-filled"
          size="small"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={top100Films[13]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label={<span className="density-debug-text">Size small</span>}
              placeholder="Favorites"
            />
          )}
        />
        <Autocomplete
          multiple
          id="size-small-filled-multi"
          size="small"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[13]]}
          renderValue={(values, getItemProps) =>
            values.map((option, index) => {
              const { key, ...itemProps } = getItemProps({ index });
              return (
                <Chip
                  key={key}
                  variant="outlined"
                  label={<span className="density-debug-text">{option.title}</span>}
                  size="small"
                  {...itemProps}
                />
              );
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label={<span className="density-debug-text">Size small</span>}
              placeholder="Favorites"
            />
          )}
        />
      </Stack>
    </Stack>
  );
}

function StepperMatrix() {
  return (
    <Stepper activeStep={1} sx={{ mt: 1, width: 360 }}>
      {['Cart', 'Shipping', 'Payment'].map((label) => (
        <Step key={label}>
          <StepLabel>
            <span className="density-debug-text">{label}</span>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

function ToolbarMatrix() {
  return (
    <Stack spacing={2} sx={{ mt: 1, width: 420 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <span className="density-debug-text">Regular</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6">
            <span className="density-debug-text">Dense</span>
          </Typography>
        </Toolbar>
      </AppBar>
    </Stack>
  );
}

function FabMatrix() {
  return (
    <Stack
      direction="row"
      spacing={2}
      useFlexGap
      sx={{ mt: 1, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Fab size="small" color="primary">
        <InboxIcon />
      </Fab>
      <Fab size="medium" color="primary">
        <InboxIcon />
      </Fab>
      <Fab color="primary">
        <InboxIcon />
      </Fab>
    </Stack>
  );
}

function PaginationMatrix() {
  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <Pagination count={5} size="small" />
      <Pagination count={5} />
      <Pagination count={5} size="large" />
    </Stack>
  );
}

function SnackbarMatrix() {
  return (
    <SnackbarContent
      message={<span className="density-debug-text">Something happened</span>}
      action={
        <Button color="secondary" size="small">
          <span className="density-debug-text">Undo</span>
        </Button>
      }
      sx={{ mt: 1, width: 320 }}
    />
  );
}

function BottomNavigationMatrix() {
  return (
    <BottomNavigation value={0} showLabels sx={{ mt: 1, width: 400 }}>
      <BottomNavigationAction
        label={<span className="density-debug-text">Recents</span>}
        icon={<InboxIcon />}
      />
      <BottomNavigationAction
        label={<span className="density-debug-text">Favorites</span>}
        icon={<InboxIcon />}
      />
      <BottomNavigationAction
        label={<span className="density-debug-text">Nearby</span>}
        icon={<InboxIcon />}
      />
    </BottomNavigation>
  );
}

function DialogMatrix() {
  // `dividers` on the content covers its distinct padding leaf.
  return (
    <Paper sx={{ mt: 1, width: 360 }}>
      <DialogTitle>
        <span className="density-debug-text">Use location service?</span>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2">
          <span className="density-debug-text">
            Let apps use your location to find nearby places. You can turn this off anytime in
            settings.
          </span>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button>
          <span className="density-debug-text">Disagree</span>
        </Button>
        <Button variant="contained">
          <span className="density-debug-text">Agree</span>
        </Button>
      </DialogActions>
    </Paper>
  );
}

// `dense` toggles the whole nav list — dense and default rows don't mix in a
// real sidebar, so density is two separate lists.
function NavListDemo({ dense = false }: { dense?: boolean }) {
  const items = ['Inbox', 'Starred', 'Sent', 'Drafts'];
  return (
    <div>
      <Typography variant="caption" color="text.secondary">
        {dense ? 'dense' : 'default'}
      </Typography>
      <List sx={{ width: 220, border: '1px solid', borderColor: 'divider' }}>
        {items.map((label, i) => (
          <ListItemButton key={label} dense={dense} selected={i === 1}>
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={<span className="density-debug-text">{label}</span>} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

function ListItemButtonMatrix() {
  return (
    <Stack
      direction="row"
      spacing={4}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      <NavListDemo />
      <NavListDemo dense />
    </Stack>
  );
}

const TYPOGRAPHY_VARIANTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
] as const;

function TypographyMatrix() {
  return (
    <Stack spacing={1.5} sx={{ mt: 1 }}>
      {TYPOGRAPHY_VARIANTS.map((variant) => (
        <Box key={variant} data-variant-section={variant}>
          <Typography variant="caption" color="text.secondary">
            {variant}
          </Typography>
          <Typography variant={variant}>
            {variant === 'h1' || variant === 'h2' || variant === 'h3'
              ? 'The quick brown fox'
              : 'The quick brown fox jumps over the lazy dog'}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

// Theme-token canvas previews, keyed by layout tab id.
const THEME_TOKEN_PREVIEW: Record<Exclude<TabKey, 'components'>, () => React.ReactNode> = {
  typography: () => (
    <Stack spacing={2} sx={{ mt: 1, alignItems: 'flex-start' }}>
      <TypographyMatrix />
      <Box data-variant-section="button">
        <Typography variant="caption" color="text.secondary">
          button
        </Typography>
        <Box sx={{ mt: 0.5 }}>
          <Button variant="contained">Button label</Button>
        </Box>
      </Box>
    </Stack>
  ),
  // Components that inherit theme.shape.borderRadius.
  radius: () => (
    <Stack direction="row" spacing={3} sx={{ mt: 1, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="contained">Button</Button>
      <Button variant="outlined">Outlined</Button>
      <TextField size="small" label="Outlined" />
      <Chip label="Chip" />
      <Paper variant="outlined" sx={{ px: 2, py: 1 }}>
        Paper
      </Paper>
      <Card variant="outlined">
        <CardContent>Card</CardContent>
      </Card>
    </Stack>
  ),
};

// Typography lives in the theme-token section now (theme.typography), not here —
// TypographyMatrix is reused as that panel's canvas preview.
const COMPONENT_DEFS = {
  Button: {
    canvasLabel: 'Button (color="primary")',
    Matrix: React.memo(ButtonMatrix),
  },
  Menu: {
    canvasLabel: 'Menu — static list + popover (default + dense)',
    Matrix: React.memo(MenuMatrix),
  },
  Tooltip: {
    canvasLabel: 'Tooltip — pointer (default + arrow); touch out of scope',
    Matrix: React.memo(TooltipMatrix),
  },
  TextField: {
    canvasLabel: 'TextField — outlined / filled / standard (size axis + label bridge)',
    Matrix: React.memo(TextFieldMatrix),
  },
  Tabs: {
    canvasLabel: 'Tabs — text / icon-top / icon-start (Tab+Tabs minHeight paired)',
    Matrix: React.memo(TabsMatrix),
  },
  Checkbox: {
    canvasLabel: 'Checkbox — touch-target padding (medium + small)',
    Matrix: React.memo(CheckboxMatrix),
  },
  Radio: {
    canvasLabel: 'Radio — touch-target padding (medium + small)',
    Matrix: React.memo(RadioMatrix),
  },
  Avatar: {
    canvasLabel: 'Avatar — square size (raw px)',
    Matrix: React.memo(AvatarMatrix),
  },
  Fab: {
    canvasLabel: 'Fab — circular size (small / medium / large)',
    Matrix: React.memo(FabMatrix),
  },
  Pagination: {
    canvasLabel: 'Pagination — item box size (small / medium / large)',
    Matrix: React.memo(PaginationMatrix),
  },
  SnackbarContent: {
    canvasLabel: 'SnackbarContent — root padding',
    Matrix: React.memo(SnackbarMatrix),
  },
  BottomNavigation: {
    canvasLabel: 'BottomNavigation — bar height + action inline padding',
    Matrix: React.memo(BottomNavigationMatrix),
  },
  Dialog: {
    canvasLabel: 'Dialog — title / content / actions padding',
    Matrix: React.memo(DialogMatrix),
  },
  ListItemButton: {
    canvasLabel: 'ListItemButton — block padding (+ dense) + gutters',
    Matrix: React.memo(ListItemButtonMatrix),
  },
  ButtonGroup: {
    canvasLabel: 'ButtonGroup — grouped-button min-width floor',
    Matrix: React.memo(ButtonGroupMatrix),
  },
  TableCell: {
    canvasLabel: 'TableCell — block padding per size + inline padding',
    Matrix: React.memo(TableCellMatrix),
  },
  Autocomplete: {
    canvasLabel: 'Autocomplete — option list min-height + padding (open)',
    Matrix: React.memo(AutocompleteMatrix),
  },
  Stepper: {
    canvasLabel: 'Stepper — step gutter + icon→label gap',
    Matrix: React.memo(StepperMatrix),
  },
  Toolbar: {
    canvasLabel: 'AppBar/Toolbar — gutter padding + dense min-height',
    Matrix: React.memo(ToolbarMatrix),
  },
  Badge: {
    canvasLabel: 'Badge — bubble size + padding (standard / dot)',
    Matrix: React.memo(BadgeMatrix),
  },
  ToggleButton: {
    canvasLabel: 'ToggleButton — uniform padding (small/medium/large)',
    Matrix: React.memo(ToggleButtonMatrix),
  },
  Breadcrumbs: {
    canvasLabel: 'Breadcrumbs — separator inline gap',
    Matrix: React.memo(BreadcrumbsMatrix),
  },
  Card: {
    canvasLabel: 'Card — header / content / actions padding + gaps',
    Matrix: React.memo(CardMatrix),
  },
  Rating: {
    canvasLabel: 'Rating — star size (typography/icon axis)',
    Matrix: React.memo(RatingMatrix),
  },
  Select: {
    canvasLabel: 'Select — content-box floor (padding via its OutlinedInput)',
    Matrix: React.memo(SelectMatrix),
  },
  SvgIcon: {
    canvasLabel: 'SvgIcon — global size per fontSize variant (compact-only emission)',
    Matrix: React.memo(SvgIconMatrix),
  },
  Alert: {
    canvasLabel: 'Alert — root padding + icon gap',
    Matrix: React.memo(AlertMatrix),
  },
  Chip: {
    canvasLabel: 'Chip — height (drives avatar/icon) + label inline padding',
    Matrix: React.memo(ChipMatrix),
  },
  Accordion: {
    canvasLabel: 'Accordion — summary min-height/margin/pad + details padding',
    Matrix: React.memo(AccordionMatrix),
  },
} satisfies Record<string, DensityComponentDef>;

type ComponentName = keyof typeof COMPONENT_DEFS;
type Selection = 'All' | ComponentName;

// The active-preset default for a registered field: read straight off the
// generated table (the value enhance*Density actually emits). Density leaves
// echo their step key (e.g. 'xs'); sizing leaves echo raw px. Placeholder only.
type PresetLevel = 'compact' | 'normal' | 'comfort';

// Field ids absorbed into a virtual knob — hidden as individual inputs, driven
// by the combined control instead.
const virtualMemberIds = new Set(densityVirtualKnobs.flatMap((k) => k.members));
const virtualKnobsByGroup = (group: string): DensityVirtualKnob[] =>
  densityVirtualKnobs.filter((k) => k.group === group);

// One sidebar control (a real field or a virtual knob), carrying the component +
// slot it nests under and the ids it writes.
interface KnobEntry {
  key: string;
  writeIds: string[];
  label: string;
  component: string; // public export short name (no `Mui`)
  slot: string;
}

function buildKnobEntries(group: (typeof densityGroups)[number]): KnobEntry[] {
  const entries: KnobEntry[] = [];
  for (const id of group.fields) {
    if (virtualMemberIds.has(id)) {
      continue; // shown via its virtual knob below
    }
    const row = densityRow(id);
    if (!row) {
      continue;
    }
    entries.push({
      key: id,
      writeIds: [id],
      label: knobLabel(id),
      component: row.target.component.replace(/^Mui/, ''),
      slot: row.target.slot,
    });
  }
  for (const knob of virtualKnobsByGroup(group.key)) {
    const row = densityRow(knob.members[0]);
    const slot = row ? row.target.slot : 'root';
    const rawComponent = row ? row.target.component : `Mui${group.key}`;
    entries.push({
      key: knob.id,
      writeIds: knob.members,
      label: stripComponentSlot(knob.label, rawComponent, slot),
      component: rawComponent.replace(/^Mui/, ''),
      slot,
    });
  }
  return entries;
}

const fieldDefault = (id: string, preset: PresetLevel): string => {
  const row = densityRow(id);
  if (!row) {
    return '';
  }
  return (row.isDensity ? row.densityKey : row.values[preset]) ?? '';
};

// Per-family knob structure, precomputed ONCE at module scope — pure over static
// registry data, so rebuilding it per render (the old inline path) only burned
// time and defeated memoization. Entries flatten, then nest component → slot with
// the family's component order and root-first slot order applied.
const familyKnobEntries = new Map(densityGroups.map((g) => [g.key, buildKnobEntries(g)]));

interface FamilyComponentGroup {
  component: string;
  slots: ReadonlyArray<readonly [string, KnobEntry[]]>;
}

const familyKnobTree = new Map<string, FamilyComponentGroup[]>(
  densityGroups.map((group) => {
    const byComponent = new Map<string, Map<string, KnobEntry[]>>();
    for (const entry of familyKnobEntries.get(group.key)!) {
      if (!byComponent.has(entry.component)) {
        byComponent.set(entry.component, new Map());
      }
      const bySlot = byComponent.get(entry.component)!;
      if (!bySlot.has(entry.slot)) {
        bySlot.set(entry.slot, []);
      }
      bySlot.get(entry.slot)!.push(entry);
    }
    const ordered = orderFamilyComponents(group.key, [...byComponent.keys()]).map((component) => ({
      component,
      slots: [...byComponent.get(component)!].sort(([a], [b]) => {
        // `root` always leads, then the rest alphabetically.
        if (a === 'root') {
          return -1;
        }
        if (b === 'root') {
          return 1;
        }
        return a.localeCompare(b);
      }),
    }));
    return [group.key, ordered];
  }),
);

// The ids a family's knobs READ (value + placeholder come off writeIds[0]) — the
// memo comparator diffs `mapping` over exactly these.
const familyReadIds = new Map(
  [...familyKnobEntries].map(([key, entries]) => [key, entries.map((entry) => entry.writeIds[0])]),
);

interface FamilyKnobsProps {
  familyKey: string;
  mapping: Record<string, string>;
  preset: Preset;
  scalePx: Record<string, string> | null;
  setFields: (ids: string[], value: string) => void;
}

// One family's mapping tree. Memo comparator: skip re-render unless THIS family's
// read ids changed — the WHOLE mapping is passed (a fresh slice object per render
// would defeat the memo) — or preset/scalePx/disabled flipped (stale-knob hazard:
// placeholders and previews all derive from those three).
const FamilyKnobs = React.memo(
  function FamilyKnobs(props: FamilyKnobsProps) {
    const { familyKey, mapping, preset, scalePx, setFields } = props;
    return (
      <React.Fragment>
        {(familyKnobTree.get(familyKey) ?? []).map(({ component, slots }) => (
          <Box key={component} sx={{ mt: 2 }} data-mapping-component={component}>
            <Typography sx={{ fontWeight: 'medium', fontSize: 13 }}>{component}</Typography>
            {slots.map(([slot, slotEntries]) => (
              <Box
                key={slot}
                data-mapping-slot={slot}
                sx={{ mt: 1, pl: 1.5, borderLeft: '1px solid', borderColor: 'divider' }}
              >
                <Typography variant="caption" color="text.secondary" sx={SLOT_TAG_SX}>
                  {slot}
                </Typography>
                <Stack spacing={1.5} sx={{ mt: 0.5 }}>
                  {slotEntries.map((entry) => {
                    const canon =
                      preset === 'unset'
                        ? ''
                        : fieldDefault(entry.writeIds[0], preset as PresetLevel);
                    return (
                      <KnobInput
                        key={entry.key}
                        id={entry.key}
                        idAttr="data-mapping-field"
                        label={entry.label}
                        value={mapping[entry.writeIds[0]] ?? ''}
                        // Placeholder = what you'd TYPE: var refs shortened to bare
                        // step names; override-only knobs (no preset default) stay blank.
                        placeholder={shortenDensityVars(canon)}
                        // error is display-only; the commit still stores the draft
                        // (the apply path skips rows that don't parse).
                        computeHelper={(draft) => {
                          const parsed = parseMapping(draft);
                          if (parsed.state === 'error') {
                            return { helper: parsed.error, error: true };
                          }
                          // typed → preview the typed value; empty → the inherited preset default
                          return { helper: previewText(draft || canon, scalePx) };
                        }}
                        onCommit={(v) => setFields(entry.writeIds, v)}
                      />
                    );
                  })}
                </Stack>
              </Box>
            ))}
          </Box>
        ))}
      </React.Fragment>
    );
  },
  (prev, next) =>
    prev.familyKey === next.familyKey &&
    prev.preset === next.preset &&
    prev.scalePx === next.scalePx &&
    prev.setFields === next.setFields &&
    (familyReadIds.get(next.familyKey) ?? []).every((id) => prev.mapping[id] === next.mapping[id]),
);

export default function DensityExperiment() {
  const [preset, setPreset] = React.useState<Preset>('unset');
  const [selection, setSelection] = React.useState<Selection>('All');
  const [debug, setDebug] = React.useState<string[]>([]);
  // Layout tab — drives both the sidebar content and the canvas.
  const [tab, setTab] = React.useState<TabKey>('components');
  const [howToOpen, setHowToOpen] = React.useState(false);

  // User overrides, keyed by generated-table row id — ONE WORKSPACE PER PRESET.
  // Overrides made under compact stay with compact: switch to normal → blank
  // knobs (normal's own empty state), switch back → compact's values return.
  // `unset` has no workspace (knobs disabled + blank).
  const [mappingByPreset, setMappingByPreset] = React.useState<
    Record<PresetLevel, Record<string, string>>
  >({ compact: {}, normal: {}, comfort: {} });
  const mapping = preset === 'unset' ? EMPTY_MAPPING : mappingByPreset[preset];

  // Shareable URL — read the query ONCE when the router is ready, then lift every
  // preset/tab/family change back into it (knob overrides stay out of the URL).
  const router = useRouter();
  const hydratedFromUrl = React.useRef(false);
  React.useEffect(() => {
    if (!router.isReady || hydratedFromUrl.current) {
      return;
    }
    hydratedFromUrl.current = true;
    const q = (k: string) =>
      Array.isArray(router.query[k]) ? router.query[k]![0] : router.query[k];
    // NOTE: PRESETS/TABS are `as const` tuples — `.includes(string)` fails tsgo (TS2345).
    // Widen to readonly string[] for the guard, then narrow with `as`.
    const p = q('preset');
    if (p && (PRESETS as readonly string[]).includes(p)) {
      setPreset(p as Preset);
    }
    const t = q('tab');
    if (t && (VISIBLE_TABS as readonly string[]).includes(t)) {
      setTab(t as TabKey);
    }
    const f = q('family');
    if (f && (f === 'All' || densityGroups.some((g) => g.key === f))) {
      setSelection(f as Selection);
    }
    // Invalid/missing params → the defaults already in state (unset / components / All).
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps -- router identity changes per route update; reading query once via the ref guard

  React.useEffect(() => {
    if (!hydratedFromUrl.current) {
      return; // don't clobber the deep link before the read effect ran
    }
    const query: Record<string, string> = {};
    if (preset !== 'unset') {
      query.preset = preset;
    }
    if (tab !== 'components') {
      query.tab = tab;
    }
    if (selection !== 'All') {
      query.family = selection;
    }
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
    // `router` intentionally OMITTED from deps: its identity changes on every route
    // update, so including it re-fires the effect after each replace → replace loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, tab, selection]);

  const mappingEnabled = preset !== 'unset';
  const visibleGroups =
    selection === 'All' ? densityGroups : densityGroups.filter((g) => g.key === selection);
  const visibleComponents = visibleGroups.map((g) => g.key) as ComponentName[];

  // Preset theme (no overrides) — drives placeholders/legend and is the base the
  // user overrides append onto.
  const presetTheme = React.useMemo(() => {
    const base = createTheme({ cssVariables: true });
    return preset === 'unset' ? base : PRESET_FN[preset](base);
  }, [preset]);

  // Canvas work (theme rebuild + emotion recompute across every matrix) trails
  // the committed mapping at lower priority — keystrokes land in the sidebar
  // immediately, the canvas catches up.
  const deferredMapping = React.useDeferredValue(mapping);

  // Apply = build each edit into the shape enhance*Density emits and append it
  // onto the preset theme's components (user layer wins by order). No GlobalStyles,
  // no class selectors — the merged theme IS what a real preset would emit.
  const canvasTheme = React.useMemo(() => {
    if (preset === 'unset') {
      return presetTheme;
    }
    // Shared collectors (collectEdits.ts) — the SAME path the export builder
    // uses, so the exported file encodes exactly what the canvas shows.
    const edits = collectDensityEdits(deferredMapping);
    let result: typeof presetTheme = presetTheme;
    if (edits.length) {
      const components = mergeOntoPreset(
        (presetTheme as unknown as { components?: Record<string, any> }).components ?? {},
        buildOverrides(edits),
      );
      result = { ...presetTheme, components } as typeof presetTheme;
    }
    // Theme-level token edits applied onto the theme object. Non-tokenized values
    // (typography) reflow straight from here; CSS-var-backed values (shape) are
    // read off a `var(...)` ref by components, so those are injected as a scoped
    // CSS var on the canvas instead (see `tokenCssVars`) — the raw set here is
    // still harmless/correct for any non-var consumer.
    for (const edit of collectThemeTokenEdits(deferredMapping)) {
      result = setThemeToken(result, edit.path, edit.value);
    }
    return result;
  }, [preset, presetTheme, deferredMapping]);

  // CSS-var-backed token edits (e.g. shape.borderRadius) reflow via their CSS var,
  // not the theme object — components read `var(--mui-shape-borderRadius, …)`. Map
  // each edited var to its value; injected scoped to the canvas so it doesn't leak
  // to the sidebar. Var name is parsed off the preset theme's own `var(...)` ref.
  const tokenCssVars = React.useMemo(() => {
    const vars = (presetTheme as unknown as { vars?: object }).vars;
    if (preset === 'unset' || !vars) {
      return undefined;
    }
    const out: Record<string, string> = {};
    for (const edit of collectThemeTokenEdits(deferredMapping)) {
      const match = /var\((--[\w-]+)/.exec(readThemeToken(vars, edit.path));
      if (!match) {
        continue; // not var-backed (typography) — applied via the theme object
      }
      out[match[1]] = typeof edit.value === 'number' ? `${edit.value}px` : edit.value;
    }
    return Object.keys(out).length ? out : undefined;
  }, [preset, presetTheme, deferredMapping]);

  // Active scale in px straight off the enhanced theme — single source of truth
  // for the legend + preview, so it can't drift from what the preset applied.
  const scalePx =
    preset === 'unset'
      ? null
      : (presetTheme as unknown as { density: Record<string, string> }).density;

  // Write one value to every id an entry drives (a plain field writes one, a
  // virtual knob writes all its members) — into the ACTIVE preset's workspace.
  // Identity is stable per preset (functional update); it changes on preset flip,
  // which re-renders FamilyKnobs anyway (its `preset` prop changed).
  const setFields = React.useCallback(
    (ids: string[], value: string) => {
      if (preset === 'unset') {
        return;
      }
      const level = preset as PresetLevel;
      setMappingByPreset((prev) => {
        const bucket = { ...prev[level] };
        for (const id of ids) {
          bucket[id] = value;
        }
        return { ...prev, [level]: bucket };
      });
    },
    [preset],
  );

  // Clears the ACTIVE preset's workspace only — other presets keep theirs.
  const resetMapping = () => {
    if (preset !== 'unset') {
      setMappingByPreset((prev) => ({ ...prev, [preset as PresetLevel]: {} }));
    }
  };

  // Export: self-contained density.ts with all three enhancers, each carrying
  // ITS OWN preset's edits (see exportPayload/buildExportSource). Enabled
  // regardless of preset — the file always contains all three.
  const handleExport = () => {
    const source = buildExportSource(buildExportInput(mappingByPreset));
    const blob = new Blob([source], { type: 'text/typescript' });
    const anchor = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: 'density.ts',
    });
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <Head title="Density — playground" description="enhanceDensity preset × token mapping" />

      {/* Title row — compact, single line. */}
      <Box
        sx={{
          px: 3,
          py: 0.75,
          borderBottom: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'baseline',
          gap: 1.5,
        }}
      >
        <Typography variant="subtitle2" component="h1">
          Density — playground
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Flip the preset · pick a component · remap its tokens to density steps
        </Typography>
        <Button
          size="small"
          onClick={() => setHowToOpen(true)}
          data-howto-button
          sx={{ ml: 'auto', alignSelf: 'center' }}
        >
          How to use
        </Button>
      </Box>
      <HowToUseDialog open={howToOpen} onClose={() => setHowToOpen(false)} />

      {/* Control bar — full width: preset (left) · visual debug (right). */}
      <Box
        sx={{
          px: 3,
          py: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="overline" color="text.secondary" component="span" id="preset-label">
            enhanceDensity
          </Typography>
          <RadioGroup
            row
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
                slotProps={{ typography: { variant: 'body2' } }}
              />
            ))}
          </RadioGroup>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="overline" color="text.secondary">
            Visual debug
          </Typography>
          <ToggleButtonGroup
            size="small"
            value={debug}
            onChange={(_event, next: string[]) => setDebug(next)}
            aria-label="visual debug overlays"
          >
            <ToggleButton
              value="padding"
              aria-label="highlight padding"
              data-debug-toggle="padding"
            >
              <Tooltip title="Padding highlight">
                <PaddingIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="text" aria-label="highlight text box" data-debug-toggle="text">
              <Tooltip title="Text bounding box">
                <TitleIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="outline" aria-label="outline boxes" data-debug-toggle="outline">
              <Tooltip title="Outline boxes">
                <BorderAllIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
          <Button variant="outlined" onClick={handleExport} data-export-button>
            Export density.ts
          </Button>
        </Box>
      </Box>

      {/* Layout tabs — third bar: what the sidebar + canvas show. */}
      <Box sx={{ px: 3, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <Tabs
          value={tab}
          onChange={(_event, next: TabKey) => setTab(next)}
          aria-label="playground layout tabs"
        >
          {VISIBLE_TABS.map((t) => (
            <Tab key={t} value={t} label={TAB_LABEL[t]} />
          ))}
        </Tabs>
      </Box>

      {/* Content — sidebar (fixed Component + scrollable mapping) · scrollable canvas. */}
      <Box sx={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <Box
          component="aside"
          sx={{
            width: 320,
            flexShrink: 0,
            borderRight: '1px solid',
            borderColor: 'divider',
            overflowY: 'auto',
          }}
        >
          {tab === 'components' && (
            <React.Fragment>
              <FormControl fullWidth size="small" sx={{ px: 3, pt: 1.5, pb: 1.5, flexShrink: 0 }}>
                <FormLabel id="component-label" sx={{ mb: 0.5 }}>
                  Component
                </FormLabel>
                <Select
                  aria-labelledby="component-label"
                  value={selection}
                  onChange={(event) => setSelection(event.target.value as Selection)}
                  slotProps={
                    { input: { 'data-component-select': true } } as Record<string, unknown>
                  }
                >
                  <MenuItem value="All">All</MenuItem>
                  {densityGroups.map((g) => (
                    <MenuItem key={g.key} value={g.key}>
                      {g.key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* No preset → no knobs at all: a banner asks for a preset instead
                  of rendering a disabled tree. */}
              {!mappingEnabled && (
                <Alert severity="info" data-density-banner sx={{ mx: 3, mb: 3 }}>
                  Select a density preset above to see the knobs.
                </Alert>
              )}
              {mappingEnabled && (
                <Box component="section" sx={{ px: 3, pb: 3 }}>
                  <Typography component="h2" sx={{ fontWeight: 'medium', fontSize: 14 }}>
                    Vars mapping
                  </Typography>
                  {scalePx && (
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
                  {visibleGroups.map((group) => (
                    <FamilyKnobs
                      key={group.key}
                      familyKey={group.key}
                      mapping={mapping}
                      preset={preset}
                      scalePx={scalePx}
                      setFields={setFields}
                    />
                  ))}
                  <Button size="small" variant="outlined" onClick={resetMapping} sx={{ mt: 2 }}>
                    Reset mapping
                  </Button>
                </Box>
              )}
            </React.Fragment>
          )}

          {/* Token tabs — theme.typography / theme.shape knobs (same edit path: mapping → theme). */}
          {tab !== 'components' && !mappingEnabled && (
            <Alert severity="info" data-density-banner sx={{ mx: 3, mt: 3 }}>
              Select a density preset above to see the knobs.
            </Alert>
          )}
          {tab !== 'components' &&
            mappingEnabled &&
            (() => {
              const group = themeTokenGroups.find((g) => g.key === TAB_TOKEN_GROUP[tab])!;
              return (
                <Box component="section" data-token-group={group.key} sx={{ px: 3, pt: 3, pb: 3 }}>
                  <Typography component="h2" sx={{ fontWeight: 'medium', fontSize: 14 }}>
                    {group.key}
                  </Typography>
                  {group.slots.map((slot) => (
                    <Box
                      key={slot.key || group.key}
                      data-token-slot={slot.key || 'root'}
                      sx={
                        slot.key
                          ? { mt: 1, pl: 1.5, borderLeft: '1px solid', borderColor: 'divider' }
                          : { mt: 1 }
                      }
                    >
                      {slot.key && (
                        <Typography variant="caption" color="text.secondary" sx={SLOT_TAG_SX}>
                          {slot.key}
                        </Typography>
                      )}
                      <Stack spacing={1.5} sx={{ mt: slot.key ? 0.5 : 0 }}>
                        {slot.knobs.map((knob) => {
                          // Same placeholder/helper rules as the mapping knobs:
                          // placeholder = what you'd type (vars shortened, blank when
                          // no default); helper = the resolved value of draft-or-default.
                          const canon = readThemeToken(presetTheme, knob.path);
                          return (
                            <KnobInput
                              key={knob.id}
                              id={knob.id}
                              idAttr="data-token-field"
                              label={knob.label}
                              value={mapping[knob.id] ?? ''}
                              placeholder={shortenDensityVars(canon)}
                              computeHelper={(draft) => {
                                const parsed = parseMapping(draft);
                                if (parsed.state === 'error') {
                                  return { helper: parsed.error, error: true };
                                }
                                return { helper: previewText(draft || canon, scalePx) };
                              }}
                              onCommit={(v) => setFields([knob.id], v)}
                            />
                          );
                        })}
                      </Stack>
                    </Box>
                  ))}
                </Box>
              );
            })()}
        </Box>

        {/* CANVAS — preset theme with user overrides appended (no GlobalStyles). */}
        <ThemeProvider theme={canvasTheme}>
          <CssBaseline />
          <Box
            id="density-canvas"
            data-debug-padding={debug.includes('padding') ? '' : undefined}
            data-debug-text={debug.includes('text') ? '' : undefined}
            data-debug-outline={debug.includes('outline') ? '' : undefined}
            style={tokenCssVars}
            sx={{ flex: 1, minHeight: 0, overflowY: 'auto', p: 4, ...DEBUG_SX }}
          >
            <Stack spacing={6}>
              {tab !== 'components' && (
                <Box data-token-preview={tab}>
                  <Typography variant="overline" color="text.secondary" component="div">
                    {TAB_TOKEN_GROUP[tab]} — theme token preview
                  </Typography>
                  {THEME_TOKEN_PREVIEW[tab]()}
                </Box>
              )}
              {tab === 'components' &&
                visibleComponents.map((comp) => {
                  const Def = COMPONENT_DEFS[comp];
                  return (
                    <Box key={comp} data-canvas-component={comp}>
                      {/* block label — inline-flex roots (Select/ButtonGroup) must drop below, not sit beside it */}
                      <Typography variant="overline" color="text.secondary" component="div">
                        {Def.canvasLabel}
                      </Typography>
                      <Box data-canvas-demo>
                        <Def.Matrix />
                      </Box>
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
