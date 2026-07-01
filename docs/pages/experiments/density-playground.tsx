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
import MenuItem, { private_menuItemVars } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Menu from '@mui/material/Menu';
import { private_listVars } from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import TextField from '@mui/material/TextField';
import InputAdornment, { private_inputAdornmentVars } from '@mui/material/InputAdornment';
import { private_outlinedInputVars } from '@mui/material/OutlinedInput';
import { private_filledInputVars } from '@mui/material/FilledInput';
import { private_inputVars } from '@mui/material/Input';
import Tabs, { private_tabsVars } from '@mui/material/Tabs';
import Tab, { private_tabVars } from '@mui/material/Tab';
import Checkbox, { private_checkboxVars } from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent, { private_cardContentVars } from '@mui/material/CardContent';
import Select, { private_selectVars } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Alert, { private_alertVars } from '@mui/material/Alert';
import Chip, { private_chipVars } from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary, { private_accordionSummaryVars } from '@mui/material/AccordionSummary';
import AccordionDetails, { private_accordionDetailsVars } from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip, { private_tooltipVars } from '@mui/material/Tooltip';
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

const buttonVar = (size: Size) => private_buttonVars[`${size}Pad` as MappingKey];

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
        const value = mapping[key] ?? '';
        // TO5/TO6: element-level token wins over the preset's styleOverride.
        // At `unset`/empty/invalid emit NO token → falls back to the literal
        // `--_pad` default (unset) or the preset's own mapping.
        const sx =
          mappingEnabled && parseMapping(value).state === 'ok'
            ? { [buttonVar(size)]: resolveValue(value) }
            : undefined;
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

// The Menu family's density tokens: List container block padding + MenuItem
// block/inline padding + min-height, keyed by the `dense` axis. Field key ===
// mapping-state key. Sizing tokens (`minHeight`) accept raw px like any other —
// a density key is just sugar; heights ship as raw px per preset.
const MENU_FIELDS: DensityField[] = [
  { key: 'listBlockPad', cssVar: private_listVars.blockPad },
  { key: 'blockPad', cssVar: private_menuItemVars.blockPad },
  { key: 'inlinePad', cssVar: private_menuItemVars.inlinePad },
  { key: 'minHeight', cssVar: private_menuItemVars.minHeight },
  { key: 'denseBlockPad', cssVar: private_menuItemVars.denseBlockPad },
  { key: 'denseInlinePad', cssVar: private_menuItemVars.denseInlinePad },
  { key: 'denseMinHeight', cssVar: private_menuItemVars.denseMinHeight },
];

