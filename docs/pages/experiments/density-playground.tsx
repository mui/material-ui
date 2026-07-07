'use client';
import * as React from 'react';
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
  stripComponentSlot,
} from 'docs/src/modules/components/density/densityFields';
import {
  densityVirtualKnobs,
  type DensityVirtualKnob,
} from 'docs/src/modules/components/density/densityExtraFields';
import {
  buildOverrides,
  mergeOntoPreset,
  type DensityEdit,
} from 'docs/src/modules/components/density/buildDensityOverrides';

const SCALE_KEYS = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
const PRESETS = ['unset', 'compact', 'normal', 'comfort'] as const;
const SIZES = ['small', 'medium', 'large'] as const;
const VARIANTS = ['text', 'outlined', 'contained'] as const;

type Preset = (typeof PRESETS)[number];

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
];

const DEBUG_SX = {
  '& .density-debug-text': { position: 'relative', zIndex: 1, borderRadius: '2px' },
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
  // Outline every box so density shifts (padding/height) read at a glance.
  // `outline` draws outside the box and takes no layout space → no reflow on toggle.
  // The debug-text label spans are excluded — they're overlay helpers, not real boxes.
  '&[data-debug-outline] *:not(.density-debug-text):not(path)': {
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

const isDensityKey = (t: string) => (SCALE_KEYS as readonly string[]).includes(t);
const tokenize = (input: string) => input.trim().split(/\s+/).filter(Boolean);

// A mapping input is ANY valid CSS value. A density key (`xxs`…`xxl`) is sugar
// for `var(--mui-density-<key>)`; anything else passes through verbatim as raw
// CSS (`12px`, `2rem`, `auto`). 1 token → all sides; 2 → `block inline`.
const resolveValue = (input: string) =>
  tokenize(input)
    .map((t) => (isDensityKey(t) ? `var(--mui-density-${t})` : t))
    .join(' ');

// Empty = inert (no override, no error). >2 tokens = error. Otherwise ok — raw
// values are first-class, never rejected as "not a density key".
function parseMapping(input: string): { state: 'empty' | 'ok' | 'error'; error?: string } {
  const tokens = tokenize(input);
  if (tokens.length === 0) {
    return { state: 'empty' };
  }
  if (tokens.length > 2) {
    return { state: 'error', error: 'max 2 values (block inline)' };
  }
  return { state: 'ok' };
}

// Human-readable resolved value: keys show their px (from the active scale),
// raw values echo as typed.
const previewText = (input: string, scalePx: Record<string, string> | null) =>
  tokenize(input)
    .map((t) => (isDensityKey(t) ? (scalePx?.[t] ?? t) : t))
    .join(' ');

// Each preset maps to its `enhance*Density` fn; `unset` applies none.
const PRESET_FN = {
  compact: enhanceCompactDensity,
  normal: enhanceNormalDensity,
  comfort: enhanceComfortDensity,
} as const;

// ---------------------------------------------------------------------------
// Density-component registry. Now a canvas registry only: `canvasLabel` +
// `renderMatrix` drive the demo panes. The editable fields + apply/read model
// live in the generated table (`emitTable.generated`) via `densityGroups`.
// `DensityField` / `fields` / `prefill` are the LEGACY field model, retained as
// inert data behind the matrices until the whole-registry sweep rebuilds this.
// ---------------------------------------------------------------------------
interface DensityField {
  key: string;
  label: string;
  selector: string;
  prop?: string | string[];
  resolve?: {
    mui: string;
    slot?: string;
    sample?: Record<string, unknown>;
    nested?: string;
  };
}
interface DensityComponentDef {
  canvasLabel: string;
  fields: DensityField[]; // legacy — no longer read by the sidebar
  prefill: Record<string, string>; // legacy
  note?: string; // legacy
  renderMatrix: () => React.ReactNode;
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
          <Stack direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center' }}>
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

// The Menu family's density tokens: List container block padding + MenuItem
// block/inline padding + min-height, keyed by the `dense` axis. Field key ===
// mapping-state key. Sizing tokens (`minHeight`) accept raw px like any other —
// a density key is just sugar; heights ship as raw px per preset.
const MENU_FIELDS: DensityField[] = [
  {
    key: 'listBlockPad',
    label: '--List-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiList-padding',
  },
  {
    key: 'blockPad',
    label: '--MenuItem-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiMenuItem-root:not(.MuiMenuItem-dense)',
  },
  {
    key: 'inlinePad',
    label: '--MenuItem-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiMenuItem-gutters:not(.MuiMenuItem-dense)',
  },
  {
    key: 'minHeight',
    label: '--MenuItem-minHeight',
    prop: 'minHeight',
    selector: '.MuiMenuItem-root:not(.MuiMenuItem-dense)',
    resolve: { mui: 'MuiMenuItem', sample: { dense: false } },
  },
  {
    key: 'denseBlockPad',
    label: '--MenuItem-dense-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiMenuItem-dense',
  },
  {
    key: 'denseInlinePad',
    label: '--MenuItem-dense-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiMenuItem-gutters.MuiMenuItem-dense',
  },
  {
    key: 'denseMinHeight',
    label: '--MenuItem-dense-minHeight',
    prop: 'minHeight',
    selector: '.MuiMenuItem-dense',
    resolve: { mui: 'MuiMenuItem', sample: { dense: true } },
  },
];

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
    <Stack direction="row" spacing={4} sx={{ mt: 1, alignItems: 'flex-start' }}>
      <MenuListDemo />
      <MenuListDemo dense />
      <div>
        <Button variant="outlined" onClick={(event) => setAnchorEl(event.currentTarget)}>
          Open menu
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuDemoItems />
        </Menu>
      </div>
    </Stack>
  );
}

// Tooltip density tokens (regular/pointer only — `touch` is out of scope).
// Padding + anchor offset are spacing (prefill density keys); arrow size ships
// as raw px per preset (read live off the theme), like MenuItem min-height.
const TOOLTIP_FIELDS: DensityField[] = [
  {
    key: 'blockPad',
    label: '--Tooltip-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiTooltip-tooltip',
  },
  {
    key: 'inlinePad',
    label: '--Tooltip-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiTooltip-tooltip',
  },
  // Offset is emitted as per-placement margins by the preset (4 placements, no
  // discriminating class) — the synthetic label is label/placeholder only.
  { key: 'offset', label: '--Tooltip-offset', selector: '.MuiTooltip-tooltip' },
  // Calc-coupled: the arrow's width + height (calc) both derive from this real var.
  { key: 'arrowSize', label: '--_arrowSize', selector: '.MuiTooltip-tooltip' },
];

function TooltipMatrix() {
  // Force open + inline (no portal) so the bubble sits inside the debug scope,
  // picks up the padding-ring / text-box overlays, and receives the canvas-scoped
  // token overrides.
  const slotProps = {
    popper: { disablePortal: true },
  } as const;
  // One tooltip per placement so the preset's 4 per-placement offset margins all
  // render; arrow on each also surfaces the arrow-size reflow.
  const tips = [
    { placement: 'top', label: 'Copy' },
    { placement: 'bottom', label: 'Edit' },
    { placement: 'left', label: 'Delete' },
    { placement: 'right', label: 'Share' },
  ] as const;
  return (
    <Stack direction="row" spacing={12} sx={{ mt: 4, mb: 8, minHeight: 120, alignItems: 'center' }}>
      {tips.map((t) => (
        <Tooltip
          key={t.placement}
          title={<span className="density-debug-text">{t.label}</span>}
          arrow
          open
          placement={t.placement}
          slotProps={slotProps}
        >
          <Button variant="outlined">{t.label}</Button>
        </Tooltip>
      ))}
    </Stack>
  );
}

function OutlinedInputMatrix() {
  return (
    <Stack direction="row" spacing={4} sx={{ mt: 1, alignItems: 'flex-start' }}>
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
    <Stack direction="row" spacing={4} sx={{ mt: 1, alignItems: 'flex-start' }}>
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
          label="Amount"
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
          label="Amount"
          variant="filled"
          size="small"
          slotProps={{
            input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          }}
        />
        <TextField
          label="Weight"
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
    <Stack direction="row" spacing={4} sx={{ mt: 1, alignItems: 'flex-start' }}>
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

// Tabs family: Tab default + icon+label states (block pad + min-height each) +
// shared inline pad + icon gaps (stack/inline), plus the paired Tabs-root
// min-height. Spacing → density keys; min-heights → raw px (read off the theme).
const TAB_FIELDS: DensityField[] = [
  {
    key: 'minHeight',
    label: '--Tab-minHeight',
    prop: 'minHeight',
    selector: '.MuiTab-root:not(.MuiTab-labelIcon)',
    resolve: { mui: 'MuiTab' },
  },
  {
    key: 'tabsMinHeight',
    label: '--Tabs-minHeight',
    prop: 'minHeight',
    selector: '.MuiTabs-root',
    resolve: { mui: 'MuiTabs' },
  },
  {
    key: 'iconLabelMinHeight',
    label: '--Tab-iconLabel-minHeight',
    prop: 'minHeight',
    selector: '.MuiTab-root.MuiTab-labelIcon',
    resolve: { mui: 'MuiTab', sample: { icon: true, label: true } },
  },
  {
    key: 'blockPad',
    label: '--Tab-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiTab-root:not(.MuiTab-labelIcon)',
  },
  {
    key: 'iconLabelBlockPad',
    label: '--Tab-iconLabel-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiTab-root.MuiTab-labelIcon',
  },
  { key: 'inlinePad', label: '--Tab-inlinePad', prop: 'paddingInline', selector: '.MuiTab-root' },
  // var-mode: one gap var → icon margin per iconPosition (top/bottom, start/end; no class).
  { key: 'iconStackGap', label: '--Tab-icon-stackGap', selector: '.MuiTab-root' },
  { key: 'iconInlineGap', label: '--Tab-icon-inlineGap', selector: '.MuiTab-root' },
];

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
    </Stack>
  );
}

// Checkbox family: the touch-target padding around the icon, per size (via
// SwitchBase). All spacing → density keys.
const CHECKBOX_FIELDS: DensityField[] = [
  {
    key: 'mediumPad',
    label: '--Checkbox-medium-pad',
    prop: 'padding',
    selector: '.MuiCheckbox-root.MuiCheckbox-sizeMedium',
  },
  {
    key: 'smallPad',
    label: '--Checkbox-small-pad',
    prop: 'padding',
    selector: '.MuiCheckbox-root.MuiCheckbox-sizeSmall',
  },
];

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
    <Stack direction="row" spacing={6} sx={{ mt: 1, alignItems: 'flex-start' }}>
      <CheckboxGroupDemo size="medium" />
      <CheckboxGroupDemo size="small" />
    </Stack>
  );
}

