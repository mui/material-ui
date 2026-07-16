'use client';
import * as React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
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
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
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
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
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
import Switch from '@mui/material/Switch';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Slider from '@mui/material/Slider';
import Badge from '@mui/material/Badge';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
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
import CropFreeIcon from '@mui/icons-material/CropFree';
import TitleIcon from '@mui/icons-material/Title';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import HeightIcon from '@mui/icons-material/Height';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import {
  DataGrid,
  GridActionsCellItem,
  GridCellModes,
  GridPreferencePanelsValue,
} from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
// Premium build reused for every paid-feature demo (it includes Pro features
// like header filters) — one large package import instead of two. No license
// key in this repo, so those demos render the watermark; layout is unaffected.
import { DataGridPremium } from '@mui/x-data-grid-premium';
import {
  createTheme,
  keyframes,
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
  componentSlotOrder,
  stripComponentSlot,
  densityVirtualKnobs,
  densityLinkedWrites,
  type DensityVirtualKnob,
} from 'docs/src/modules/components/density/densityFields';
import {
  buildOverrides,
  mergeOntoPreset,
} from 'docs/src/modules/components/density/buildDensityOverrides';
import {
  themeTokenGroups,
  readThemeToken,
  setThemeToken,
  PRESET_SPACING_DEFAULT,
} from 'docs/src/modules/components/density/themeTokens';
import {
  SCALE_KEYS,
  previewText,
  resolveValue,
  shortenDensityVars,
  tokenize,
} from 'docs/src/modules/components/density/mappingValue';
import {
  collectDensityEdits,
  collectScaleEdits,
  collectThemeTokenEdits,
} from 'docs/src/modules/components/density/collectEdits';
import { buildExportSource } from 'docs/src/modules/components/density/buildExportSource';
import { buildExportInput } from 'docs/src/modules/components/density/exportPayload';
import { KnobInput } from 'docs/src/modules/components/density/KnobInput';

const PRESETS = ['unset', 'compact', 'normal', 'comfort'] as const;
const SIZES = ['small', 'medium', 'large'] as const;
const VARIANTS = ['text', 'outlined', 'contained'] as const;
const ICON_BUTTON_COLORS = ['default', 'primary', 'secondary'] as const;

type Preset = (typeof PRESETS)[number];

// Layout tabs — lowercase ids are the URL param values, decoupled from labels.
type TabKey = 'density' | 'spacing' | 'components' | 'typography' | 'radius';
// Radius is hidden for now — its wiring (TAB_TOKEN_GROUP, preview, token knobs)
// stays intact; re-enable by adding it back here. Hidden tabs are also invalid
// as `?tab=` values (they fall back to the default).
const VISIBLE_TABS: readonly TabKey[] = ['density', 'spacing', 'typography', 'components'];
const TAB_LABEL: Record<TabKey, string> = {
  density: 'Density',
  spacing: 'Spacing',
  components: 'Components',
  typography: 'Typography',
  radius: 'Radius',
};
// Token tabs (theme.typography / theme.shape / theme.spacing knobs) → their
// themeTokenGroups key. Density is NOT a token tab — its knobs edit scale steps.
type TokenTabKey = 'typography' | 'radius' | 'spacing';
const TAB_TOKEN_GROUP: Record<TokenTabKey, string> = {
  typography: 'Typography',
  radius: 'Border Radius',
  spacing: 'Spacing',
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
    body: 'On the Components tab, pick a family (or All) to see its demo. Toggle the visual-debug overlays — bounding box (padding + margin), text box, outline, or measure height — to read the reflow at a glance.',
  },
  {
    label: 'Tweak the knobs',
    body: 'Each knob accepts a density step (xxs…xxl) or any raw CSS value (12px, 2rem). The placeholder shows what the preset ships; the helper shows what your input resolves to. Edits belong to the ACTIVE preset — switch presets and each keeps its own overrides.',
  },
  {
    label: 'Adjust theme tokens',
    body: 'The Typography tab edits per-variant fontSize / lineHeight; the Spacing tab edits the theme.spacing base. Same input rules as component knobs; the canvas shows a live preview.',
  },
  {
    label: 'Export or copy density.ts',
    body: 'Click "Export density.ts" to download — or the copy icon next to it to copy to your clipboard — a self-contained file with all three enhance*Density functions and your edits baked in (annotated with comments). Paste it into any app on released @mui/material — just render <CssBaseline /> so the density variables materialise.',
  },
] as const;

function HowToUseDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth data-howto-dialog>
      <DialogTitle>How to use the playground</DialogTitle>
      <DialogContent>
        <List sx={{ py: 0 }}>
          {HOW_TO_STEPS.map((s, i) => (
            <ListItem key={s.label} alignItems="flex-start" disableGutters>
              <ListItemAvatar sx={{ minWidth: 44 }}>
                <Avatar sx={{ width: 28, height: 28, fontSize: 14, bgcolor: 'primary.main' }}>
                  {i + 1}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={s.label}
                secondary={s.body}
                slotProps={{
                  primary: { variant: 'subtitle2' },
                  secondary: { variant: 'body2' },
                }}
              />
            </ListItem>
          ))}
        </List>
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
// layout-safe (absolute ::before/::after + pointer-events:none), never touches
// the components' real styles. The label span sits above the padding overlay
// (z-index) so text stays crisp; its blue fill only shows in text mode.
// The padding-ring overlay: `inset:0` sizes it to the element's padding-box;
// `padding:inherit` shrinks its content-box to the element's content box, and
// the `exclude` mask knocks that center out → green fills only the padding ring.
// Both this ring and the margin ring below fire off the SAME toggle
// (`data-debug-boundingbox`) — one "Bounding box" button shows padding (inside
// the border) and margin (outside the border) together.
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
  '.MuiAlert-message',
  '.MuiAlert-action',
  '.MuiCardContent-root',
  '.MuiCardActions-root',
  '.MuiCardHeader-root',
  '.MuiDialogTitle-root',
  '.MuiDialogContent-root',
  '.MuiDialogActions-root',
  '.MuiTableCell-root',
  '.MuiSnackbarContent-root',
  '.MuiSnackbarContent-message',
  '.MuiSnackbarContent-action',
  '.MuiAccordionDetails-root',
  '.MuiToolbar-root',
  '.MuiChip-label',
  '.MuiStepLabel-iconContainer',
  '.MuiStepContent-root',
  '.MuiStep-root',
  '.MuiBadge-badge',
  '.MuiSwitch-root',
  '.MuiAutocomplete-option',
  '.MuiSlider-root',
  '.MuiSlider-valueLabel',
  '.MuiDivider-wrapper',
  '.MuiTablePagination-select',
  '.MuiDataGrid-cell',
  '.MuiDataGrid-columnHeader',
  '.MuiDataGrid-toolbar',
  '.MuiDataGrid-footerContainer',
  '.MuiDataGrid-panelContent',
  '.MuiDataGrid-panelFooter',
  '.MuiDataGrid-columnsManagement',
  '.MuiDataGrid-columnsManagementHeader',
  '.MuiDataGrid-columnsManagementFooter',
  '.MuiContainer-root', // Spacing tab: responsive gutters = theme.spacing
];

// Ring slots master already positions absolutely — the ::before ring anchors to
// any positioned element, and forcing `relative` on these would un-anchor them.
const POSITIONED_RING_SLOTS = new Set([
  '.MuiBadge-badge',
  '.MuiSlider-valueLabel',
  '.MuiDataGrid-columnHeader',
]);