function MenuDemoItems({ itemSx }: { itemSx: Record<string, string> | undefined }) {
  return (
    <React.Fragment>
      <MenuItem sx={itemSx}>
        <span className="density-debug-text">Default item</span>
      </MenuItem>
      <MenuItem selected sx={itemSx}>
        <span className="density-debug-text">Selected item</span>
      </MenuItem>
      <MenuItem sx={itemSx}>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <span className="density-debug-text">With icon</span>
        </ListItemText>
      </MenuItem>
      <MenuItem divider sx={itemSx}>
        <span className="density-debug-text">With divider</span>
      </MenuItem>
      <MenuItem dense sx={itemSx}>
        <span className="density-debug-text">Dense item</span>
      </MenuItem>
      <MenuItem dense sx={itemSx}>
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

function MenuMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  // Element-level tokens win over the preset's styleOverride. `--List-blockPad`
  // goes on the list root; `--MenuItem-*` on each item (regular reads plain,
  // dense reads `dense-*` — unused set is inert). Empty/invalid → emit none, so
  // the preset's own value shows through (e.g. blank min-height keeps the preset px).
  const active = (key: string) => parseMapping(mapping[key] ?? '').state === 'ok';
  const listSx =
    mappingEnabled && active('listBlockPad')
      ? { [private_listVars.blockPad]: resolveValue(mapping.listBlockPad) }
      : undefined;
  const itemSx = mappingEnabled
    ? Object.fromEntries(
        MENU_FIELDS.filter((f) => f.key !== 'listBlockPad' && active(f.key)).map((f) => [
          f.cssVar,
          resolveValue(mapping[f.key]),
        ]),
      )
    : undefined;
  return (
    <Stack direction="row" spacing={4} sx={{ mt: 1, alignItems: 'flex-start' }}>
      <MenuList sx={{ ...listSx, width: 240, border: '1px solid', borderColor: 'divider' }}>
        <MenuDemoItems itemSx={itemSx} />
      </MenuList>
      <div>
        <Button variant="outlined" onClick={(event) => setAnchorEl(event.currentTarget)}>
          Open menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          slotProps={{ list: { sx: listSx } }}
        >
          <MenuDemoItems itemSx={itemSx} />
        </Menu>
      </div>
    </Stack>
  );
}

// Tooltip density tokens (regular/pointer only — `touch` is out of scope).
// Padding + anchor offset are spacing (prefill density keys); arrow size ships
// as raw px per preset (read live off the theme), like MenuItem min-height.
const TOOLTIP_FIELDS: DensityField[] = [
  { key: 'blockPad', cssVar: private_tooltipVars.blockPad },
  { key: 'inlinePad', cssVar: private_tooltipVars.inlinePad },
  { key: 'offset', cssVar: private_tooltipVars.offset },
  { key: 'arrowSize', cssVar: private_tooltipVars.arrowSize },
];

function TooltipMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  const active = (key: string) => parseMapping(mapping[key] ?? '').state === 'ok';
  // Element-level tokens win over the preset. All four land on the bubble
  // (`tooltip` slot); the arrow inherits `--comp-arrowSize` from it.
  const tooltipSx = mappingEnabled
    ? Object.fromEntries(
        TOOLTIP_FIELDS.filter((f) => active(f.key)).map((f) => [f.cssVar, resolveValue(mapping[f.key])]),
      )
    : undefined;
  // Force open + inline (no portal) so the bubble sits inside the debug scope
  // and picks up the padding-ring / text-box overlays.
  const slotProps = {
    popper: { disablePortal: true },
    tooltip: { sx: tooltipSx },
  } as const;
  return (
    <Stack direction="row" spacing={14} sx={{ mt: 1, mb: 8, minHeight: 140, alignItems: 'flex-start' }}>
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

// OutlinedInput family: input block/inline padding (per size) + adornment gap
// (per size). All spacing → prefill density keys. The label resting-Y is a
// derived bridge (not a direct field).
const OUTLINED_INPUT_FIELDS: DensityField[] = [
  { key: 'mediumBlockPad', cssVar: private_outlinedInputVars.mediumBlockPad },
  { key: 'smallBlockPad', cssVar: private_outlinedInputVars.smallBlockPad },
  { key: 'mediumInlinePad', cssVar: private_outlinedInputVars.mediumInlinePad },
  { key: 'smallInlinePad', cssVar: private_outlinedInputVars.smallInlinePad },
  { key: 'mediumGap', cssVar: private_inputAdornmentVars.mediumGap },
  { key: 'smallGap', cssVar: private_inputAdornmentVars.smallGap },
];

function OutlinedInputMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  const active = (key: string) => parseMapping(mapping[key] ?? '').state === 'ok';
  // Tokens go on the TextField (ancestor of label + input + adornment) so the
  // `:has(~ &)` label bridge sees them — element-level on the input root can't
  // reach the sibling label.
  const sx = mappingEnabled
    ? Object.fromEntries(
        OUTLINED_INPUT_FIELDS.filter((f) => active(f.key)).map((f) => [
          f.cssVar,
          resolveValue(mapping[f.key]),
        ]),
      )
    : undefined;
  return (
    <Stack spacing={3} sx={{ mt: 1, width: 280, alignItems: 'flex-start' }}>
      <TextField label={<span className="density-debug-text">Medium</span>} variant="outlined" sx={sx} />
      <TextField
        label={<span className="density-debug-text">Small</span>}
        variant="outlined"
        size="small"
        sx={sx}
      />
      <TextField
        label={<span className="density-debug-text">Start adornment</span>}
        variant="outlined"
        sx={sx}
        slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
      />
      <TextField
        label={<span className="density-debug-text">End adornment</span>}
        variant="outlined"
        sx={sx}
        slotProps={{ input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> } }}
      />
    </Stack>
  );
}