// Card family: CardContent padding (+ last-child), CardActions/CardHeader padding
// + gaps — all preset-reflowed via emitted overrides (no size axis).
const CARD_FIELDS: DensityField[] = [
  { key: 'pad', label: '--CardContent-pad', prop: 'padding', selector: '.MuiCardContent-root' },
  {
    key: 'padBottom',
    label: '--CardContent-padBottom',
    prop: 'paddingBottom',
    selector: '.MuiCardContent-root:last-child',
  },
  {
    key: 'actionsPad',
    label: '--CardActions-pad',
    prop: 'padding',
    selector: '.MuiCardActions-root',
  },
  {
    key: 'actionsGap',
    label: '--CardActions-childGap',
    prop: 'marginLeft',
    selector: '.MuiCardActions-spacing > :not(:first-of-type)',
  },
  {
    key: 'headerPad',
    label: '--CardHeader-pad',
    prop: 'padding',
    selector: '.MuiCardHeader-root',
  },
  {
    key: 'headerAvatarGap',
    label: '--CardHeader-avatarGap',
    prop: 'marginRight',
    selector: '.MuiCardHeader-avatar',
  },
];

function CardMatrix() {
  return (
    <Card variant="outlined" sx={{ mt: 1, width: 300 }}>
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        title={<span className="density-debug-text">Card header</span>}
        subheader="With avatar"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <span className="density-debug-text">Body content with last-child bottom padding.</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn more</Button>
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

// Select family: the content-box min-height floor (raw px). The visible density
// mostly comes from the underlying OutlinedInput padding (tokenized separately).
const SELECT_FIELDS: DensityField[] = [
  {
    key: 'minHeight',
    label: '--Select-minHeight',
    prop: 'minHeight',
    selector: '.MuiSelect-select',
    resolve: { mui: 'MuiSelect', slot: 'select' },
  },
];

function SelectMatrix() {
  return (
    <FormControl sx={{ mt: 1, width: 220 }}>
      <InputLabel id="pg-select-label">Age</InputLabel>
      <Select labelId="pg-select-label" value={10} label="Age">
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
    </FormControl>
  );
}

// Alert family: root block/inline padding + icon→message gap (no size axis).
const ALERT_FIELDS: DensityField[] = [
  { key: 'blockPad', label: '--Alert-blockPad', prop: 'paddingBlock', selector: '.MuiAlert-root' },
  {
    key: 'inlinePad',
    label: '--Alert-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiAlert-root',
  },
  // iconGap drives the icon's marginRight (child element).
  { key: 'iconGap', label: '--Alert-iconGap', prop: 'marginRight', selector: '.MuiAlert-icon' },
];

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

// Chip family: height (per size — drives avatar/icon/deleteIcon via calc) +
// label inline padding (per size). Height = raw px; padInline = density keys.
const CHIP_FIELDS: DensityField[] = [
  // Calc-coupled var-mode: the single `--_height` (scoped per size) drives
  // avatar/icon/deleteIcon dims via calc — write the var so the derived children
  // scale too (writing `height` would move only the box).
  {
    key: 'mediumHeight',
    label: '--_height',
    selector: '.MuiChip-root.MuiChip-sizeMedium',
    resolve: { mui: 'MuiChip', sample: { size: 'medium' } },
  },
  {
    key: 'smallHeight',
    label: '--_height',
    selector: '.MuiChip-root.MuiChip-sizeSmall',
    resolve: { mui: 'MuiChip', sample: { size: 'small' } },
  },
  {
    key: 'mediumPadInline',
    label: '--Chip-medium-padInline',
    prop: 'paddingInline',
    selector: '.MuiChip-sizeMedium .MuiChip-label',
  },
  {
    key: 'smallPadInline',
    label: '--Chip-small-padInline',
    prop: 'paddingInline',
    selector: '.MuiChip-sizeSmall .MuiChip-label',
  },
];

function ChipMatrix() {
  return (
    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1, width: 400 }}>
      <Chip avatar={<Avatar>N</Avatar>} label="Natacha" onDelete={() => {}} />
      <Chip icon={<InboxIcon />} label="Archived" />
      <Chip label="In review" variant="outlined" onDelete={() => {}} />
      <Chip label="Bug" color="error" size="small" onDelete={() => {}} />
      <Chip label="Draft" size="small" variant="outlined" />
    </Box>
  );
}