// Margin sits OUTSIDE the border-box, so the padding-ring's `padding:inherit` +
// mask trick can't reach it (a pseudo-element can't escape past the border via
// that technique) — and unlike padding, there's no OTHER CSS-only trick either:
// margin is never itself painted, so nothing can "reveal" it the way masking
// reveals padding. A ring keyed to a hardcoded density var (the first cut of
// this feature) LOOKED right but silently went stale the moment a user edited
// the matching sidebar knob — it kept showing the preset's original value,
// never the live override.
//
// So, like the height-measure ruler, this needs JS: read the REAL computed
// margin off each targeted element and project it as an out-of-flow marker —
// robust to ANY value (preset default, sidebar override, even raw arbitrary
// CSS), because it reads what actually rendered instead of assuming what
// should have. All four sides are checked per element (whichever are non-zero
// get a marker), so a slot with margin on more than one side (e.g.
// FormControlLabel's compensating `marginLeft` AND its fixed `marginRight: 16`
// from master) shows both — no more per-side selector plumbing needed. See
// the `boundingBoxOn` effect for the marker layer (mirrors the measure effect
// below: own out-of-flow layer, ResizeObserver + MutationObserver relayout).
const MARGIN_MARKER_SELECTORS = [
  '[data-canvas-component="Divider"] .MuiDivider-root',
  '.MuiTableSortLabel-icon',
  '.MuiTablePagination-selectRoot',
  '.MuiTablePagination-actions',
  '.MuiInputAdornment-positionStart',
  '.MuiInputAdornment-positionEnd',
  '.MuiDataGrid-rowCount',
  '.MuiDataGrid-selectedRowCount',
  '.MuiDataGrid-toolbarDivider',
  '.MuiDataGrid-toolbarLabel',
  '.MuiDialog-paper',
  '.MuiDialogActions-root > :not(style) ~ :not(style)',
  '.MuiPaginationItem-root',
  '.MuiDataGrid-columnHeaderFilterInput',
  '.MuiDataGrid-groupingCriteriaCellToggle',
  '.MuiDataGrid-treeDataGroupingCellToggle',
  '.MuiAccordionSummary-content',
  '.MuiAlert-icon',
  '.MuiAlert-action',
  '.MuiChip-avatar',
  '.MuiChip-deleteIcon',
  '.MuiBreadcrumbs-separator',
  '.MuiStepConnector-vertical',
  '.MuiStepLabel-label.MuiStepLabel-alternativeLabel',
  '.MuiStepContent-root',
  '.MuiCardHeader-avatar',
  '.MuiCardHeader-action',
  '.MuiCardActions-root > :not(style) ~ :not(style)',
  '[data-canvas-component="Tooltip"] .MuiTooltip-tooltip',
  '.MuiFormControlLabel-labelPlacementEnd',
  '.MuiFormControlLabel-labelPlacementStart',
  '.MuiAutocomplete-tag',
];

// Height-measure targets: the box whose height each demo is about — mostly
// component ROOT boxes (density's headline signal is min-height). Special cases:
// Checkbox/Radio/Switch controls sit inside a FormControlLabel, so the bare
// ButtonBase root is EXCLUDED and the whole row is measured instead (badge lands at
// row-end, past the label, not over it); SvgIcons are measured only inside the
// SvgIcon demo — they appear inside nearly every other component, which would
// otherwise spray a badge on every icon (and double-mark checkboxes/radios); and
// the Tooltip demo is ABOUT the bubble, not its trigger buttons, so those buttons
// are excluded and `.MuiTooltip-tooltip` is measured instead; ToggleButtons sit
// flush inside a ToggleButtonGroup, so per-button badges stack on top of each
// other — the group is measured once instead (ButtonGroup likewise); Autocomplete's popup/clear
// indicators are IconButtons inside every input's end adornment — excluded so
// the badge stays on the input row (`.MuiInputBase-root`), with the option rows
// (the family's headline min-height) measured directly.
const MEASURE_SLOTS = [
  '.MuiButtonBase-root:not(.MuiFormControlLabel-root *):not([data-canvas-component="Tooltip"] *):not(.MuiToggleButtonGroup-root *):not(.MuiButtonGroup-root *):not(.MuiAutocomplete-endAdornment *):not(.MuiDataGrid-root *)',
  '.MuiAutocomplete-option',
  '.MuiFormControlLabel-root',
  '.MuiToggleButtonGroup-root',
  '.MuiButtonGroup-root',
  '.MuiInputBase-root',
  '.MuiChip-root',
  '.MuiAlert-root',
  '.MuiAlert-message',
  '.MuiToolbar-root',
  '.MuiTableCell-root',
  '.MuiSnackbarContent-root',
  '.MuiAvatar-root',
  '.MuiLinearProgress-root',
  '.MuiSlider-root',
  '[data-canvas-component="Slider"] .MuiSlider-thumb',
  '[data-canvas-component="Badge"] .MuiBadge-badge',
  '[data-canvas-component="SvgIcon"] .MuiSvgIcon-root',
  '[data-canvas-component="Tooltip"] .MuiTooltip-tooltip',
  '[data-canvas-component="DataGrid"] .MuiDataGrid-row--firstVisible',
  '[data-canvas-component="DataGrid"] .MuiDataGrid-columnHeader--last',
  '[data-canvas-component="DataGrid"] .MuiDataGrid-toolbar',
  '[data-canvas-component="DataGrid"] .MuiDataGrid-footerContainer',
  // Header-filter row height = the headerFilterHeight ?? columnHeaderHeight
  // fallback riding the emitted defaultProps — measured to prove it.
  '[data-canvas-component="DataGrid"] .MuiDataGrid-headerFilterRow',
  '[data-canvas-component="DataGrid"] .MuiDataGrid-pivotPanelHeader',
  // :first-of-type → one badge per drop-zone list, not one per field row.
  '[data-canvas-component="DataGrid"] .MuiDataGrid-pivotPanelField:first-of-type',
  '[data-canvas-component="BottomNavigation"] .MuiBottomNavigation-root',
  '[data-canvas-component="Dialog"] .MuiDialog-paper',
];