// FilledInput family: box top/bottom/inline padding (per size). All spacing →
// prefill density keys. The label rest/shrink Y follow the active preset (tuned
// raw px, not editable here).
const FILLED_INPUT_FIELDS: DensityField[] = [
  { key: 'mediumTopPad', cssVar: private_filledInputVars.mediumTopPad },
  { key: 'smallTopPad', cssVar: private_filledInputVars.smallTopPad },
  { key: 'mediumBottomPad', cssVar: private_filledInputVars.mediumBottomPad },
  { key: 'smallBottomPad', cssVar: private_filledInputVars.smallBottomPad },
  { key: 'mediumInlinePad', cssVar: private_filledInputVars.mediumInlinePad },
  { key: 'smallInlinePad', cssVar: private_filledInputVars.smallInlinePad },
];

function FilledInputMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  const active = (key: string) => parseMapping(mapping[key] ?? '').state === 'ok';
  const sx = mappingEnabled
    ? Object.fromEntries(
        FILLED_INPUT_FIELDS.filter((f) => active(f.key)).map((f) => [
          f.cssVar,
          resolveValue(mapping[f.key]),
        ]),
      )
    : undefined;
  return (
    <Stack spacing={3} sx={{ mt: 1, width: 280, alignItems: 'flex-start' }}>
      <TextField label={<span className="density-debug-text">Medium</span>} variant="filled" sx={sx} />
      <TextField
        label={<span className="density-debug-text">Small</span>}
        variant="filled"
        size="small"
        sx={sx}
      />
      <TextField
        label={<span className="density-debug-text">Filled value</span>}
        variant="filled"
        defaultValue="Value"
        sx={sx}
      />
    </Stack>
  );
}

// Input (standard) family: input top/bottom padding (top per size, bottom
// shared). Inline is 0; the label floats above (no bridge).
const INPUT_FIELDS: DensityField[] = [
  { key: 'mediumTopPad', cssVar: private_inputVars.mediumTopPad },
  { key: 'smallTopPad', cssVar: private_inputVars.smallTopPad },
  { key: 'bottomPad', cssVar: private_inputVars.bottomPad },
];

function InputMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  const active = (key: string) => parseMapping(mapping[key] ?? '').state === 'ok';
  const sx = mappingEnabled
    ? Object.fromEntries(
        INPUT_FIELDS.filter((f) => active(f.key)).map((f) => [f.cssVar, resolveValue(mapping[f.key])]),
      )
    : undefined;
  return (
    <Stack spacing={3} sx={{ mt: 1, width: 260, alignItems: 'flex-start' }}>
      <TextField label={<span className="density-debug-text">Medium</span>} variant="standard" sx={sx} />
      <TextField
        label={<span className="density-debug-text">Small</span>}
        variant="standard"
        size="small"
        sx={sx}
      />
    </Stack>
  );
}

// Tabs family: Tab default + icon+label states (block pad + min-height each) +
// shared inline pad + icon gaps (stack/inline), plus the paired Tabs-root
// min-height. Spacing → density keys; min-heights → raw px (read off the theme).
const TAB_FIELDS: DensityField[] = [
  { key: 'minHeight', cssVar: private_tabVars.minHeight },
  { key: 'tabsMinHeight', cssVar: private_tabsVars.minHeight },
  { key: 'iconLabelMinHeight', cssVar: private_tabVars.iconLabelMinHeight },
  { key: 'blockPad', cssVar: private_tabVars.blockPad },
  { key: 'iconLabelBlockPad', cssVar: private_tabVars.iconLabelBlockPad },
  { key: 'inlinePad', cssVar: private_tabVars.inlinePad },
  { key: 'iconStackGap', cssVar: private_tabVars.iconStackGap },
  { key: 'iconInlineGap', cssVar: private_tabVars.iconInlineGap },
];

function TabsMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  const active = (key: string) => parseMapping(mapping[key] ?? '').state === 'ok';
  // Tokens on each Tabs instance (ancestor of its Tab children, which inherit).
  const sx = mappingEnabled
    ? Object.fromEntries(
        TAB_FIELDS.filter((f) => active(f.key)).map((f) => [f.cssVar, resolveValue(mapping[f.key])]),
      )
    : undefined;
  const lbl = (t: string) => <span className="density-debug-text">{t}</span>;
  return (
    <Stack spacing={3} sx={{ mt: 1, width: 460 }}>
      <Tabs value={0} sx={sx}>
        <Tab label={lbl('One')} />
        <Tab label={lbl('Two')} />
        <Tab label={lbl('Three')} />
      </Tabs>
      <Tabs value={0} sx={sx}>
        <Tab icon={<InboxIcon />} label={lbl('Top')} iconPosition="top" />
        <Tab icon={<InboxIcon />} label={lbl('Top')} iconPosition="top" />
      </Tabs>
      <Tabs value={0} sx={sx}>
        <Tab icon={<InboxIcon />} label={lbl('Start')} iconPosition="start" />
        <Tab icon={<InboxIcon />} label={lbl('Start')} iconPosition="start" />
      </Tabs>
    </Stack>
  );
}

// Checkbox family: the touch-target padding around the icon, per size (via
// SwitchBase). All spacing → density keys.
const CHECKBOX_FIELDS: DensityField[] = [
  { key: 'mediumPad', cssVar: private_checkboxVars.mediumPad },
  { key: 'smallPad', cssVar: private_checkboxVars.smallPad },
];

function CheckboxMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  const active = (key: string) => parseMapping(mapping[key] ?? '').state === 'ok';
  const sx = mappingEnabled
    ? Object.fromEntries(
        CHECKBOX_FIELDS.filter((f) => active(f.key)).map((f) => [
          f.cssVar,
          resolveValue(mapping[f.key]),
        ]),
      )
    : undefined;
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 1, alignItems: 'center' }}>
      <Checkbox defaultChecked sx={sx} />
      <Checkbox defaultChecked size="small" sx={sx} />
    </Stack>
  );
}

// CardContent family: base padding + last-child bottom padding (no size axis).
const CARD_CONTENT_FIELDS: DensityField[] = [
  { key: 'pad', cssVar: private_cardContentVars.pad },
  { key: 'padBottom', cssVar: private_cardContentVars.padBottom },
];

function CardContentMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  const active = (key: string) => parseMapping(mapping[key] ?? '').state === 'ok';
  const sx = mappingEnabled
    ? Object.fromEntries(
        CARD_CONTENT_FIELDS.filter((f) => active(f.key)).map((f) => [
          f.cssVar,
          resolveValue(mapping[f.key]),
        ]),
      )
    : undefined;
  return (
    <Card variant="outlined" sx={{ mt: 1, width: 260 }}>
      <CardContent sx={sx}>
        <Typography variant="h6">
          <span className="density-debug-text">Card title</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span className="density-debug-text">Body content with last-child bottom padding.</span>
        </Typography>
      </CardContent>
    </Card>
  );
}

// Select family: the content-box min-height floor (raw px). The visible density
// mostly comes from the underlying OutlinedInput padding (tokenized separately).
const SELECT_FIELDS: DensityField[] = [{ key: 'minHeight', cssVar: private_selectVars.minHeight }];

function SelectMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  const active = (key: string) => parseMapping(mapping[key] ?? '').state === 'ok';
  const sx = mappingEnabled
    ? Object.fromEntries(
        SELECT_FIELDS.filter((f) => active(f.key)).map((f) => [f.cssVar, resolveValue(mapping[f.key])]),
      )
    : undefined;
  return (
    <FormControl sx={{ mt: 1, width: 220, ...sx }}>
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
  { key: 'blockPad', cssVar: private_alertVars.blockPad },
  { key: 'inlinePad', cssVar: private_alertVars.inlinePad },
  { key: 'iconGap', cssVar: private_alertVars.iconGap },
];

function AlertMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  const active = (key: string) => parseMapping(mapping[key] ?? '').state === 'ok';
  const sx = mappingEnabled
    ? Object.fromEntries(
        ALERT_FIELDS.filter((f) => active(f.key)).map((f) => [f.cssVar, resolveValue(mapping[f.key])]),
      )
    : undefined;
  return (
    <Stack spacing={2} sx={{ mt: 1, width: 380 }}>
      <Alert severity="info" sx={sx}>
        <span className="density-debug-text">Info alert — icon gap + root padding.</span>
      </Alert>
      <Alert severity="success" onClose={() => {}} sx={sx}>
        <span className="density-debug-text">Success alert with a close action.</span>
      </Alert>
    </Stack>
  );
}

// Chip family: height (per size — drives avatar/icon/deleteIcon via calc) +
// label inline padding (per size). Height = raw px; padInline = density keys.
const CHIP_FIELDS: DensityField[] = [
  { key: 'mediumHeight', cssVar: private_chipVars.mediumHeight },
  { key: 'smallHeight', cssVar: private_chipVars.smallHeight },
  { key: 'mediumPadInline', cssVar: private_chipVars.mediumPadInline },
  { key: 'smallPadInline', cssVar: private_chipVars.smallPadInline },
];

function ChipMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  const active = (key: string) => parseMapping(mapping[key] ?? '').state === 'ok';
  // Chip tokens on a wrapping Box (ancestor); each Chip inherits them.
  const sx = mappingEnabled
    ? Object.fromEntries(
        CHIP_FIELDS.filter((f) => active(f.key)).map((f) => [f.cssVar, resolveValue(mapping[f.key])]),
      )
    : undefined;
  return (
    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1, width: 400, ...sx }}>
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
  { key: 'minHeight', cssVar: private_accordionSummaryVars.minHeight },
  { key: 'expandedMinHeight', cssVar: private_accordionSummaryVars.expandedMinHeight },
  { key: 'inlinePad', cssVar: private_accordionSummaryVars.inlinePad },
  { key: 'marginBlock', cssVar: private_accordionSummaryVars.marginBlock },
  { key: 'expandedMarginBlock', cssVar: private_accordionSummaryVars.expandedMarginBlock },
  { key: 'detailsTopPad', cssVar: private_accordionDetailsVars.topPad },
  { key: 'detailsInlinePad', cssVar: private_accordionDetailsVars.inlinePad },
  { key: 'detailsBottomPad', cssVar: private_accordionDetailsVars.bottomPad },
];