// Accordion family: Summary collapsed/expanded min-height + inline pad +
// content block margin; Details top/inline/bottom padding. min-heights = raw px,
// the rest = density keys.
const ACCORDION_FIELDS: DensityField[] = [
  {
    key: 'minHeight',
    label: '--AccordionSummary-minHeight',
    prop: 'minHeight',
    selector: '.MuiAccordionSummary-root:not(.Mui-expanded)',
    resolve: { mui: 'MuiAccordionSummary' },
  },
  {
    key: 'expandedMinHeight',
    label: '--AccordionSummary-expandedMinHeight',
    prop: 'minHeight',
    selector: '.MuiAccordionSummary-root.Mui-expanded',
    resolve: {
      mui: 'MuiAccordionSummary',
      sample: { disableGutters: false },
      nested: '&.Mui-expanded',
    },
  },
  {
    key: 'inlinePad',
    label: '--AccordionSummary-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiAccordionSummary-root',
  },
  {
    key: 'marginBlock',
    label: '--AccordionSummary-marginBlock',
    prop: 'marginBlock',
    selector: '.MuiAccordionSummary-content:not(.Mui-expanded)',
  },
  {
    key: 'expandedMarginBlock',
    label: '--AccordionSummary-expandedMarginBlock',
    prop: 'marginBlock',
    selector: '.MuiAccordionSummary-content.Mui-expanded',
  },
  {
    key: 'detailsTopPad',
    label: '--AccordionDetails-topPad',
    prop: 'paddingTop',
    selector: '.MuiAccordionDetails-root',
  },
  {
    key: 'detailsInlinePad',
    label: '--AccordionDetails-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiAccordionDetails-root',
  },
  {
    key: 'detailsBottomPad',
    label: '--AccordionDetails-bottomPad',
    prop: 'paddingBottom',
    selector: '.MuiAccordionDetails-root',
  },
];

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

// Radio family: touch-target padding per size (via SwitchBase, like Checkbox).
const RADIO_FIELDS: DensityField[] = [
  {
    key: 'mediumPad',
    label: '--Radio-medium-pad',
    prop: 'padding',
    selector: '.MuiRadio-root:not(.MuiRadio-sizeSmall)',
  },
  {
    key: 'smallPad',
    label: '--Radio-small-pad',
    prop: 'padding',
    selector: '.MuiRadio-root.MuiRadio-sizeSmall',
  },
];

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
    <Stack direction="row" spacing={6} sx={{ mt: 1, alignItems: 'flex-start' }}>
      <RadioGroupDemo size="medium" />
      <RadioGroupDemo size="small" />
    </Stack>
  );
}