// Height-measure ruler colour (dimension line + caps + badge).
const MEASURE_COLOR = 'rgba(63, 81, 181, 0.9)';

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
  // Padding ring: each slot needs to BE a positioned element to anchor the
  // ::before overlay. Static slots get position:relative; slots master already
  // positions absolutely (POSITIONED_RING_SLOTS) are skipped — forcing relative
  // would un-anchor them (Badge bubble drops off its icon corner).
  ...Object.fromEntries(
    PADDING_RING_SLOTS.filter((s) => !POSITIONED_RING_SLOTS.has(s)).map((s) => [
      `&[data-debug-boundingbox] ${s}`,
      { position: 'relative' },
    ]),
  ),
  ...Object.fromEntries(
    PADDING_RING_SLOTS.map((s) => [`&[data-debug-boundingbox] ${s}::before`, PADDING_RING]),
  ),
  '&[data-debug-text] .density-debug-text': {
    backgroundColor: 'rgba(0, 116, 217, 0.32)', // text box = blue
  },
  // Spacing tab: gaps aren't padding, so the ::before ring can't reach them. The
  // Bounding-box toggle washes the whole Stack/Grid container green; the opaque
  // .spacing-box children cover their own area → only the gap tracks read green.
  '&[data-debug-boundingbox] [data-spacing-gaps]': {
    backgroundColor: 'rgba(46, 204, 64, 0.5)',
    borderRadius: '4px',
  },
  // Margin markers — an out-of-flow layer (see the effect) positioned by JS
  // from each target's real computed margin, so they track live sidebar
  // overrides. These rules only style the marker; JS sets top/left/width/height.
  '&[data-debug-boundingbox] .density-margin-marker': {
    position: 'absolute',
    pointerEvents: 'none',
    backgroundColor: 'rgba(246, 178, 107, 0.6)', // margin = orange (DevTools convention)
  },
  // Outline every box in the demo area (scoped under [data-canvas-demo], so the
  // per-cell label header + wrapper are skipped) so density shifts read at a glance.
  // `outline` draws outside the box and takes no layout space → no reflow on toggle.
  // The debug-text label spans are excluded — they're overlay helpers, not real boxes.
  '&[data-debug-outline] [data-canvas-demo] *:not(.density-debug-text):not(path)': {
    outline: '1px solid rgba(244, 67, 54, 0.5)',
    outlineOffset: '-1px',
  },
  // Height-measure markers — an out-of-flow layer (see the effect) positioned by
  // JS from each root's rect, so the ruler+badge escape the demo cells' / inputs'
  // overflow clipping. These rules only style the marker; JS sets top/left/height.
  '&[data-debug-measure] .density-measure-marker': {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 5,
  },
  // Vertical dimension line, 6px right of the element edge, spanning its height.
  '&[data-debug-measure] .density-measure-ruler': {
    position: 'absolute',
    left: '6px',
    top: 0,
    bottom: 0,
    width: '1px',
    backgroundColor: MEASURE_COLOR,
  },
  // I-beam end-caps: short horizontal ticks at the top & bottom of the ruler.
  '&[data-debug-measure] .density-measure-ruler::before, &[data-debug-measure] .density-measure-ruler::after':
    {
      content: '""',
      position: 'absolute',
      left: '-3px',
      width: '7px',
      height: '1px',
      backgroundColor: MEASURE_COLOR,
    },
  '&[data-debug-measure] .density-measure-ruler::before': { top: 0 },
  '&[data-debug-measure] .density-measure-ruler::after': { bottom: 0 },
  // px badge, vertically centred, right of the ruler.
  '&[data-debug-measure] .density-measure-badge': {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '1px 5px',
    borderRadius: '4px',
    backgroundColor: '#3f51b5',
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: '11px',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
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
      {/* Button and IconButton share the Button family, so both live in this one
          matrix. Component name is the top group label (Divider+caption, the
          TextField-matrix convention); size is the inner label (plain caption,
          the SvgIcon-matrix convention) — no nested dividers. Button splits by
          `variant`; IconButton has none, so `color` is its 3-cell axis (padding
          is identical across colors — this is for visibility, not a knob). */}
      <Box data-component-section="Button">
        <Divider textAlign="left" sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Button
          </Typography>
        </Divider>
        <Stack spacing={3}>
          {SIZES.map((size) => (
            <Box key={size} data-size-section={size}>
              <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 1 }}>
                {size}
              </Typography>
              <Stack
                direction="row"
                spacing={10}
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
      </Box>
      <Box data-component-section="IconButton">
        <Divider textAlign="left" sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            IconButton
          </Typography>
        </Divider>
        <Stack spacing={3}>
          {SIZES.map((size) => (
            <Box key={size} data-size-section={`icon-${size}`}>
              <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 1 }}>
                {size}
              </Typography>
              <Stack
                direction="row"
                spacing={10}
                useFlexGap
                sx={{ alignItems: 'center', flexWrap: 'wrap' }}
              >
                {ICON_BUTTON_COLORS.map((color) => (
                  <IconButton
                    key={color}
                    size={size}
                    color={color}
                    aria-label="more"
                    data-cell={`icon-${color}-${size}`}
                  >
                    <MoreVertIcon />
                  </IconButton>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

// One realistic account menu; `dense` toggles the whole list. Dense and default
// items never coexist in one list, so the demo shows two lists side by side.
// Trailing hint styled like a keyboard shortcut — pushed to the far right via
// ml:auto, which only displaces itself (and later siblings), so it composes
// safely with the icon+ListItemText item (Archived) without disturbing their
// layout.
function ShortcutHint({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="body2"
      component="span"
      className="density-debug-text"
      sx={{ color: 'text.secondary', ml: 'auto', pl: 4 }}
    >
      {children}
    </Typography>
  );
}

function MenuDemoItems({ dense = false }: { dense?: boolean }) {
  return (
    <React.Fragment>
      <MenuItem dense={dense}>
        <span className="density-debug-text">Profile</span>
        <ShortcutHint>⌘P</ShortcutHint>
      </MenuItem>
      <MenuItem dense={dense} selected>
        <span className="density-debug-text">My account</span>
        <ShortcutHint>⌘U</ShortcutHint>
      </MenuItem>
      <MenuItem dense={dense}>
        <ListItemIcon>
          <InboxIcon fontSize={dense ? 'small' : 'medium'} />
        </ListItemIcon>
        <ListItemText>
          <span className="density-debug-text">Archived</span>
        </ListItemText>
        <ShortcutHint>⌘E</ShortcutHint>
      </MenuItem>
      <MenuItem dense={dense} divider>
        <span className="density-debug-text">Settings</span>
        <ShortcutHint>⌘,</ShortcutHint>
      </MenuItem>
      <MenuItem dense={dense}>
        <span className="density-debug-text">Sign out</span>
        <ShortcutHint>⇧⌘Q</ShortcutHint>
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
      <MenuList sx={{ width: 260, border: '1px solid', borderColor: 'divider' }}>
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
      spacing={10}
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
        spacing={10}
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
      spacing={10}
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
      spacing={10}
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
      spacing={10}
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
      spacing={10}
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
    <Stack
      direction="row"
      spacing={10}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      {/* Full composition — exercises every CardHeader knob (padding, avatar gap,
          action negative pulls) + actions padding/child gap. */}
      <Card variant="outlined" sx={{ width: 300 }}>
        <CardHeader
          avatar={<Avatar>R</Avatar>}
          action={
            <IconButton size="small" aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<span className="density-debug-text">Card header</span>}
          subheader={<span className="density-debug-text">With avatar and action</span>}
        />
        <CardMedia sx={{ height: 96, background: 'linear-gradient(135deg, #90caf9, #1565c0)' }} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <span className="density-debug-text">Body content between media and actions.</span>
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
      {/* Content-only — the ONLY shape where the :last-child paddingBottom knob
          applies (an actions row after the content defeats :last-child). */}
      <Card variant="outlined" sx={{ width: 260 }}>
        <CardContent>
          <Typography variant="caption" color="text.secondary" gutterBottom component="div">
            <span className="density-debug-text">Word of the day</span>
          </Typography>
          <Typography variant="h6" component="div">
            <span className="density-debug-text">benevolent</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span className="density-debug-text">
              Well meaning and kindly — last-child bottom padding applies here.
            </span>
          </Typography>
        </CardContent>
      </Card>
      {/* Dense selectable grid — compact fits more cards per row; CardActionArea
          is a ButtonBase, so height-measure badges apply. */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {(['Plants', 'Animals'] as const).map((title, index) => (
          <Card key={title} variant="outlined" sx={{ width: 180 }}>
            <CardActionArea sx={index === 0 ? { backgroundColor: 'action.selected' } : undefined}>
              <CardContent>
                <Typography variant="subtitle2" component="div">
                  <span className="density-debug-text">{title}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span className="density-debug-text">
                    {index === 0 ? 'Selected card.' : 'Click target.'}
                  </span>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Stack>
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
            spacing={10}
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
            spacing={10}
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
    <Stack
      direction="row"
      spacing={10}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
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
        avatar={<Avatar>N</Avatar>}
        label={<span className="density-debug-text">Natacha</span>}
        size="small"
        onDelete={() => {}}
      />
      <Chip
        icon={<InboxIcon />}
        label={<span className="density-debug-text">Archived</span>}
        size="small"
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
    </Stack>
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
      spacing={10}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      <RadioGroupDemo size="medium" />
      <RadioGroupDemo size="small" />
    </Stack>
  );
}

function SwitchGroupDemo({ size }: { size: 'small' | 'medium' }) {
  const opts = [
    { label: 'Wi-Fi', checked: true },
    { label: 'Bluetooth', checked: false },
  ];
  return (
    <FormControl component="fieldset">
      <FormLabel sx={{ typography: 'caption' }}>Connectivity ({size})</FormLabel>
      <FormGroup>
        {opts.map((o) => (
          <FormControlLabel
            key={o.label}
            control={<Switch size={size} defaultChecked={o.checked} />}
            label={<span className="density-debug-text">{o.label}</span>}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

function SwitchMatrix() {
  return (
    <Stack
      direction="row"
      spacing={10}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      <SwitchGroupDemo size="medium" />
      <SwitchGroupDemo size="small" />
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
          spacing={10}
          useFlexGap
          sx={{ alignItems: 'center', flexWrap: 'wrap' }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ width: 52 }}>
            {size}
          </Typography>
          <ToggleButtonGroup value="left" size={size} exclusive aria-label="text alignment">
            <ToggleButton value="left" aria-label="align left">
              <FormatAlignLeftIcon fontSize={size} />
            </ToggleButton>
            <ToggleButton value="center" aria-label="align center">
              <FormatAlignCenterIcon fontSize={size} />
            </ToggleButton>
            <ToggleButton value="right" aria-label="align right">
              <FormatAlignRightIcon fontSize={size} />
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
      spacing={10}
      useFlexGap
      sx={{ mt: 1, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Avatar>
        <span className="density-debug-text">A</span>
      </Avatar>
      <Avatar>
        <span className="density-debug-text">B</span>
      </Avatar>
    </Stack>
  );
}

function DividerMatrix() {
  // All spacing here is theme.spacing-backed (middle margins, wrapper padding) —
  // it reflows via the per-preset spacing base / Spacing tab, not density steps;
  // the sidebar knobs are override-only.
  return (
    <Stack
      direction="row"
      spacing={10}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      <Stack sx={{ width: 180 }}>
        <Typography variant="body2">
          <span className="density-debug-text">Full bleed</span>
        </Typography>
        <Divider />
        <Typography variant="body2">
          <span className="density-debug-text">Below</span>
        </Typography>
      </Stack>
      <Stack sx={{ width: 180 }}>
        <Typography variant="body2">
          <span className="density-debug-text">Middle</span>
        </Typography>
        <Divider variant="middle" />
        <Typography variant="body2">
          <span className="density-debug-text">Below</span>
        </Typography>
      </Stack>
      <Stack sx={{ width: 180 }}>
        <Typography variant="body2">
          <span className="density-debug-text">Above</span>
        </Typography>
        <Divider>
          <span className="density-debug-text">OR</span>
        </Divider>
        <Typography variant="body2">
          <span className="density-debug-text">Below</span>
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <Button size="small">
          <span className="density-debug-text">Left</span>
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button size="small">
          <span className="density-debug-text">Right</span>
        </Button>
      </Stack>
    </Stack>
  );
}

function SliderMatrix() {
  // Marks/markLabel geometry is frozen by design (master-literal offsets) — the
  // demos cover what reflows: track thickness, thumb size, touch padding,
  // value-label bubble padding. alignItems center keeps rulers clear.
  return (
    <Stack
      direction="row"
      spacing={10}
      useFlexGap
      sx={{ mt: 5, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Box sx={{ width: 180 }}>
        <Slider aria-label="Medium" defaultValue={40} />
      </Box>
      <Box sx={{ width: 180 }}>
        <Slider aria-label="Small" size="small" defaultValue={40} />
      </Box>
      <Box sx={{ width: 180 }}>
        <Slider aria-label="Value label" defaultValue={60} valueLabelDisplay="on" />
      </Box>
      <Box sx={{ height: 120 }}>
        <Slider aria-label="Vertical" orientation="vertical" defaultValue={40} />
      </Box>
    </Stack>
  );
}

function ProgressMatrix() {
  // Bars need a width to render; alignItems center keeps the height ruler clear
  // of neighbors. CircularProgress is excluded: its size is an inline-style prop.
  return (
    <Stack
      direction="row"
      spacing={10}
      useFlexGap
      sx={{ mt: 1, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Box sx={{ width: 200 }}>
        <LinearProgress />
      </Box>
      <Box sx={{ width: 200 }}>
        <LinearProgress variant="determinate" value={60} />
      </Box>
      <Box sx={{ width: 200 }}>
        <LinearProgress variant="buffer" value={60} valueBuffer={80} />
      </Box>
    </Stack>
  );
}

function BadgeMatrix() {
  return (
    <Stack
      direction="row"
      spacing={10}
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
    <Stack
      direction="row"
      spacing={10}
      useFlexGap
      sx={{ mt: 1, alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      {(['small', 'medium', 'large'] as const).map((size) => (
        <ButtonGroup key={size} variant="outlined" size={size}>
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
      ))}
    </Stack>
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
                <TableCell sortDirection="asc">
                  <TableSortLabel active direction="asc">
                    <span className="density-debug-text">Dessert</span>
                  </TableSortLabel>
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
            <TableFooter>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell>
                  <span className="density-debug-text">Total</span>
                </TableCell>
                <TableCell align="right">
                  <span className="density-debug-text">
                    {DESSERT_ROWS.reduce((sum, row) => sum + row.calories, 0)}
                  </span>
                </TableCell>
                <TableCell align="right">
                  <span className="density-debug-text">
                    {DESSERT_ROWS.reduce((sum, row) => sum + row.fat, 0).toFixed(1)}
                  </span>
                </TableCell>
                <TableCell padding="none" />
              </TableRow>
            </TableFooter>
          </Table>
          <TablePagination
            component="div"
            count={64}
            page={1}
            onPageChange={() => {}}
            rowsPerPage={10}
            rowsPerPageOptions={[10, 25]}
          />
        </div>
      ))}
    </Stack>
  );
}

// Data Grid (MUI X) — Phase A emissions live (plan: weave-gaps
// prototype/density/next.md). Heights ride defaultProps raw px (rowHeight
// 28/40/60, columnHeaderHeight follows — JS-gated by the virtualizer; the
// grid's own density prop stays unset so a toolbar-selector flip remains a
// relative user multiplier). Cell/header/edit insets, title gap, toolbar
// trio, footer minHeight, count gutters and actions gap ride density steps;
// su-driven paddings also reflow via --DataGrid-t-spacing-unit
// (← theme.spacing(1)); chrome (column menu, TablePagination, filter fields,
// checkboxes) rides the Material emissions. Panels/menu/pro/premium chrome
// (filter+columns panels, header filters, grouping indent, pivot sidebar,
// overlay gap) get their own emissions — see the presets. Deterministic rows —
// no x-data-grid-generator (random). Grid-internal text can't take the
// .density-debug-text wrapper (rendered by the grid, not authored here).
const DATA_GRID_ROWS = [
  // `category` feeds only the grouping/pivot demos (no category column in the
  // core demos, so adding it changes nothing there).
  { id: 1, name: 'Frozen yoghurt', category: 'Frozen', calories: 159, fat: 6.0, inStock: true },
  { id: 2, name: 'Ice cream sandwich', category: 'Frozen', calories: 237, fat: 9.0, inStock: true },
  { id: 3, name: 'Eclair', category: 'Baked', calories: 262, fat: 16.0, inStock: false },
  { id: 4, name: 'Cupcake', category: 'Baked', calories: 305, fat: 3.7, inStock: true },
  { id: 5, name: 'Gingerbread', category: 'Baked', calories: 356, fat: 16.0, inStock: false },
  { id: 6, name: 'Donut', category: 'Fried', calories: 452, fat: 25.0, inStock: true },
];

const DATA_GRID_COLUMNS: GridColDef[] = [
  { field: 'name', headerName: 'Dessert', width: 140 },
  { field: 'calories', headerName: 'Calories', type: 'number', width: 110 },
  { field: 'fat', headerName: 'Fat (g)', type: 'number', width: 100 },
  { field: 'inStock', headerName: 'In stock', type: 'boolean', width: 100 },
  {
    field: 'actions',
    type: 'actions',
    width: 80,
    getActions: () => [
      <GridActionsCellItem key="copy" icon={<ContentCopyIcon fontSize="small" />} label="Copy" />,
      <GridActionsCellItem key="more" icon={<MoreVertIcon fontSize="small" />} label="More" />,
    ],
  },
];

const DATA_GRID_GROUPING = [
  { groupId: 'Nutrition', children: [{ field: 'calories' }, { field: 'fat' }] },
];

const DATA_GRID_EDIT_COLUMNS: GridColDef[] = [
  { field: 'name', headerName: 'Dessert', width: 180, editable: true },
  { field: 'calories', headerName: 'Calories', type: 'number', width: 110 },
];

// Cell 1/name pinned in edit mode — deterministic, no interaction needed.
const DATA_GRID_EDIT_MODES = { 1: { name: { mode: GridCellModes.Edit } } };

const DATA_GRID_GROUPING_COLUMNS: GridColDef[] = [
  { field: 'name', headerName: 'Dessert', width: 160 },
  { field: 'category', headerName: 'Category', width: 120 },
  { field: 'inStock', headerName: 'In stock', type: 'boolean', width: 110 },
  { field: 'calories', headerName: 'Calories', type: 'number', width: 110 },
];

// Keeps the preference panels INSIDE #density-canvas: portaled panels escape
// the canvas-scoped debug overlays and Density-tab scale-var overrides (preset
// :root vars and theme styleOverrides still reach them either way).
const DATA_GRID_INLINE_PANEL_SLOT_PROPS = {
  basePopper: { material: { disablePortal: true } },
} as const;

function DataGridMatrix() {
  return (
    <Stack spacing={4} sx={{ mt: 1 }}>
      <div>
        <Typography variant="caption" color="text.secondary">
          core — checkbox selection · column group · boolean · actions
        </Typography>
        <div style={{ height: 480, width: '100%' }}>
          <DataGrid
            rows={DATA_GRID_ROWS}
            columns={DATA_GRID_COLUMNS}
            columnGroupingModel={DATA_GRID_GROUPING}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
      <div>
        <Typography variant="caption" color="text.secondary">
          toolbar + quick filter + footer (TablePagination reflows via its Material emissions)
        </Typography>
        <div style={{ height: 320, width: '100%' }}>
          <DataGrid
            rows={DATA_GRID_ROWS}
            columns={DATA_GRID_COLUMNS.slice(0, 4)}
            showToolbar
            pageSizeOptions={[3, 6]}
            initialState={{ pagination: { paginationModel: { pageSize: 3 } } }}
          />
        </div>
      </div>
      <div>
        <Typography variant="caption" color="text.secondary">
          edit input (cell forced into edit mode — inset mirrors the view cell)
        </Typography>
        <div style={{ height: 220, width: '100%' }}>
          <DataGrid
            rows={DATA_GRID_ROWS.slice(0, 2)}
            columns={DATA_GRID_EDIT_COLUMNS}
            cellModesModel={DATA_GRID_EDIT_MODES}
            hideFooter
            disableRowSelectionOnClick
          />
        </div>
      </div>
      <div>
        <Typography variant="caption" color="text.secondary">
          filter panel (open by default, rendered inline) — panelContent padding/gap · filterForm
          gap · field widths · MenuItem/inputs reflow via Material emissions
        </Typography>
        <div style={{ height: 420, width: '100%' }}>
          <DataGrid
            rows={DATA_GRID_ROWS.slice(0, 3)}
            columns={DATA_GRID_COLUMNS.slice(0, 3)}
            hideFooter
            disableRowSelectionOnClick
            initialState={{
              preferencePanel: {
                open: true,
                openedPanelValue: GridPreferencePanelsValue.filters,
              },
              filter: {
                filterModel: { items: [{ field: 'calories', operator: '>', value: '200' }] },
              },
            }}
            slotProps={DATA_GRID_INLINE_PANEL_SLOT_PROPS}
          />
        </div>
      </div>
      <div>
        <Typography variant="caption" color="text.secondary">
          columns panel (open by default, rendered inline) — body/header/footer paddings · row label
          gap · search field via Material emissions
        </Typography>
        <div style={{ height: 420, width: '100%' }}>
          <DataGrid
            rows={DATA_GRID_ROWS.slice(0, 3)}
            columns={DATA_GRID_COLUMNS.slice(0, 4)}
            hideFooter
            disableRowSelectionOnClick
            initialState={{
              preferencePanel: {
                open: true,
                openedPanelValue: GridPreferencePanelsValue.columns,
              },
            }}
            slotProps={DATA_GRID_INLINE_PANEL_SLOT_PROPS}
          />
        </div>
      </div>
      <div>
        <Typography variant="caption" color="text.secondary">
          header filters [pro] — filter-row paddings · input margins · row height rides the
          columnHeaderHeight fallback
        </Typography>
        <div style={{ height: 260, width: '100%' }}>
          <DataGridPremium
            rows={DATA_GRID_ROWS.slice(0, 3)}
            columns={DATA_GRID_GROUPING_COLUMNS.slice(0, 3)}
            headerFilters
            hideFooter
            disableRowSelectionOnClick
          />
        </div>
      </div>
      <div>
        <Typography variant="caption" color="text.secondary">
          row grouping [premium] (pre-expanded) — indent multiplier · toggle gutter/margin
        </Typography>
        <div style={{ height: 420, width: '100%' }}>
          <DataGridPremium
            rows={DATA_GRID_ROWS}
            columns={DATA_GRID_GROUPING_COLUMNS}
            initialState={{ rowGrouping: { model: ['category', 'inStock'] } }}
            defaultGroupingExpansionDepth={-1}
            hideFooter
            disableRowSelectionOnClick
          />
        </div>
      </div>
      <div>
        <Typography variant="caption" color="text.secondary">
          no-columns overlay (all columns hidden) — label↔button gap
        </Typography>
        <div style={{ height: 180, width: '100%' }}>
          <DataGrid
            rows={[]}
            columns={DATA_GRID_COLUMNS.slice(0, 2)}
            initialState={{
              columns: { columnVisibilityModel: { name: false, calories: false } },
            }}
            hideFooter
          />
        </div>
      </div>
      <div>
        <Typography variant="caption" color="text.secondary">
          pivot sidebar [premium] (open by default) — sidebar width · panel header 52-rhythm · field
          rows · drop zones
        </Typography>
        <div style={{ height: 440, width: '100%' }}>
          <DataGridPremium
            rows={DATA_GRID_ROWS}
            columns={DATA_GRID_GROUPING_COLUMNS}
            hideFooter
            disableRowSelectionOnClick
            initialState={{
              pivoting: {
                enabled: true,
                panelOpen: true,
                model: {
                  rows: [{ field: 'category' }],
                  columns: [{ field: 'inStock' }],
                  values: [{ field: 'calories', aggFunc: 'sum' }],
                },
              },
            }}
          />
        </div>
      </div>
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
      spacing={10}
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
  const labels = ['Cart', 'Shipping', 'Payment'];
  const steps = labels.map((label) => (
    <Step key={label}>
      <StepLabel>
        <span className="density-debug-text">{label}</span>
      </StepLabel>
    </Step>
  ));
  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      {/* Row 1 — horizontal: first/last gutters + icon→label gap + column gap;
          alternativeLabel freezes the icon gap but keeps the column-gap knob
          (its connector right edge follows via the linked write). */}
      <Stack
        direction="row"
        spacing={10}
        useFlexGap
        sx={{ alignItems: 'flex-start', flexWrap: 'wrap' }}
      >
        <Stepper activeStep={1} sx={{ width: 360 }}>
          {steps}
        </Stepper>
        <Stepper activeStep={1} alternativeLabel sx={{ width: 320 }}>
          {steps}
        </Stepper>
      </Stack>
      {/* Row 2 — vertical: compact re-centers the flow lines (connector/content
          insets); the column-gap knob must NOT move these. */}
      <Stack
        direction="row"
        spacing={10}
        useFlexGap
        sx={{ alignItems: 'flex-start', flexWrap: 'wrap' }}
      >
        <Stepper activeStep={1} orientation="vertical" sx={{ width: 220 }}>
          {labels.map((label) => (
            <Step key={label}>
              <StepLabel>
                <span className="density-debug-text">{label}</span>
              </StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary">
                  <span className="density-debug-text">Step details.</span>
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <Stepper activeStep={1} orientation="vertical" alternativeLabel sx={{ width: 220 }}>
          {labels.map((label) => (
            <Step key={label}>
              <StepLabel>
                <span className="density-debug-text">{label}</span>
              </StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary">
                  <span className="density-debug-text">Step details.</span>
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </Stack>
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
      spacing={10}
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
      {/* Extended variant stays frozen at master (preset comment) — visible control. */}
      <Fab variant="extended" color="primary">
        <InboxIcon sx={{ mr: 1 }} />
        <span className="density-debug-text">Extended</span>
      </Fab>
    </Stack>
  );
}

function PaginationMatrix() {
  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      {/* count/defaultPage chosen so ellipsis renders (auto height, knob-excluded). */}
      <Pagination count={10} defaultPage={6} size="small" />
      <Pagination count={10} defaultPage={6} />
      <Pagination count={10} defaultPage={6} size="large" />
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
  const actions = ['Recents', 'Favorites', 'Nearby'].map((label) => (
    <BottomNavigationAction
      key={label}
      label={<span className="density-debug-text">{label}</span>}
      icon={<InboxIcon />}
    />
  ));
  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      {/* icon-only (no showLabels): unselected items exercise the centering
          paddingTop state; the selected one keeps its label. */}
      <BottomNavigation value={0} sx={{ width: 400 }}>
        {actions}
      </BottomNavigation>
      <BottomNavigation value={0} showLabels sx={{ width: 400 }}>
        {actions}
      </BottomNavigation>
    </Stack>
  );
}

function DialogMatrix() {
  return (
    <Stack spacing={4} sx={{ mt: 1 }}>
      <div>
        <Typography variant="caption" color="text.secondary">
          real dialog, rendered inline — paper margin (one --_dialogMargin var drives the
          100%-minus-margin viewport calcs) · title/content/actions paddings · fullWidth width
        </Typography>
        <div style={{ position: 'relative', height: 300, width: '100%' }}>
          <Dialog
            open
            fullWidth
            hideBackdrop
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            disableScrollLock
            sx={{ position: 'absolute' }}
          >
            <DialogTitle>
              <span className="density-debug-text">Use location service?</span>
            </DialogTitle>
            <DialogContent>
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
          </Dialog>
        </div>
      </div>
      <DialogStaticComposition />
    </Stack>
  );
}

function DialogStaticComposition() {
  // `dividers` on the content covers its distinct (frozen, re-asserted) padding leaf.
  return (
    <Paper sx={{ width: 360 }}>
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
      spacing={10}
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

// Subtle dashed tile for the Spacing demos. bgcolor MUST stay opaque (grey.100,
// not an alpha token) so it covers the green gap wash (Padding debug), leaving
// only the gap tracks green.
const SPACING_BOX_SX = {
  px: 2,
  py: 1.5,
  minWidth: 44,
  textAlign: 'center',
  borderRadius: 1,
  border: '1px dashed',
  borderColor: 'grey.400',
  bgcolor: 'grey.100',
  color: 'text.secondary',
  fontSize: 13,
} as const;

// Theme-token canvas previews, keyed by layout tab id.
const THEME_TOKEN_PREVIEW: Record<TokenTabKey, () => React.ReactNode> = {
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
  // theme.spacing (var-backed --mui-spacing) drives Stack/Grid gaps + Container
  // gutters. The Padding toggle washes the Stack/Grid gap tracks green (gaps
  // aren't padding, so the ::before ring can't reach them — see DEBUG_SX).
  spacing: () => (
    <Stack spacing={4} sx={{ mt: 1, alignItems: 'flex-start' }}>
      <Box data-canvas-demo="Stack-spacing">
        <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 0.5 }}>
          <span className="density-debug-text">Stack · direction=&quot;row&quot; spacing={2}</span>
        </Typography>
        <Stack direction="row" spacing={2} data-spacing-gaps sx={{ borderRadius: 1 }}>
          {['A', 'B', 'C', 'D'].map((t) => (
            <Box key={t} className="spacing-box" sx={SPACING_BOX_SX}>
              <span className="density-debug-text">{t}</span>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box data-canvas-demo="Grid-spacing">
        <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 0.5 }}>
          <span className="density-debug-text">Grid · container spacing={2}</span>
        </Typography>
        <Box sx={{ width: 320 }}>
          <Grid container spacing={2} data-spacing-gaps sx={{ borderRadius: 1 }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Grid key={n} size={4}>
                <Box className="spacing-box" sx={{ ...SPACING_BOX_SX, minWidth: 0, width: '100%' }}>
                  <span className="density-debug-text">{n}</span>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box data-canvas-demo="Container-spacing" sx={{ width: '100%', maxWidth: 560 }}>
        <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 0.5 }}>
          <span className="density-debug-text">
            Container · responsive gutters (Padding shows them)
          </span>
        </Typography>
        <Container
          maxWidth="sm"
          sx={{ bgcolor: 'action.hover', py: 1.5, outline: '1px dashed', outlineColor: 'divider' }}
        >
          <span className="density-debug-text">Container content — gutters = theme.spacing</span>
        </Container>
      </Box>
    </Stack>
  ),
};

// Typography lives in the theme-token section now (theme.typography), not here —
// TypographyMatrix is reused as that panel's canvas preview.
const COMPONENT_DEFS = {
  Button: {
    canvasLabel:
      'Button (color="primary") — text/outlined/contained; IconButton — default/primary/secondary',
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
  Switch: {
    canvasLabel: 'Switch — interlocked track/thumb/touch geometry (medium + small)',
    Matrix: React.memo(SwitchMatrix),
  },
  Avatar: {
    canvasLabel: 'Avatar — square size (raw px)',
    Matrix: React.memo(AvatarMatrix),
  },
  Progress: {
    canvasLabel:
      'Progress — linear bar thickness (raw px); circular excluded (size prop is inline style)',
    Matrix: React.memo(ProgressMatrix),
  },
  Slider: {
    canvasLabel:
      'Slider — track thickness + thumb (raw px), touch padding + bubble padding (steps); coarse-pointer floor frozen',
    Matrix: React.memo(SliderMatrix),
  },
  Divider: {
    canvasLabel:
      'Divider — margins/wrapper padding are theme.spacing-backed (reflow via Spacing tab); knobs override-only',
    Matrix: React.memo(DividerMatrix),
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
    canvasLabel: 'ButtonGroup — min-width floor + Button padding (small/medium/large)',
    Matrix: React.memo(ButtonGroupMatrix),
  },
  Table: {
    canvasLabel: 'Table — cell block padding per size + inline padding',
    Matrix: React.memo(TableCellMatrix),
  },
  DataGrid: {
    canvasLabel:
      'Data Grid (MUI X) — heights via defaultProps raw px (row + header 28/40/60; grid density prop unset), insets/gaps via steps; chrome rides Material emissions',
    Matrix: React.memo(DataGridMatrix),
  },
  Autocomplete: {
    canvasLabel: 'Autocomplete — option list min-height + padding (open)',
    Matrix: React.memo(AutocompleteMatrix),
  },
  Stepper: {
    canvasLabel:
      'Stepper — gutters + icon→label gap + flow gap (horizontal / alternativeLabel / vertical)',
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
// Linked-write targets hide like virtual members (render-only): they must stay
// in densityGroups so their mapping entries reach collectDensityEdits — putting
// them in hiddenFieldIds would drop them from the apply path entirely.
const linkedTargetIds = new Set(
  Object.values(densityLinkedWrites).flatMap((links) => links.map((l) => l.id)),
);
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
    if (linkedTargetIds.has(id)) {
      continue; // written by its key row's linked write (e.g. Switch gutter)
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
        // Configured slots lead (componentSlotOrder), then `root`, then the
        // rest alphabetically.
        const pinned = componentSlotOrder[component];
        if (pinned) {
          const ai = pinned.indexOf(a);
          const bi = pinned.indexOf(b);
          if (ai !== -1 || bi !== -1) {
            if (ai === -1) {
              return 1;
            }
            if (bi === -1) {
              return -1;
            }
            return ai - bi;
          }
        }
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

// ── Slot highlight (sidebar → canvas) ────────────────────────────────────────
// One sidebar slot group can be spotlighted in the canvas at a time, showing the
// blast radius of its knobs before an override. Pure CSS off a class selector —
// survives DataGrid row virtualization and knob-commit reflows with no
// observers. The selector derives from the MUI convention (styleOverrides keys
// are classes keys: `Mui<Component>-<slot>`); the map covers slots with no
// class of their own (defaultProps → the boxes those props size) or future
// convention misses.
const SLOT_HIGHLIGHT_SELECTORS: Record<string, string> = {
  'DataGrid|defaultProps': '.MuiDataGrid-row, .MuiDataGrid-columnHeader',
};
// Violet — green (padding), orange (margin), blue (text) are taken; box-shadow
// (no background) composes with the outline (⊞) debug mode and keeps content
// untinted. Pulse via box-shadow LAYERS: layer 1 = constant inset locator ring;
// layer 2 = outer ring spreading 0→8px while fading to transparent. Same layer
// count at every stop → smooth interpolation; the loop seam is invisible (the
// outer ring ends at alpha 0).
const SLOT_HIGHLIGHT_COLOR = 'rgb(156, 39, 176)';
const slotPulse = keyframes({
  '0%': {
    boxShadow: 'inset 0 0 0 2px rgba(156, 39, 176, 0.9), 0 0 0 0 rgba(156, 39, 176, 0.55)',
  },
  '100%': {
    boxShadow: 'inset 0 0 0 2px rgba(156, 39, 176, 0.9), 0 0 0 8px rgba(156, 39, 176, 0)',
  },
});
const SLOT_HIGHLIGHT_STYLE = {
  animation: `${slotPulse} 1.4s ease-out infinite`,
};
function slotHighlightSx(key: string) {
  const [component, slot] = key.split('|');
  const selector = SLOT_HIGHLIGHT_SELECTORS[key] ?? `.Mui${component}-${slot}`;
  const scoped = selector
    .split(',')
    .map((s) => `& ${s.trim()}`)
    .join(', ');
  return { [scoped]: SLOT_HIGHLIGHT_STYLE };
}

interface FamilyKnobsProps {
  familyKey: string;
  mapping: Record<string, string>;
  preset: Preset;
  scalePx: Record<string, string> | null;
  setFields: (ids: string[], value: string) => void;
  highlightSlot: string | null;
  onToggleHighlight: (key: string) => void;
}

// One family's mapping tree. Memo comparator: skip re-render unless THIS family's
// read ids changed — the WHOLE mapping is passed (a fresh slice object per render
// would defeat the memo) — or preset/scalePx/disabled flipped (stale-knob hazard:
// placeholders and previews all derive from those three).
const FamilyKnobs = React.memo(
  function FamilyKnobs(props: FamilyKnobsProps) {
    const { familyKey, mapping, preset, scalePx, setFields, highlightSlot, onToggleHighlight } =
      props;
    return (
      <React.Fragment>
        {(familyKnobTree.get(familyKey) ?? []).map(({ component, slots }) => (
          <Box key={component} sx={{ mt: 2 }} data-mapping-component={component}>
            <Typography sx={{ fontWeight: 'medium', fontSize: 13 }}>{component}</Typography>
            {slots.map(([slot, slotEntries]) => {
              const slotKey = `${component}|${slot}`;
              const highlighted = highlightSlot === slotKey;
              return (
                <Box
                  key={slot}
                  data-mapping-slot={slot}
                  sx={{
                    mt: 1,
                    pl: 1.5,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      borderLeft: '1px solid',
                      borderColor: 'divider',
                      position: 'absolute',
                      top: '32px',
                      bottom: '6px',
                      left: 0,
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ alignItems: 'center', ml: '-16px', mb: 1 }}
                  >
                    <Typography variant="caption" color="text.secondary" sx={SLOT_TAG_SX}>
                      {slot}
                    </Typography>
                    <Tooltip title="Highlight this slot in the canvas">
                      <IconButton
                        size="small"
                        aria-label={`Highlight ${component} ${slot} in the canvas`}
                        aria-pressed={highlighted}
                        data-slot-highlight-toggle={slotKey}
                        onClick={() => onToggleHighlight(slotKey)}
                        sx={{
                          p: 0.25,
                          color: highlighted ? SLOT_HIGHLIGHT_COLOR : 'text.disabled',
                        }}
                      >
                        <HighlightAltIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
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
                          // typed → preview the typed value; empty → the inherited preset default
                          computeHelper={(draft) => ({
                            helper: previewText(draft || canon, scalePx),
                          })}
                          onCommit={(v) => setFields(entry.writeIds, v)}
                        />
                      );
                    })}
                  </Stack>
                </Box>
              );
            })}
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
    prev.highlightSlot === next.highlightSlot &&
    prev.onToggleHighlight === next.onToggleHighlight &&
    (familyReadIds.get(next.familyKey) ?? []).every((id) => prev.mapping[id] === next.mapping[id]),
);

export default function DensityExperiment() {
  const [preset, setPreset] = React.useState<Preset>('unset');
  const [selection, setSelection] = React.useState<Selection>('All');
  const [debug, setDebug] = React.useState<string[]>([]);
  // Slot highlight: the sidebar slot group spotlighted in the canvas
  // ("<Component>|<slot>", single-active); cleared on family switch.
  const [highlightSlot, setHighlightSlot] = React.useState<string | null>(null);
  const toggleHighlightSlot = React.useCallback(
    (key: string) => setHighlightSlot((prev) => (prev === key ? null : key)),
    [],
  );
  React.useEffect(() => {
    setHighlightSlot(null);
  }, [selection]);
  // Height-measure overlay: the only debug mode that needs JS — CSS can't read a
  // rendered height, and an in-flow ::after badge gets clipped by the demo cells'
  // / inputs' overflow (and the canvas's own overflow-y:auto, which forces
  // overflow-x to compute as auto). So markers live in an out-of-flow layer
  // appended to the (positioned) canvas — they scroll with content but escape all
  // that clipping. A ResizeObserver (targets + canvas) and a MutationObserver
  // (family/preset/component swaps) trigger a batched relayout that repositions
  // every marker from its target's rect, so moves — not just resizes — stay in sync.
  const measureOn = debug.includes('measure');
  React.useEffect(() => {
    if (!measureOn) {
      return undefined;
    }
    const canvas = document.getElementById('density-canvas');
    if (!canvas) {
      return undefined;
    }
    const selector = MEASURE_SLOTS.join(',');
    const layer = document.createElement('div');
    layer.dataset.measureLayer = '';
    layer.style.cssText =
      'position:absolute;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;';
    canvas.appendChild(layer);

    const markers = new Map<Element, { root: HTMLDivElement; badge: HTMLSpanElement }>();
    const makeMarker = () => {
      const root = document.createElement('div');
      root.className = 'density-measure-marker';
      const ruler = document.createElement('div');
      ruler.className = 'density-measure-ruler';
      const badge = document.createElement('span');
      badge.className = 'density-measure-badge';
      root.append(ruler, badge);
      layer.appendChild(root);
      return { root, badge };
    };

    let raf = 0;
    let ro: ResizeObserver;
    const relayout = () => {
      raf = 0;
      const targets = Array.from(canvas.querySelectorAll(selector));
      const canvasRect = canvas.getBoundingClientRect();
      const { scrollTop, scrollLeft } = canvas;
      // Read phase — all getBoundingClientRect together, no interleaved writes.
      const reads = targets.map((el) => ({ el, rect: el.getBoundingClientRect() }));
      const seen = new Set<Element>();
      // Write phase.
      reads.forEach(({ el, rect }) => {
        seen.add(el);
        let marker = markers.get(el);
        if (!marker) {
          marker = makeMarker();
          markers.set(el, marker);
          ro.observe(el);
        }
        marker.root.style.top = `${rect.top - canvasRect.top + scrollTop}px`;
        marker.root.style.left = `${rect.right - canvasRect.left + scrollLeft}px`;
        marker.root.style.height = `${rect.height}px`;
        // Show sub-pixel heights (e.g. 34.5px); trailing zeros drop, so whole
        // numbers stay clean (35px, not 35.00px).
        marker.badge.textContent = `${Math.round(rect.height * 100) / 100}px`;
      });
      markers.forEach((marker, el) => {
        if (!seen.has(el)) {
          marker.root.remove();
          markers.delete(el);
          ro.unobserve(el);
        }
      });
    };
    const schedule = () => {
      if (!raf) {
        raf = requestAnimationFrame(relayout);
      }
    };

    ro = new ResizeObserver(schedule);
    ro.observe(canvas);
    const mo = new MutationObserver(schedule);
    mo.observe(canvas, { childList: true, subtree: true });
    window.addEventListener('resize', schedule);
    relayout();

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      window.removeEventListener('resize', schedule);
      ro.disconnect();
      mo.disconnect();
      layer.remove();
    };
  }, [measureOn]);
  // Margin markers (part of the Bounding-box toggle) — same rationale and
  // shape as the height-measure effect above, but reading each target's REAL
  // computed margin (all 4 sides) instead of its height. This is what makes
  // the ring track a live sidebar override: a hardcoded density-var ring looks
  // right until the user edits the knob, then silently goes stale — reading
  // getComputedStyle never can, since it reflects whatever actually rendered.
  // MutationObserver also needs `attributes` here (not just childList/subtree):
  // an override often just swaps the target's generated class in place
  // (same element, new computed margin) without any child list changing.
  const boundingBoxOn = debug.includes('boundingBox');
  React.useEffect(() => {
    if (!boundingBoxOn) {
      return undefined;
    }
    const canvas = document.getElementById('density-canvas');
    if (!canvas) {
      return undefined;
    }
    const selector = MARGIN_MARKER_SELECTORS.join(',');
    const layer = document.createElement('div');
    layer.dataset.marginLayer = '';
    layer.style.cssText =
      'position:absolute;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;';
    canvas.appendChild(layer);

    type Side = 'top' | 'right' | 'bottom' | 'left';
    const SIDES: Side[] = ['top', 'right', 'bottom', 'left'];
    const markers = new Map<Element, Partial<Record<Side, HTMLDivElement>>>();
    const getMarker = (el: Element, side: Side) => {
      const bySide = markers.get(el) ?? {};
      markers.set(el, bySide);
      let marker = bySide[side];
      if (!marker) {
        marker = document.createElement('div');
        marker.className = 'density-margin-marker';
        layer.appendChild(marker);
        bySide[side] = marker;
      }
      return marker;
    };

    let raf = 0;
    let ro: ResizeObserver;
    const relayout = () => {
      raf = 0;
      const targets = Array.from(canvas.querySelectorAll(selector));
      const canvasRect = canvas.getBoundingClientRect();
      const { scrollTop, scrollLeft } = canvas;
      // Read phase — rects + computed margins together, no interleaved writes.
      const reads = targets.map((el) => ({
        el,
        rect: el.getBoundingClientRect(),
        cs: getComputedStyle(el),
      }));
      const seen = new Set<Element>();
      // Write phase.
      reads.forEach(({ el, rect, cs }) => {
        seen.add(el);
        if (!markers.has(el)) {
          ro.observe(el);
        }
        const bySide = markers.get(el) ?? {};
        markers.set(el, bySide);
        SIDES.forEach((side) => {
          const raw = parseFloat(cs.getPropertyValue(`margin-${side}`)) || 0;
          if (raw === 0) {
            bySide[side]?.remove();
            delete bySide[side];
            return;
          }
          const marker = getMarker(el, side);
          const size = Math.abs(raw);
          const outward = raw > 0;
          const top = rect.top - canvasRect.top + scrollTop;
          const left = rect.left - canvasRect.left + scrollLeft;
          if (side === 'left' || side === 'right') {
            marker.style.top = `${top}px`;
            marker.style.height = `${rect.height}px`;
            marker.style.width = `${size}px`;
            marker.style.left =
              side === 'right'
                ? `${left + rect.width + (outward ? 0 : -size)}px`
                : `${left + (outward ? -size : 0)}px`;
          } else {
            marker.style.left = `${left}px`;
            marker.style.width = `${rect.width}px`;
            marker.style.height = `${size}px`;
            marker.style.top =
              side === 'bottom'
                ? `${top + rect.height + (outward ? 0 : -size)}px`
                : `${top + (outward ? -size : 0)}px`;
          }
        });
      });
      markers.forEach((bySide, el) => {
        if (!seen.has(el)) {
          Object.values(bySide).forEach((m) => m?.remove());
          markers.delete(el);
          ro.unobserve(el);
        }
      });
    };
    const schedule = () => {
      if (!raf) {
        raf = requestAnimationFrame(relayout);
      }
    };

    ro = new ResizeObserver(schedule);
    ro.observe(canvas);
    const mo = new MutationObserver(schedule);
    mo.observe(canvas, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
    window.addEventListener('resize', schedule);
    relayout();

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      window.removeEventListener('resize', schedule);
      ro.disconnect();
      mo.disconnect();
      layer.remove();
    };
  }, [boundingBoxOn]);
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
  // Theme-token tab (typography/radius/spacing) or null — the density tab is scale
  // knobs, the components tab is mapping knobs. Derived from TAB_TOKEN_GROUP so a
  // new token tab needs no second edit here.
  const tokenTab: TokenTabKey | null =
    (tab as string) in TAB_TOKEN_GROUP ? (tab as TokenTabKey) : null;
  const visibleGroups =
    selection === 'All' ? densityGroups : densityGroups.filter((g) => g.key === selection);
  const visibleComponents = visibleGroups.map((g) => g.key) as ComponentName[];
  // Density tab always shows the full canvas (same as the component selector's
  // "All") — scale steps reflow everything, so the selector doesn't apply.
  const canvasComponents =
    tab === 'density' ? (densityGroups.map((g) => g.key) as ComponentName[]) : visibleComponents;

  // Preset theme (no overrides) — drives placeholders/legend and is the base the
  // user overrides append onto.
  const presetTheme = React.useMemo(() => {
    if (preset === 'unset') {
      return createTheme({ cssVariables: true });
    }
    // Per-preset theme.spacing base (compact tightens to 6) — set on the base
    // theme so --mui-spacing ships on the preset's own channel; placeholder +
    // canvas read it generically, and the export bakes it. See PRESET_SPACING_DEFAULT.
    return PRESET_FN[preset](
      createTheme({ cssVariables: true, spacing: PRESET_SPACING_DEFAULT[preset] }),
    );
  }, [preset]);

  // Unenhanced base. A typography knob counts as a preset default only when the
  // preset diverges from base here; a value equal to base is inherited (the
  // preset didn't emit it) → blank placeholder, matching the mapping knobs.
  const baseTheme = React.useMemo(() => createTheme({ cssVariables: true }), []);

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
      // theme.spacing is a FUNCTION — setting it to a number would break
      // theme.spacing() at render. It's var-backed (--mui-spacing), so the
      // override rides tokenCssVars instead; never touch the theme object.
      if (edit.path[0] === 'spacing') {
        continue;
      }
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
    // Scale-step overrides (Density tab) — re-declare the step var on the canvas;
    // every emitted var(--mui-density-*) consumer below inherits the override.
    for (const edit of collectScaleEdits(deferredMapping)) {
      out[`--mui-density-${edit.key}`] = edit.value;
    }
    return Object.keys(out).length ? out : undefined;
  }, [preset, presetTheme, deferredMapping]);

  // The preset's own scale in px, straight off the enhanced theme — placeholder
  // source for the Density-tab knobs (mirrors what the preset ships).
  const presetScalePx =
    preset === 'unset'
      ? null
      : (presetTheme as unknown as { density: Record<string, string> }).density;

  // EFFECTIVE scale (preset ⊕ scale-step overrides) — single source of truth for
  // the legend + every helper preview, so `xs` resolves to what the canvas
  // actually applies. Committed mapping, not deferred: sidebar feedback is instant.
  const scalePx = React.useMemo(() => {
    if (!presetScalePx) {
      return null;
    }
    const edits = collectScaleEdits(mapping);
    if (!edits.length) {
      return presetScalePx;
    }
    const out = { ...presetScalePx };
    for (const edit of edits) {
      // A step alias (`var(--mui-density-xs)`) resolves against the preset's own px.
      out[edit.key] = previewText(edit.value, presetScalePx);
    }
    return out;
  }, [presetScalePx, mapping]);

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
          // Linked writes: derived rows follow the key row (e.g. Switch label
          // pull = -gutter); clearing the key clears them.
          for (const link of densityLinkedWrites[id] ?? []) {
            bucket[link.id] = value.trim() ? link.wrap(resolveValue(value)) : '';
          }
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

  // Copy: same generated source as Export, onto the clipboard instead of a
  // file download. `copied` flips the icon briefly as feedback.
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    const source = buildExportSource(buildExportInput(mappingByPreset));
    navigator.clipboard.writeText(source).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
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
              value="boundingBox"
              aria-label="highlight bounding box"
              data-debug-toggle="boundingBox"
            >
              <Tooltip title="Bounding box (padding + margin)">
                <CropFreeIcon fontSize="small" />
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
            <ToggleButton value="measure" aria-label="measure height" data-debug-toggle="measure">
              <Tooltip title="Measure height">
                <HeightIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
          <Button variant="outlined" onClick={handleExport} data-export-button>
            Export density.ts
          </Button>
          <Tooltip title={copied ? 'Copied!' : 'Copy density.ts to clipboard'}>
            <IconButton
              onClick={handleCopy}
              aria-label="copy density.ts to clipboard"
              data-copy-button
            >
              {copied ? <CheckIcon /> : <ContentCopyIcon />}
            </IconButton>
          </Tooltip>
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
                      highlightSlot={highlightSlot}
                      onToggleHighlight={toggleHighlightSlot}
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

          {/* Density tab — the preset's scale steps. An override re-declares the
              step var on the canvas AND replaces the step in the exported :root
              block (same collectScaleEdits path — export = canvas). */}
          {tab === 'density' && mappingEnabled && presetScalePx && (
            <Box component="section" data-token-group="Density scale" sx={{ px: 3, pt: 3, pb: 3 }}>
              <Typography component="h2" sx={{ fontWeight: 'medium', fontSize: 14 }}>
                Scale
              </Typography>
              <Typography variant="caption" color="text.secondary" component="p" sx={{ mt: 0.5 }}>
                Each step feeds var(--mui-density-*) — every spacing knob mapped to it reflows.
              </Typography>
              <Stack spacing={1.5} sx={{ mt: 1.5 }}>
                {SCALE_KEYS.map((key) => {
                  const canon = presetScalePx[key];
                  return (
                    <KnobInput
                      key={`${preset}:${key}`}
                      id={`density.${key}`}
                      idAttr="data-token-field"
                      label={key}
                      value={mapping[`density.${key}`] ?? ''}
                      placeholder={canon}
                      computeHelper={(draft) => {
                        const tokens = tokenize(draft);
                        if (tokens.length > 1) {
                          return { helper: 'one value per step', error: true };
                        }
                        if (tokens[0] === key) {
                          return { helper: 'step cannot reference itself', error: true };
                        }
                        return { helper: previewText(draft || canon, presetScalePx) };
                      }}
                      onCommit={(v) => setFields([`density.${key}`], v)}
                    />
                  );
                })}
              </Stack>
            </Box>
          )}

          {tokenTab &&
            mappingEnabled &&
            (() => {
              const group = themeTokenGroups.find((g) => g.key === TAB_TOKEN_GROUP[tokenTab])!;
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
                          ? {
                              mt: 1,
                              pl: 1.5,
                              position: 'relative',
                              '&::before': {
                                content: '""',
                                borderLeft: '1px solid',
                                borderColor: 'divider',
                                position: 'absolute',
                                top: '32px',
                                bottom: '6px',
                                left: 0,
                              },
                            }
                          : { mt: 1 }
                      }
                    >
                      {slot.key && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ ...SLOT_TAG_SX, ml: '-13px', mb: 1 }}
                        >
                          {slot.key}
                        </Typography>
                      )}
                      <Stack spacing={1.5} sx={{ mt: slot.key ? 0.5 : 0 }}>
                        {slot.knobs.map((knob) => {
                          // Same placeholder/helper rules as the mapping knobs:
                          // placeholder = what you'd type (vars shortened, blank when
                          // no default); helper = the resolved value of draft-or-default.
                          // A value equal to base is inherited, not preset-emitted →
                          // blank (e.g. comfort touches only `button`, so h1…h6 stay blank).
                          // theme.spacing is a function → can't be read off the
                          // theme as a number; its default is the per-preset base.
                          const isSpacing = knob.id === 'spacing';
                          const emitted = isSpacing
                            ? String(PRESET_SPACING_DEFAULT[preset as PresetLevel])
                            : readThemeToken(presetTheme, knob.path);
                          // A value equal to base is inherited, not preset-emitted →
                          // blank (spacing always shows its per-preset default).
                          const inherited =
                            !isSpacing && emitted === readThemeToken(baseTheme, knob.path);
                          const canon = inherited ? '' : emitted;
                          return (
                            <KnobInput
                              key={knob.id}
                              id={knob.id}
                              idAttr="data-token-field"
                              label={knob.label}
                              value={mapping[knob.id] ?? ''}
                              placeholder={shortenDensityVars(canon)}
                              computeHelper={(draft) => ({
                                helper: previewText(draft || canon, scalePx),
                              })}
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
            data-debug-boundingbox={boundingBoxOn ? '' : undefined}
            data-debug-text={debug.includes('text') ? '' : undefined}
            data-debug-outline={debug.includes('outline') ? '' : undefined}
            data-debug-measure={measureOn ? '' : undefined}
            style={tokenCssVars}
            sx={{
              flex: 1,
              minHeight: 0,
              position: 'relative',
              overflowY: 'auto',
              p: 4,
              ...DEBUG_SX,
              ...(highlightSlot ? slotHighlightSx(highlightSlot) : null),
            }}
          >
            <Stack spacing={6}>
              {tokenTab && (
                <Box data-token-preview={tokenTab}>
                  <Typography variant="overline" color="text.secondary" component="div">
                    {TAB_TOKEN_GROUP[tokenTab]} — theme token preview
                  </Typography>
                  {THEME_TOKEN_PREVIEW[tokenTab]()}
                </Box>
              )}
              {!tokenTab &&
                canvasComponents.map((comp) => {
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