function AccordionMatrix({
  mapping,
  mappingEnabled,
}: {
  mapping: Record<string, string>;
  mappingEnabled: boolean;
}) {
  const active = (key: string) => parseMapping(mapping[key] ?? '').state === 'ok';
  // Tokens on the Accordion (ancestor of Summary + Details, which inherit).
  const sx = mappingEnabled
    ? Object.fromEntries(
        ACCORDION_FIELDS.filter((f) => active(f.key)).map((f) => [
          f.cssVar,
          resolveValue(mapping[f.key]),
        ]),
      )
    : undefined;
  return (
    <Box sx={{ mt: 1, width: 360 }}>
      <Accordion defaultExpanded sx={sx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="density-debug-text">Expanded summary</span>
        </AccordionSummary>
        <AccordionDetails>
          <span className="density-debug-text">Details content padding.</span>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={sx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="density-debug-text">Collapsed summary</span>
        </AccordionSummary>
        <AccordionDetails>Hidden.</AccordionDetails>
      </Accordion>
    </Box>
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
    renderMatrix: (args) => <MenuMatrix {...args} />,
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
    renderMatrix: (args) => <TooltipMatrix {...args} />,
  },
  OutlinedInput: {
    canvasLabel: 'OutlinedInput — size axis + adornments (label bridge)',
    fields: OUTLINED_INPUT_FIELDS,
    // All spacing → density keys (match the preset assignment).
    prefill: {
      mediumBlockPad: 'md',
      smallBlockPad: 'sm',
      mediumInlinePad: 'lg',
      smallInlinePad: 'md',
      mediumGap: 'sm',
      smallGap: 'xxs',
    },
    renderMatrix: (args) => <OutlinedInputMatrix {...args} />,
  },
  FilledInput: {
    canvasLabel: 'FilledInput — size axis (box padding); label follows preset',
    fields: FILLED_INPUT_FIELDS,
    prefill: {
      mediumTopPad: 'xl',
      smallTopPad: 'lg',
      mediumBottomPad: 'sm',
      smallBottomPad: 'xxs',
      mediumInlinePad: 'md',
      smallInlinePad: 'md',
    },
    renderMatrix: (args) => <FilledInputMatrix {...args} />,
  },
  Input: {
    canvasLabel: 'Input (standard) — size axis (input top/bottom padding)',
    fields: INPUT_FIELDS,
    prefill: {
      mediumTopPad: 'xs',
      smallTopPad: 'xxs',
      bottomPad: 'xs',
    },
    renderMatrix: (args) => <InputMatrix {...args} />,
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
    renderMatrix: (args) => <TabsMatrix {...args} />,
  },
  Checkbox: {
    canvasLabel: 'Checkbox — touch-target padding (medium + small)',
    fields: CHECKBOX_FIELDS,
    prefill: { mediumPad: 'sm', smallPad: 'xs' },
    renderMatrix: (args) => <CheckboxMatrix {...args} />,
  },
  CardContent: {
    canvasLabel: 'CardContent — padding + last-child bottom padding',
    fields: CARD_CONTENT_FIELDS,
    prefill: { pad: 'lg', padBottom: 'xl' },
    renderMatrix: (args) => <CardContentMatrix {...args} />,
  },
  Select: {
    canvasLabel: 'Select — content-box floor (padding via its OutlinedInput)',
    fields: SELECT_FIELDS,
    prefill: {}, // minHeight = raw px, read off the theme
    renderMatrix: (args) => <SelectMatrix {...args} />,
  },
  Alert: {
    canvasLabel: 'Alert — root padding + icon gap',
    fields: ALERT_FIELDS,
    prefill: { blockPad: 'xs', inlinePad: 'lg', iconGap: 'md' },
    renderMatrix: (args) => <AlertMatrix {...args} />,
  },
  Chip: {
    canvasLabel: 'Chip — height (drives avatar/icon) + label inline padding',
    fields: CHIP_FIELDS,
    prefill: { mediumPadInline: 'md', smallPadInline: 'sm' }, // heights = raw px, read off theme
    renderMatrix: (args) => <ChipMatrix {...args} />,
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
    renderMatrix: (args) => <AccordionMatrix {...args} />,
  },
} satisfies Record<string, DensityComponentDef>;

type ComponentName = keyof typeof COMPONENT_DEFS;
type Selection = 'All' | ComponentName;

const COMPONENTS = Object.keys(COMPONENT_DEFS) as ComponentName[];

// Read the value a preset assigned to a token, straight off the enhanced theme's
// component overrides (the same `addRootOverride` output). Single source of truth
// for raw-px sizing defaults — can't drift from what `enhance*Density` ships.
function themeTokenValue(theme: unknown, cssVar: string): string | undefined {
  const components = (theme as { components?: Record<string, any> })?.components ?? {};
  for (const name of Object.keys(components)) {
    // Scan every slot's overrides, not just `root` — Tooltip's tokens land on
    // the `tooltip` slot (it has no root slot).
    const styleOverrides = components[name]?.styleOverrides ?? {};
    for (const slot of Object.keys(styleOverrides)) {
      const layers = Array.isArray(styleOverrides[slot]) ? styleOverrides[slot] : [styleOverrides[slot]];
      for (let i = layers.length - 1; i >= 0; i -= 1) {
        const layer = layers[i];
        if (layer && typeof layer === 'object' && cssVar in layer) {
          return layer[cssVar] as string;
        }
      }
    }
  }
  return undefined;
}

// Canonical mapping for the active preset: spacing tokens prefill with their
// density key (preset-independent), sizing tokens with the preset's raw px read
// live off the theme. Empty when the preset didn't set a token (e.g. `unset`).
const buildMapping = (theme: unknown) =>
  Object.fromEntries(
    COMPONENTS.map((c) => [
      c,
      Object.fromEntries(
        COMPONENT_DEFS[c].fields.map((field) => [
          field.key,
          (COMPONENT_DEFS[c].prefill as Record<string, string>)[field.key] ??
            themeTokenValue(theme, field.cssVar) ??
            '',
        ]),
      ),
    ]),
  ) as Record<ComponentName, Record<string, string>>;

export default function DensityExperiment() {
  const [preset, setPreset] = React.useState<Preset>('unset');
  const [selection, setSelection] = React.useState<Selection>('All');
  const [debug, setDebug] = React.useState<string[]>([]);

  const mappingEnabled = preset !== 'unset';
  const visibleComponents: ComponentName[] = selection === 'All' ? COMPONENTS : [selection];

  const canvasTheme = React.useMemo(() => {
    const base = createTheme({ cssVariables: true });
    return preset === 'unset' ? base : PRESET_FN[preset](base);
  }, [preset]);

  const [mapping, setMapping] = React.useState<Record<ComponentName, Record<string, string>>>(() =>
    buildMapping(canvasTheme),
  );

  // Re-sync the mapping to the active preset's canonical values (incl. its raw-px
  // sizing) whenever the preset changes, so fields default to what enhanceDensity
  // ships rather than going stale/empty.
  React.useEffect(() => {
    setMapping(buildMapping(canvasTheme));
  }, [canvasTheme]);

  // Active scale in px straight off the enhanced theme — single source of truth
  // for the legend + preview, so it can't drift from what the preset applied.
  const scalePx =
    preset === 'unset'
      ? null
      : (canvasTheme as unknown as { density: Record<string, string> }).density;

  const setField = (comp: ComponentName, key: string, value: string) =>
    setMapping((m) => ({ ...m, [comp]: { ...m[comp], [key]: value } }));

  const resetMapping = () => setMapping(buildMapping(canvasTheme));

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
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
              {COMPONENTS.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            component="section"
            sx={{ flex: 1, minHeight: 0, overflowY: 'auto', px: 3, pb: 3, opacity: mappingEnabled ? 1 : 0.5 }}
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
            {visibleComponents.map((comp) => (
              <Box key={comp} sx={{ mt: 2 }} data-mapping-group={comp}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                  {comp}
                </Typography>
                <Stack spacing={1.5} sx={{ mt: 1 }}>
                  {COMPONENT_DEFS[comp].fields.map((field) => {
                    const value = mapping[comp][field.key] ?? '';
                    const parsed = parseMapping(value);
                    const showError = mappingEnabled && parsed.state === 'error';
                    let helper = ' ';
                    if (showError) {
                      helper = parsed.error ?? ' ';
                    } else if (mappingEnabled && parsed.state === 'ok') {
                      helper = previewText(value, scalePx); // key → px · raw → as typed
                    }
                    return (
                      <TextField
                        key={field.key}
                        size="small"
                        label={field.cssVar}
                        value={value}
                        placeholder="density key or CSS value"
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

        {/* CANVAS — density-enhanced theme; scrolls independently. */}
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