// Breadcrumbs family: the separator inline gap (single token, no size axis).
const BREADCRUMBS_FIELDS: DensityField[] = [
  {
    key: 'separatorGap',
    label: '--Breadcrumbs-separatorGap',
    prop: 'marginInline',
    selector: '.MuiBreadcrumbs-separator',
  },
];

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

// ToggleButton family: uniform padding per size.
const TOGGLE_BUTTON_FIELDS: DensityField[] = [
  {
    key: 'smallPad',
    label: '--ToggleButton-small-pad',
    prop: 'padding',
    selector: '.MuiToggleButton-root.MuiToggleButton-sizeSmall',
  },
  {
    key: 'mediumPad',
    label: '--ToggleButton-medium-pad',
    prop: 'padding',
    selector: '.MuiToggleButton-root.MuiToggleButton-sizeMedium',
  },
  {
    key: 'largePad',
    label: '--ToggleButton-large-pad',
    prop: 'padding',
    selector: '.MuiToggleButton-root.MuiToggleButton-sizeLarge',
  },
];

function ToggleButtonMatrix() {
  return (
    <Stack spacing={2} sx={{ mt: 1, alignItems: 'flex-start' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
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

// Avatar family: the square size (raw px; no size prop).
const AVATAR_FIELDS: DensityField[] = [
  {
    key: 'size',
    label: '--Avatar-size',
    prop: ['width', 'height'],
    selector: '.MuiAvatar-root',
    resolve: { mui: 'MuiAvatar' },
  },
];

function AvatarMatrix() {
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 1, alignItems: 'center' }}>
      <Avatar>A</Avatar>
      <Avatar>B</Avatar>
    </Stack>
  );
}

// Badge family: bubble size + padding, per state (standard / dot).
const BADGE_FIELDS: DensityField[] = [
  {
    key: 'standardSize',
    label: '--Badge-standard-size',
    prop: ['minWidth', 'height'],
    selector: '.MuiBadge-badge.MuiBadge-standard',
    resolve: { mui: 'MuiBadge', slot: 'badge', sample: { variant: 'standard' } },
  },
  {
    key: 'standardPad',
    label: '--Badge-standard-pad',
    prop: 'padding',
    selector: '.MuiBadge-badge.MuiBadge-standard',
  },
  {
    key: 'dotSize',
    label: '--Badge-dot-size',
    prop: ['minWidth', 'height'],
    selector: '.MuiBadge-badge.MuiBadge-dot',
    resolve: { mui: 'MuiBadge', slot: 'badge', sample: { variant: 'dot' } },
  },
];

function BadgeMatrix() {
  return (
    <Stack direction="row" spacing={4} sx={{ mt: 1, alignItems: 'center' }}>
      <Badge badgeContent={4} color="primary">
        <InboxIcon />
      </Badge>
      <Badge variant="dot" color="primary">
        <InboxIcon />
      </Badge>
    </Stack>
  );
}

// ButtonGroup family: the grouped-button min-width floor (raw px).
const BUTTON_GROUP_FIELDS: DensityField[] = [
  {
    key: 'minWidth',
    label: '--ButtonGroup-minWidth',
    prop: 'minWidth',
    selector: '.MuiButtonGroup-grouped',
    resolve: { mui: 'MuiButtonGroup', nested: '& .MuiButtonGroup-grouped' },
  },
];

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

// TableCell family: block padding per size (medium/small) + shared inline pad.
const TABLE_CELL_FIELDS: DensityField[] = [
  {
    key: 'mediumBlockPad',
    label: '--TableCell-medium-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiTableCell-root.MuiTableCell-sizeMedium',
  },
  {
    key: 'smallBlockPad',
    label: '--TableCell-small-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiTableCell-root.MuiTableCell-sizeSmall',
  },
  {
    key: 'inlinePad',
    label: '--TableCell-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiTableCell-root',
  },
];

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
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell padding="none" align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {DESSERT_ROWS.map((row, i) => (
                <TableRow key={row.name}>
                  <TableCell padding="checkbox">
                    <Checkbox size="small" defaultChecked={i === 0} />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat.toFixed(1)}</TableCell>
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

// Autocomplete family: the option list geometry (mirrors MenuItem). The input's
// density comes from its variant (tokenized separately).
const AUTOCOMPLETE_FIELDS: DensityField[] = [
  {
    key: 'optionMinHeight',
    label: '--Autocomplete-option-minHeight',
    prop: 'minHeight',
    selector: '.MuiAutocomplete-option',
    resolve: { mui: 'MuiAutocomplete', slot: 'listbox', nested: '& .MuiAutocomplete-option' },
  },
  {
    key: 'optionBlockPad',
    label: '--Autocomplete-option-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiAutocomplete-option',
  },
  {
    key: 'optionInlinePad',
    label: '--Autocomplete-option-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiAutocomplete-option',
  },
];

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
    <Stack direction="row" spacing={4} sx={{ mt: 1, minHeight: 260, alignItems: 'flex-start' }}>
      <Autocomplete
        open
        disablePortal
        options={FRUITS}
        sx={{ width: 260 }}
        renderInput={(params) => <TextField {...params} label="Fruit" />}
      />
      <Stack spacing={2} sx={{ width: 500 }}>
        <Autocomplete
          id="size-small-standard"
          size="small"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={top100Films[13]}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Size small" placeholder="Favorites" />
          )}
        />
        <Autocomplete
          multiple
          id="size-small-standard-multi"
          size="small"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[13]]}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Size small" placeholder="Favorites" />
          )}
        />
        <Autocomplete
          id="size-small-outlined"
          size="small"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={top100Films[13]}
          renderInput={(params) => (
            <TextField {...params} label="Size small" placeholder="Favorites" />
          )}
        />
        <Autocomplete
          multiple
          id="size-small-outlined-multi"
          size="small"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[13]]}
          renderInput={(params) => (
            <TextField {...params} label="Size small" placeholder="Favorites" />
          )}
        />
        <Autocomplete
          id="size-small-filled"
          size="small"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={top100Films[13]}
          renderInput={(params) => (
            <TextField {...params} variant="filled" label="Size small" placeholder="Favorites" />
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
                  label={option.title}
                  size="small"
                  {...itemProps}
                />
              );
            })
          }
          renderInput={(params) => (
            <TextField {...params} variant="filled" label="Size small" placeholder="Favorites" />
          )}
        />
      </Stack>
    </Stack>
  );
}

