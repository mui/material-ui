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
import { densityGroups, densityRow, fieldLabel } from 'docs/src/modules/components/density/densityFields';
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

const DEBUG_SX = {
  '& .density-debug-text': { position: 'relative', zIndex: 1, borderRadius: '2px' },
  // Padding ring on ButtonBase (Button/MenuItem) + the Tooltip bubble.
  '&[data-debug-padding] .MuiButtonBase-root, &[data-debug-padding] .MuiTooltip-tooltip': {
    position: 'relative',
  },
  '&[data-debug-padding] .MuiButtonBase-root::before': PADDING_RING,
  '&[data-debug-padding] .MuiTooltip-tooltip::before': PADDING_RING,
  '&[data-debug-text] .density-debug-text': {
    backgroundColor: 'rgba(0, 116, 217, 0.32)', // text box = blue
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

function MenuDemoItems() {
  return (
    <React.Fragment>
      <MenuItem>
        <span className="density-debug-text">Default item</span>
      </MenuItem>
      <MenuItem selected>
        <span className="density-debug-text">Selected item</span>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <span className="density-debug-text">With icon</span>
        </ListItemText>
      </MenuItem>
      <MenuItem divider>
        <span className="density-debug-text">With divider</span>
      </MenuItem>
      <MenuItem dense>
        <span className="density-debug-text">Dense item</span>
      </MenuItem>
      <MenuItem dense>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <span className="density-debug-text">Dense + icon</span>
        </ListItemText>
      </MenuItem>
    </React.Fragment>
  );
}

function MenuMatrix() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  // Overrides now ride the theme (ThemeProvider context), so the portaled popover
  // gets them too — unlike the old `#density-canvas`-scoped GlobalStyles, which
  // reached only the in-canvas static list.
  return (
    <Stack direction="row" spacing={4} sx={{ mt: 1, alignItems: 'flex-start' }}>
      <MenuList sx={{ width: 240, border: '1px solid', borderColor: 'divider' }}>
        <MenuDemoItems />
      </MenuList>
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
  return (
    <Stack
      direction="row"
      spacing={14}
      sx={{ mt: 1, mb: 8, minHeight: 140, alignItems: 'flex-start' }}
    >
      <Tooltip
        title={<span className="density-debug-text">Default tooltip</span>}
        open
        placement="bottom"
        slotProps={slotProps}
      >
        <Button variant="outlined">Default</Button>
      </Tooltip>
      <Tooltip
        title={<span className="density-debug-text">Arrow tooltip</span>}
        arrow
        open
        placement="bottom"
        slotProps={slotProps}
      >
        <Button variant="outlined">Arrow</Button>
      </Tooltip>
    </Stack>
  );
}

// OutlinedInput family: input block padding (per size) + adornment gap (per
// size). Inline padding is not tokenized — it's fieldset-constrained (changing it
// misaligns the floating label), so it stays master. The label resting-Y is a
// derived bridge (not a direct field).
const OUTLINED_INPUT_FIELDS: DensityField[] = [
  {
    key: 'mediumBlockPad',
    label: '--OutlinedInput-medium-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiOutlinedInput-root:not(.MuiInputBase-sizeSmall) .MuiOutlinedInput-input',
  },
  {
    key: 'smallBlockPad',
    label: '--OutlinedInput-small-blockPad',
    prop: 'paddingBlock',
    selector: '.MuiInputBase-sizeSmall .MuiOutlinedInput-input',
  },
  // Gap = start marginRight / end marginLeft (one token, no per-side discriminating
  // class) — the preset emits the real margins per position; the synthetic label
  // is label/placeholder only.
  {
    key: 'mediumGap',
    label: '--InputAdornment-medium-gap',
    selector: '.MuiInputAdornment-root:not(.MuiInputAdornment-sizeSmall)',
  },
  {
    key: 'smallGap',
    label: '--InputAdornment-small-gap',
    selector: '.MuiInputAdornment-sizeSmall',
  },
];

function OutlinedInputMatrix() {
  return (
    <Stack spacing={3} sx={{ mt: 1, width: 280, alignItems: 'flex-start' }}>
      <TextField label={<span className="density-debug-text">Medium</span>} variant="outlined" />
      <TextField
        label={<span className="density-debug-text">Small</span>}
        variant="outlined"
        size="small"
      />
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
        slotProps={{ input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> } }}
      />
    </Stack>
  );
}

// FilledInput family: box top/bottom padding (per size). Inline padding is not
// tokenized — it stays master to keep the floating label aligned. The label
// rest/shrink Y follow the active preset (tuned raw px, not editable here).
const FILLED_INPUT_FIELDS: DensityField[] = [
  {
    key: 'mediumTopPad',
    label: '--FilledInput-medium-topPad',
    prop: 'paddingTop',
    selector: '.MuiFilledInput-root:not(.MuiInputBase-sizeSmall) .MuiFilledInput-input',
  },
  {
    key: 'smallTopPad',
    label: '--FilledInput-small-topPad',
    prop: 'paddingTop',
    selector: '.MuiInputBase-sizeSmall .MuiFilledInput-input',
  },
  {
    key: 'mediumBottomPad',
    label: '--FilledInput-medium-bottomPad',
    prop: 'paddingBottom',
    selector: '.MuiFilledInput-root:not(.MuiInputBase-sizeSmall) .MuiFilledInput-input',
  },
  {
    key: 'smallBottomPad',
    label: '--FilledInput-small-bottomPad',
    prop: 'paddingBottom',
    selector: '.MuiInputBase-sizeSmall .MuiFilledInput-input',
  },
];

function FilledInputMatrix() {
  return (
    <Stack spacing={3} sx={{ mt: 1, width: 280, alignItems: 'flex-start' }}>
      <TextField label={<span className="density-debug-text">Medium</span>} variant="filled" />
      <TextField
        label={<span className="density-debug-text">Small</span>}
        variant="filled"
        size="small"
      />
      <TextField
        label={<span className="density-debug-text">Filled value</span>}
        variant="filled"
        defaultValue="Value"
      />
    </Stack>
  );
}

// Input (standard) family: input top/bottom padding (top per size, bottom
// shared). Inline is 0; the label floats above (no bridge).
const INPUT_FIELDS: DensityField[] = [
  {
    key: 'mediumTopPad',
    label: '--Input-medium-topPad',
    prop: 'paddingTop',
    selector: '.MuiInput-root:not(.MuiInputBase-sizeSmall) .MuiInput-input',
  },
  {
    key: 'smallTopPad',
    label: '--Input-small-topPad',
    prop: 'paddingTop',
    selector: '.MuiInputBase-sizeSmall .MuiInput-input',
  },
  {
    key: 'bottomPad',
    label: '--Input-bottomPad',
    prop: 'paddingBottom',
    selector: '.MuiInput-input',
  },
];

function InputMatrix() {
  return (
    <Stack spacing={3} sx={{ mt: 1, width: 260, alignItems: 'flex-start' }}>
      <TextField label={<span className="density-debug-text">Medium</span>} variant="standard" />
      <TextField
        label={<span className="density-debug-text">Small</span>}
        variant="standard"
        size="small"
      />
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
        <Tab label={lbl('One')} />
        <Tab label={lbl('Two')} />
        <Tab label={lbl('Three')} />
      </Tabs>
      <Tabs value={0}>
        <Tab icon={<InboxIcon />} label={lbl('Top')} iconPosition="top" />
        <Tab icon={<InboxIcon />} label={lbl('Top')} iconPosition="top" />
      </Tabs>
      <Tabs value={0}>
        <Tab icon={<InboxIcon />} label={lbl('Start')} iconPosition="start" />
        <Tab icon={<InboxIcon />} label={lbl('Start')} iconPosition="start" />
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

function CheckboxMatrix() {
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 1, alignItems: 'center' }}>
      <Checkbox defaultChecked />
      <Checkbox defaultChecked size="small" />
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
      <Chip avatar={<Avatar>A</Avatar>} label="Avatar" />
      <Chip icon={<InboxIcon />} label="Icon" onDelete={() => {}} />
      <Chip label="Outlined" variant="outlined" onDelete={() => {}} />
      <Chip label="Small" size="small" onDelete={() => {}} />
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
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="density-debug-text">Expanded summary</span>
        </AccordionSummary>
        <AccordionDetails>
          <span className="density-debug-text">Details content padding.</span>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="density-debug-text">Collapsed summary</span>
        </AccordionSummary>
        <AccordionDetails>Hidden.</AccordionDetails>
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

function RadioMatrix() {
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 1, alignItems: 'center' }}>
      <Radio checked />
      <Radio checked size="small" />
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
        <ToggleButtonGroup key={size} value="left" size={size} exclusive>
          <ToggleButton value="left">
            <span className="density-debug-text">{size} L</span>
          </ToggleButton>
          <ToggleButton value="center">
            <span className="density-debug-text">C</span>
          </ToggleButton>
        </ToggleButtonGroup>
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

function TableCellMatrix() {
  return (
    <Stack spacing={2} sx={{ mt: 1, width: 320 }}>
      {(['medium', 'small'] as const).map((size) => (
        <Table key={size} size={size}>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="density-debug-text">{size} name</span>
              </TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Row one</TableCell>
              <TableCell align="right">42</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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

function AutocompleteMatrix() {
  return (
    <Autocomplete
      open
      disablePortal
      options={['Apple', 'Banana', 'Cherry']}
      sx={{ mt: 1, width: 260 }}
      renderInput={(params) => <TextField {...params} label="Fruit" />}
    />
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
      <Step>
        <StepLabel>
          <span className="density-debug-text">One</span>
        </StepLabel>
      </Step>
      <Step>
        <StepLabel>
          <span className="density-debug-text">Two</span>
        </StepLabel>
      </Step>
      <Step>
        <StepLabel>
          <span className="density-debug-text">Three</span>
        </StepLabel>
      </Step>
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
  return (
    <Paper sx={{ mt: 1, width: 320 }}>
      <DialogTitle>
        <span className="density-debug-text">Dialog title</span>
      </DialogTitle>
      <DialogContent>
        <span className="density-debug-text">Dialog content body text goes here.</span>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button>OK</Button>
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

function ListItemButtonMatrix() {
  return (
    <List sx={{ mt: 1, width: 240, border: '1px solid', borderColor: 'divider' }}>
      <ListItemButton>
        <ListItemText primary={<span className="density-debug-text">Regular item</span>} />
      </ListItemButton>
      <ListItemButton selected>
        <ListItemText primary={<span className="density-debug-text">Selected item</span>} />
      </ListItemButton>
      <ListItemButton dense>
        <ListItemText primary={<span className="density-debug-text">Dense item</span>} />
      </ListItemButton>
    </List>
  );
}

const COMPONENT_DEFS = {
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
  OutlinedInput: {
    canvasLabel: 'OutlinedInput — size axis + adornments (label bridge)',
    fields: OUTLINED_INPUT_FIELDS,
    // All spacing → density keys (match the preset assignment).
    prefill: {
      mediumBlockPad: 'md',
      smallBlockPad: 'sm',
      mediumGap: 'sm',
      smallGap: 'xxs',
    },
    renderMatrix: () => <OutlinedInputMatrix />,
  },
  FilledInput: {
    canvasLabel: 'FilledInput — size axis (box padding); label follows preset',
    fields: FILLED_INPUT_FIELDS,
    prefill: {
      mediumTopPad: 'xl',
      smallTopPad: 'lg',
      mediumBottomPad: 'sm',
      smallBottomPad: 'xxs',
    },
    renderMatrix: () => <FilledInputMatrix />,
  },
  Input: {
    canvasLabel: 'Input (standard) — size axis (input top/bottom padding)',
    fields: INPUT_FIELDS,
    prefill: {
      mediumTopPad: 'xs',
      smallTopPad: 'xxs',
      bottomPad: 'xs',
    },
    renderMatrix: () => <InputMatrix />,
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

const fieldDefault = (id: string, preset: PresetLevel): string => {
  const row = densityRow(id);
  if (!row) {
    return '';
  }
  return row.isDensity ? (row.densityKey ?? '') : row.values[preset];
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

  const setField = (id: string, value: string) => setMapping((m) => ({ ...m, [id]: value }));

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
            {visibleGroups.map((group) => (
              <Box key={group.key} sx={{ mt: 2 }} data-mapping-group={group.key}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                  {group.key}
                </Typography>
                <Stack spacing={1.5} sx={{ mt: 1 }}>
                  {group.fields.map((id) => {
                    const value = mapping[id] ?? '';
                    const canon = preset === 'unset' ? '' : fieldDefault(id, preset as PresetLevel);
                    const parsed = parseMapping(value);
                    const showError = mappingEnabled && parsed.state === 'error';
                    let helper = ' ';
                    if (showError) {
                      helper = parsed.error ?? ' ';
                    } else if (mappingEnabled) {
                      // typed → preview the typed value; empty → the preset default it inherits
                      helper = previewText(value || canon, scalePx);
                    }
                    return (
                      <TextField
                        key={id}
                        size="small"
                        label={fieldLabel(id)}
                        value={value}
                        placeholder={canon || 'density key or CSS value'}
                        disabled={!mappingEnabled}
                        error={showError}
                        helperText={helper}
                        onChange={(event) => setField(id, event.target.value)}
                        slotProps={{
                          htmlInput: {
                            'data-mapping-field': id,
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

        {/* CANVAS — preset theme with user overrides appended (no GlobalStyles). */}
        <ThemeProvider theme={canvasTheme}>
          <CssBaseline />
          <Box
            id="density-canvas"
            data-debug-padding={debug.includes('padding') ? '' : undefined}
            data-debug-text={debug.includes('text') ? '' : undefined}
            sx={{ flex: 1, minHeight: 0, overflowY: 'auto', p: 4, ...DEBUG_SX }}
          >
            <Stack spacing={6}>
              {visibleComponents.map((comp) => (
                <Box key={comp} data-canvas-component={comp}>
                  <Typography variant="overline" color="text.secondary">
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