// Stepper family: Step horizontal gutter + StepLabel icon→label gap.
const STEPPER_FIELDS: DensityField[] = [
  // var-mode: one gutter var → first step padding-left / last step padding-right (no class).
  { key: 'inlinePad', label: '--Step-inlinePad', selector: '.MuiStep-root' },
  {
    key: 'iconGap',
    label: '--StepLabel-iconGap',
    prop: 'paddingRight',
    selector: '.MuiStepLabel-iconContainer',
  },
];

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

// Toolbar (AppBar) family: gutter inline padding (base + ≥sm) + dense min-height.
const TOOLBAR_FIELDS: DensityField[] = [
  // Gutter padding is emitted base + ≥sm on the one `.gutters` class (the media
  // bump has no discriminating selector) — synthetic label is label/placeholder only.
  { key: 'inlinePad', label: '--Toolbar-inlinePad', selector: '.MuiToolbar-gutters' },
  { key: 'wideInlinePad', label: '--Toolbar-wideInlinePad', selector: '.MuiToolbar-gutters' },
  {
    key: 'denseMinHeight',
    label: '--Toolbar-denseMinHeight',
    prop: 'minHeight',
    selector: '.MuiToolbar-dense',
    resolve: { mui: 'MuiToolbar', sample: { variant: 'dense' } },
  },
];

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

// Fab family: circular size per size (raw px).
const FAB_FIELDS: DensityField[] = [
  {
    key: 'smallSize',
    label: '--Fab-small-size',
    prop: ['width', 'height'],
    selector: '.MuiFab-root.MuiFab-sizeSmall',
    resolve: { mui: 'MuiFab', sample: { variant: 'circular', size: 'small' } },
  },
  {
    key: 'mediumSize',
    label: '--Fab-medium-size',
    prop: ['width', 'height'],
    selector: '.MuiFab-root.MuiFab-sizeMedium',
    resolve: { mui: 'MuiFab', sample: { variant: 'circular', size: 'medium' } },
  },
  {
    key: 'largeSize',
    label: '--Fab-large-size',
    prop: ['width', 'height'],
    selector: '.MuiFab-root.MuiFab-sizeLarge',
    resolve: { mui: 'MuiFab', sample: { variant: 'circular', size: 'large' } },
  },
];

function FabMatrix() {
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 1, alignItems: 'center' }}>
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

// Pagination family: the item box size per size (shared page/ellipsis).
const PAGINATION_FIELDS: DensityField[] = [
  {
    key: 'smallSize',
    label: '--PaginationItem-small-size',
    prop: ['minWidth', 'height'],
    selector: '.MuiPaginationItem-sizeSmall',
    resolve: { mui: 'MuiPaginationItem', sample: { size: 'small' } },
  },
  {
    key: 'mediumSize',
    label: '--PaginationItem-medium-size',
    prop: ['minWidth', 'height'],
    selector:
      '.MuiPaginationItem-root:not(.MuiPaginationItem-sizeSmall):not(.MuiPaginationItem-sizeLarge)',
    resolve: { mui: 'MuiPaginationItem', sample: { size: 'medium' } },
  },
  {
    key: 'largeSize',
    label: '--PaginationItem-large-size',
    prop: ['minWidth', 'height'],
    selector: '.MuiPaginationItem-sizeLarge',
    resolve: { mui: 'MuiPaginationItem', sample: { size: 'large' } },
  },
];

function PaginationMatrix() {
  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <Pagination count={5} size="small" />
      <Pagination count={5} />
      <Pagination count={5} size="large" />
    </Stack>
  );
}

// SnackbarContent family: root block/inline padding (no size axis).
const SNACKBAR_FIELDS: DensityField[] = [
  {
    key: 'blockPad',
    label: '--SnackbarContent-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiSnackbarContent-root',
  },
  {
    key: 'inlinePad',
    label: '--SnackbarContent-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiSnackbarContent-root',
  },
];

function SnackbarMatrix() {
  return (
    <SnackbarContent
      message={<span className="density-debug-text">Something happened</span>}
      action={
        <Button color="secondary" size="small">
          Undo
        </Button>
      }
      sx={{ mt: 1, width: 320 }}
    />
  );
}

// BottomNavigation family: bar height + action inline padding.
const BOTTOM_NAV_FIELDS: DensityField[] = [
  {
    key: 'height',
    label: '--BottomNavigation-height',
    prop: 'height',
    selector: '.MuiBottomNavigation-root',
    resolve: { mui: 'MuiBottomNavigation' },
  },
  {
    key: 'inlinePad',
    label: '--BottomNavigationAction-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiBottomNavigationAction-root',
  },
];

function BottomNavigationMatrix() {
  return (
    <BottomNavigation value={0} showLabels sx={{ mt: 1, width: 400 }}>
      <BottomNavigationAction label="Recents" icon={<InboxIcon />} />
      <BottomNavigationAction label="Favorites" icon={<InboxIcon />} />
      <BottomNavigationAction label="Nearby" icon={<InboxIcon />} />
    </BottomNavigation>
  );
}

// Dialog family: title + content block/inline padding + actions padding.
const DIALOG_FIELDS: DensityField[] = [
  {
    key: 'titleBlockPad',
    label: '--DialogTitle-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiDialogTitle-root',
  },
  {
    key: 'titleInlinePad',
    label: '--DialogTitle-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiDialogTitle-root',
  },
  {
    key: 'contentBlockPad',
    label: '--DialogContent-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiDialogContent-root',
  },
  {
    key: 'contentInlinePad',
    label: '--DialogContent-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiDialogContent-root',
  },
  {
    key: 'actionsPad',
    label: '--DialogActions-pad',
    prop: 'padding',
    selector: '.MuiDialogActions-root',
  },
];

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
        <Button>Disagree</Button>
        <Button variant="contained">Agree</Button>
      </DialogActions>
    </Paper>
  );
}

// ListItemButton family: block padding (+ dense) + gutters inline padding.
const LIST_ITEM_BUTTON_FIELDS: DensityField[] = [
  {
    key: 'blockPad',
    label: '--ListItemButton-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiListItemButton-root:not(.MuiListItemButton-dense)',
  },
  {
    key: 'denseBlockPad',
    label: '--ListItemButton-dense-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiListItemButton-dense',
  },
  {
    key: 'inlinePad',
    label: '--ListItemButton-inlinePad',
    prop: 'paddingInline',
    selector: '.MuiListItemButton-gutters',
  },
];

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
    <Stack direction="row" spacing={4} sx={{ mt: 1, alignItems: 'flex-start' }}>
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

const COMPONENT_DEFS = {
  Typography: {
    canvasLabel: 'Typography — variants (h1–h6, subtitle1/2, body1/2)',
    fields: [],
    prefill: {},
    renderMatrix: () => <TypographyMatrix />,
  },
  Button: {
    canvasLabel: 'Button (color="primary")',
    // Canonical prefill matches enhanceDensity's own Button assignment.
    fields: SIZES.map((size) => ({
      key: `${size}Pad`,
      label: `--Button-${size}-pad`,
      prop: 'padding',
      selector: `.MuiButton-size${size[0].toUpperCase()}${size.slice(1)}`,
    })),
    prefill: { smallPad: 'xxs sm', mediumPad: 'xs lg', largePad: 'sm xl' },
    renderMatrix: () => <ButtonMatrix />,
  },
  Menu: {
    canvasLabel: 'Menu — static list + popover (default + dense)',
    fields: MENU_FIELDS,
    // Canonical prefill matches enhanceDensity's own MuiList/MuiMenuItem mapping.
    prefill: {
      listBlockPad: 'sm',
      blockPad: 'xs',
      inlinePad: 'lg',
      denseBlockPad: 'xxs',
      denseInlinePad: 'md',
    },
    renderMatrix: () => <MenuMatrix />,
  },
  Tooltip: {
    canvasLabel: 'Tooltip — pointer (default + arrow); touch out of scope',
    fields: TOOLTIP_FIELDS,
    // Spacing tokens prefill density keys; arrow size (raw px) reads off the theme.
    prefill: {
      blockPad: 'xxs',
      inlinePad: 'sm',
      offset: 'lg',
    },
    renderMatrix: () => <TooltipMatrix />,
  },
  // All input parts (InputBase/Input/FilledInput/OutlinedInput/InputAdornment)
  // collapse under one TextField selector; the sidebar still trees them by
  // component → slot. Canvas stacks the three variant demos.
  TextField: {
    canvasLabel: 'TextField — outlined / filled / standard (size axis + label bridge)',
    fields: [],
    prefill: {},
    renderMatrix: () => (
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
    ),
  },
  Tabs: {
    canvasLabel: 'Tabs — text / icon-top / icon-start (Tab+Tabs minHeight paired)',
    fields: TAB_FIELDS,
    // Spacing → density keys; min-heights (minHeight/tabsMinHeight/iconLabelMinHeight)
    // read raw px off the theme.
    prefill: {
      blockPad: 'sm',
      iconLabelBlockPad: 'xs',
      inlinePad: 'lg',
      iconStackGap: 'xs',
      iconInlineGap: 'sm',
    },
    renderMatrix: () => <TabsMatrix />,
  },
  Checkbox: {
    canvasLabel: 'Checkbox — touch-target padding (medium + small)',
    fields: CHECKBOX_FIELDS,
    prefill: { mediumPad: 'sm', smallPad: 'xs' },
    renderMatrix: () => <CheckboxMatrix />,
  },
  Radio: {
    canvasLabel: 'Radio — touch-target padding (medium + small)',
    fields: RADIO_FIELDS,
    prefill: { mediumPad: 'sm', smallPad: 'xs' },
    renderMatrix: () => <RadioMatrix />,
  },
  Avatar: {
    canvasLabel: 'Avatar — square size (raw px)',
    fields: AVATAR_FIELDS,
    prefill: {}, // size = raw px, read off the theme
    renderMatrix: () => <AvatarMatrix />,
  },
  Fab: {
    canvasLabel: 'Fab — circular size (small / medium / large)',
    fields: FAB_FIELDS,
    prefill: {}, // sizes = raw px, read off the theme
    renderMatrix: () => <FabMatrix />,
  },
  Pagination: {
    canvasLabel: 'Pagination — item box size (small / medium / large)',
    fields: PAGINATION_FIELDS,
    prefill: {}, // sizes = raw px, read off the theme
    renderMatrix: () => <PaginationMatrix />,
  },
  SnackbarContent: {
    canvasLabel: 'SnackbarContent — root padding',
    fields: SNACKBAR_FIELDS,
    prefill: { blockPad: 'xs', inlinePad: 'lg' },
    renderMatrix: () => <SnackbarMatrix />,
  },
  BottomNavigation: {
    canvasLabel: 'BottomNavigation — bar height + action inline padding',
    fields: BOTTOM_NAV_FIELDS,
    prefill: { inlinePad: 'md' }, // height raw px off theme
    renderMatrix: () => <BottomNavigationMatrix />,
  },
  Dialog: {
    canvasLabel: 'Dialog — title / content / actions padding',
    fields: DIALOG_FIELDS,
    prefill: {
      titleBlockPad: 'lg',
      titleInlinePad: 'xl',
      contentBlockPad: 'lg',
      contentInlinePad: 'xl',
      actionsPad: 'sm',
    },
    renderMatrix: () => <DialogMatrix />,
  },
  ListItemButton: {
    canvasLabel: 'ListItemButton — block padding (+ dense) + gutters',
    fields: LIST_ITEM_BUTTON_FIELDS,
    prefill: { blockPad: 'sm', denseBlockPad: 'xxs', inlinePad: 'lg' },
    renderMatrix: () => <ListItemButtonMatrix />,
  },
  ButtonGroup: {
    canvasLabel: 'ButtonGroup — grouped-button min-width floor',
    fields: BUTTON_GROUP_FIELDS,
    prefill: {}, // minWidth = raw px, read off the theme
    renderMatrix: () => <ButtonGroupMatrix />,
  },
  TableCell: {
    canvasLabel: 'TableCell — block padding per size + inline padding',
    fields: TABLE_CELL_FIELDS,
    prefill: { mediumBlockPad: 'lg', smallBlockPad: 'xs', inlinePad: 'lg' },
    renderMatrix: () => <TableCellMatrix />,
  },
  Autocomplete: {
    canvasLabel: 'Autocomplete — option list min-height + padding (open)',
    fields: AUTOCOMPLETE_FIELDS,
    prefill: { optionBlockPad: 'xs', optionInlinePad: 'lg' }, // minHeight raw px off theme
    renderMatrix: () => <AutocompleteMatrix />,
  },
  Stepper: {
    canvasLabel: 'Stepper — step gutter + icon→label gap',
    fields: STEPPER_FIELDS,
    prefill: { inlinePad: 'sm', iconGap: 'sm' },
    renderMatrix: () => <StepperMatrix />,
  },
  Toolbar: {
    canvasLabel: 'AppBar/Toolbar — gutter padding + dense min-height',
    fields: TOOLBAR_FIELDS,
    prefill: { inlinePad: 'lg', wideInlinePad: 'xl' }, // denseMinHeight raw px off theme
    renderMatrix: () => <ToolbarMatrix />,
  },
  Badge: {
    canvasLabel: 'Badge — bubble size + padding (standard / dot)',
    fields: BADGE_FIELDS,
    prefill: { standardPad: '0 xs' }, // sizes = raw px, read off the theme
    renderMatrix: () => <BadgeMatrix />,
  },
  ToggleButton: {
    canvasLabel: 'ToggleButton — uniform padding (small/medium/large)',
    fields: TOGGLE_BUTTON_FIELDS,
    prefill: { smallPad: 'sm', mediumPad: 'md', largePad: 'lg' },
    renderMatrix: () => <ToggleButtonMatrix />,
  },
  Breadcrumbs: {
    canvasLabel: 'Breadcrumbs — separator inline gap',
    fields: BREADCRUMBS_FIELDS,
    prefill: { separatorGap: 'sm' },
    renderMatrix: () => <BreadcrumbsMatrix />,
  },
  Card: {
    canvasLabel: 'Card — header / content / actions padding + gaps',
    fields: CARD_FIELDS,
    prefill: {
      pad: 'lg',
      padBottom: 'xl',
      actionsPad: 'sm',
      actionsGap: 'sm',
      headerPad: 'lg',
      headerAvatarGap: 'lg',
    },
    note: 'CardContent/CardActions/CardHeader padding + gaps reflow via the preset; no size axis.',
    renderMatrix: () => <CardMatrix />,
  },
  Rating: {
    canvasLabel: 'Rating — star size (typography/icon axis)',
    fields: [],
    prefill: {},
    note: 'Star fontSize reflows via the preset typography config — out of scope for token editing.',
    renderMatrix: () => <RatingMatrix />,
  },
  Select: {
    canvasLabel: 'Select — content-box floor (padding via its OutlinedInput)',
    fields: SELECT_FIELDS,
    prefill: {}, // minHeight = raw px, read off the theme
    renderMatrix: () => <SelectMatrix />,
  },
  Alert: {
    canvasLabel: 'Alert — root padding + icon gap',
    fields: ALERT_FIELDS,
    prefill: { blockPad: 'xs', inlinePad: 'lg', iconGap: 'md' },
    renderMatrix: () => <AlertMatrix />,
  },
  Chip: {
    canvasLabel: 'Chip — height (drives avatar/icon) + label inline padding',
    fields: CHIP_FIELDS,
    prefill: { mediumPadInline: 'md', smallPadInline: 'sm' }, // heights = raw px, read off theme
    renderMatrix: () => <ChipMatrix />,
  },
  Accordion: {
    canvasLabel: 'Accordion — summary min-height/margin/pad + details padding',
    fields: ACCORDION_FIELDS,
    // Spacing → density keys; min-heights read raw px off the theme.
    prefill: {
      inlinePad: 'lg',
      marginBlock: 'md',
      expandedMarginBlock: 'lg',
      detailsTopPad: 'sm',
      detailsInlinePad: 'lg',
      detailsBottomPad: 'lg',
    },
    renderMatrix: () => <AccordionMatrix />,
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

export default function DensityExperiment() {
  const [preset, setPreset] = React.useState<Preset>('unset');
  const [selection, setSelection] = React.useState<Selection>('All');
  const [debug, setDebug] = React.useState<string[]>([]);

  // User overrides, keyed by generated-table row id — empty until a field is typed.
  const [mapping, setMapping] = React.useState<Record<string, string>>({});

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

  // A new preset has different defaults → drop stale overrides.
  React.useEffect(() => {
    setMapping({});
  }, [preset]);

  // Apply = build each edit into the shape enhance*Density emits and append it
  // onto the preset theme's components (user layer wins by order). No GlobalStyles,
  // no class selectors — the merged theme IS what a real preset would emit.
  const canvasTheme = React.useMemo(() => {
    if (preset === 'unset') {
      return presetTheme;
    }
    const edits: DensityEdit[] = [];
    for (const group of densityGroups) {
      for (const id of group.fields) {
        const raw = mapping[id] ?? '';
        if (parseMapping(raw).state !== 'ok') {
          continue;
        }
        const row = densityRow(id);
        if (row) {
          edits.push({ row, value: resolveValue(raw) });
        }
      }
    }
    if (!edits.length) {
      return presetTheme;
    }
    const components = mergeOntoPreset(
      (presetTheme as unknown as { components?: Record<string, any> }).components ?? {},
      buildOverrides(edits),
    );
    return { ...presetTheme, components };
  }, [preset, presetTheme, mapping]);

  // Active scale in px straight off the enhanced theme — single source of truth
  // for the legend + preview, so it can't drift from what the preset applied.
  const scalePx =
    preset === 'unset'
      ? null
      : (presetTheme as unknown as { density: Record<string, string> }).density;

  // Write one value to every id an entry drives (a plain field writes one, a
  // virtual knob writes all its members).
  const setFields = (ids: string[], value: string) =>
    setMapping((m) => {
      const next = { ...m };
      for (const id of ids) {
        next[id] = value;
      }
      return next;
    });

  const resetMapping = () => setMapping({});

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
      </Box>

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
        </Box>
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
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <FormControl fullWidth size="small" sx={{ p: 3, pb: 1.5, flexShrink: 0 }}>
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
              {densityGroups.map((g) => (
                <MenuItem key={g.key} value={g.key}>
                  {g.key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            component="section"
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              px: 3,
              pb: 3,
              opacity: mappingEnabled ? 1 : 0.5,
            }}
          >
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
            {visibleGroups.map((group) => {
              // Flatten this family into knob entries, then nest by component → slot.
              // Virtual knobs sit at their first member's component/slot.
              const entries = buildKnobEntries(group);
              const byComponent = new Map<string, Map<string, KnobEntry[]>>();
              for (const entry of entries) {
                if (!byComponent.has(entry.component)) {
                  byComponent.set(entry.component, new Map());
                }
                const bySlot = byComponent.get(entry.component)!;
                if (!bySlot.has(entry.slot)) {
                  bySlot.set(entry.slot, []);
                }
                bySlot.get(entry.slot)!.push(entry);
              }
              // Base component (name === family) leads, then sub-parts alphabetically:
              // Accordion → AccordionDetails → AccordionSummary.
              const orderedComponents = [...byComponent].sort(([a], [b]) => {
                if (a === group.key) {
                  return -1;
                }
                if (b === group.key) {
                  return 1;
                }
                return a.localeCompare(b);
              });
              return orderedComponents.map(([component, bySlot]) => (
                <Box key={component} sx={{ mt: 2 }} data-mapping-component={component}>
                  <Typography sx={{ fontWeight: 'medium', fontSize: 13 }}>{component}</Typography>
                  {[...bySlot]
                    .sort(([a], [b]) => {
                      // `root` always leads, then the rest alphabetically.
                      if (a === 'root') {
                        return -1;
                      }
                      if (b === 'root') {
                        return 1;
                      }
                      return a.localeCompare(b);
                    })
                    .map(([slot, slotEntries]) => (
                      <Box
                        key={slot}
                        data-mapping-slot={slot}
                        sx={{ mt: 1, pl: 1.5, borderLeft: '1px solid', borderColor: 'divider' }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {slot}
                        </Typography>
                        <Stack spacing={1.5} sx={{ mt: 0.5 }}>
                          {slotEntries.map((entry) => {
                            const value = mapping[entry.writeIds[0]] ?? '';
                            const canon =
                              preset === 'unset'
                                ? ''
                                : fieldDefault(entry.writeIds[0], preset as PresetLevel);
                            const parsed = parseMapping(value);
                            const showError = mappingEnabled && parsed.state === 'error';
                            let helper = ' ';
                            if (showError) {
                              helper = parsed.error ?? ' ';
                            } else if (mappingEnabled) {
                              // typed → preview the typed value; empty → the inherited preset default
                              helper = previewText(value || canon, scalePx);
                            }
                            return (
                              <TextField
                                key={entry.key}
                                size="small"
                                label={entry.label}
                                value={value}
                                placeholder={canon || 'density key or CSS value'}
                                disabled={!mappingEnabled}
                                error={showError}
                                helperText={helper}
                                onChange={(event) => setFields(entry.writeIds, event.target.value)}
                                slotProps={{ htmlInput: { 'data-mapping-field': entry.key } }}
                              />
                            );
                          })}
                        </Stack>
                      </Box>
                    ))}
                </Box>
              ));
            })}
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

        {/* CANVAS — preset theme with user overrides appended (no GlobalStyles). */}
        <ThemeProvider theme={canvasTheme}>
          <CssBaseline />
          <Box
            id="density-canvas"
            data-debug-padding={debug.includes('padding') ? '' : undefined}
            data-debug-text={debug.includes('text') ? '' : undefined}
            data-debug-outline={debug.includes('outline') ? '' : undefined}
            sx={{ flex: 1, minHeight: 0, overflowY: 'auto', p: 4, ...DEBUG_SX }}
          >
            <Stack spacing={6}>
              {visibleComponents.map((comp) => (
                <Box key={comp} data-canvas-component={comp}>
                  {/* block label — inline-flex roots (Select/ButtonGroup) must drop below, not sit beside it */}
                  <Typography variant="overline" color="text.secondary" component="div">
                    {COMPONENT_DEFS[comp].canvasLabel}
                  </Typography>
                  {COMPONENT_DEFS[comp].renderMatrix()}
                </Box>
              ))}
            </Stack>
          </Box>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
