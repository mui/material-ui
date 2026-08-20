import { densityEmitTable, type DensityEmitRow } from './emitTable.generated';
import { densityKnobs } from './densityKnobs';

/**
 * Override-only knobs: NOT emitted by any enhance*Density preset, so they have no
 * reflow default. Each produces a `styleOverride` only when the user fills the
 * input; `values` is left empty → blank placeholder. Kept OUT of the generated
 * table so `pnpm density:codegen` never rewrites or drops them.
 */

/**
 * Extra rows self-declare hide meta at their definition site — same semantics as
 * `hidden`/`hiddenIn` on `densityKnobs.ts` meta (generated rows). The derived
 * `hiddenFieldIds`/`hiddenFieldIdsByFamily` below read both sources.
 */
export type DensityExtraRow = DensityEmitRow & {
  /** never applies independently — dropped from densityGroups before the collect path. */
  hidden?: true;
  /** hidden only in these canvas families. */
  hiddenIn?: string[];
};

// const edgeCorner = (nested: string, cssProp: string): DensityEmitRow => ({
//   id: `MuiAccordion|root|base|${nested}|${cssProp}`,
//   label: `Accordion · ${cssProp}`,
//   isDensity: false,
//   densityKey: null,
//   target: { component: 'MuiAccordion', slot: 'root', props: null, nested, cssProp },
//   values: {},
// });

// Un-varianted override-only row on a given slot (blank until the user fills it).
const slotRow = (
  component: string,
  slot: string,
  cssProp: string,
  label: string,
): DensityEmitRow => ({
  id: `${component}|${slot}|base||${cssProp}`,
  label,
  isDensity: false,
  densityKey: null,
  target: { component, slot, props: null, nested: '', cssProp },
  values: {},
});

export const densityExtraRows: DensityExtraRow[] = [
  slotRow('MuiAlert', 'icon', 'fontSize', 'Alert · icon · fontSize'),
  slotRow('MuiAlert', 'message', 'paddingBlock', 'Alert · message · paddingBlock'),
  slotRow('MuiAlert', 'message', 'fontSize', 'Alert · message · fontSize'),
  slotRow('MuiAlert', 'action', 'paddingTop', 'Alert · action · paddingTop'),
  slotRow('MuiAlert', 'action', 'paddingLeft', 'Alert · action · paddingLeft'),
  slotRow('MuiAlert', 'action', 'marginRight', 'Alert · action · marginRight'),
  // Stepper flow gap — no master default (connectors span the space); one virtual
  // knob writes both containers (Stepper root + each Step root). columnGap, not
  // gap: it only spaces the horizontal (row-flex) layout — vertical steppers
  // stack on the row axis and stay untouched.
  slotRow('MuiStepper', 'root', 'columnGap', 'Stepper · columnGap'),
  slotRow('MuiStep', 'root', 'columnGap', 'Step · columnGap'),
  // alternativeLabel connector right edge — master: calc(50% + 20px); the Stepper
  // gap knob re-writes it (+ gap) via a linked write so the line clears the flow gap.
  {
    id: 'MuiStepConnector|root|alternativeLabel=true,orientation=horizontal||right',
    label: 'StepConnector · right [alternativeLabel, horizontal]',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiStepConnector',
      slot: 'root',
      props: { orientation: 'horizontal', alternativeLabel: true },
      nested: '',
      cssProp: 'right',
    },
    values: {},
  },
  // Control↔label gap (root is inline-flex). Shown in Checkbox/Radio/Switch families.
  slotRow('MuiFormControlLabel', 'root', 'gap', 'FormControlLabel · gap'),
  // ListItemText text-block margin (master 4px base / 6px primary+secondary) —
  // override-only until a value is set.
  slotRow('MuiListItemText', 'root', 'marginBlock', 'ListItemText · marginBlock'),
  {
    id: 'MuiAccordion|root|base|&.Mui-expanded|margin',
    label: 'Accordion · expanded margin',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiAccordion',
      slot: 'root',
      props: null,
      nested: '&.Mui-expanded',
      cssProp: 'margin',
    },
    values: {},
  },
  // Select — placeholder field to keep the component visible in the selector
  {
    id: 'MuiSelect|select|base||paddingBlock',
    label: 'Select · select · paddingBlock',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiSelect',
      slot: 'select',
      props: null,
      nested: '',
      cssProp: 'paddingBlock',
    },
    values: {},
  },
  // Divider — override-only: every spacing literal is already theme.spacing-backed
  // (middle margins spacing(2)/(1), wrapper padding spacing(1)*1.2 — they reflow
  // via the per-preset spacing base / Spacing tab), inset 72px is a List-alignment
  // literal. No preset emissions; these knobs exist for experimentation.
  {
    id: 'MuiDivider|root|variant=inset||marginLeft',
    label: 'Divider · marginLeft [variant=inset]',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiDivider',
      slot: 'root',
      props: { variant: 'inset' },
      nested: '',
      cssProp: 'marginLeft',
    },
    values: {},
  },
  {
    id: 'MuiDivider|root|orientation=horizontal,variant=middle||marginInline',
    label: 'Divider · marginInline [middle, horizontal]',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiDivider',
      slot: 'root',
      props: { variant: 'middle', orientation: 'horizontal' },
      nested: '',
      cssProp: 'marginInline',
    },
    values: {},
  },
  {
    id: 'MuiDivider|root|orientation=vertical,variant=middle||marginBlock',
    label: 'Divider · marginBlock [middle, vertical]',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiDivider',
      slot: 'root',
      props: { variant: 'middle', orientation: 'vertical' },
      nested: '',
      cssProp: 'marginBlock',
    },
    values: {},
  },
  {
    id: 'MuiDivider|wrapper|base||paddingInline',
    label: 'Divider · wrapper · paddingInline',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiDivider',
      slot: 'wrapper',
      props: null,
      nested: '',
      cssProp: 'paddingInline',
    },
    values: {},
  },
  // Edge radius — 4 corner members hidden behind the virtual knob below.
  // edgeCorner('&:first-of-type', 'borderTopLeftRadius'),
  // edgeCorner('&:first-of-type', 'borderTopRightRadius'),
  // edgeCorner('&:last-of-type', 'borderBottomLeftRadius'),
  // edgeCorner('&:last-of-type', 'borderBottomRightRadius'),
];

// Generated rows + hand-authored override-only rows share one registry.
const allRows: DensityEmitRow[] = [...densityEmitTable, ...densityExtraRows];

/**
 * Maps each emitted `Mui*` component to the playground canvas-demo family that
 * surfaces its knobs. Family keys are COMPONENT_DEFS keys (each has one demo), so
 * bundled demos gather several components — Menu = List + MenuItem, Dialog =
 * Title/Content/Actions, etc. This is the only editorial piece; the fields
 * themselves come from the generated table. A component may belong to several
 * families (array) — e.g. FormControlLabel surfaces in both Checkbox and Radio.
 */
export const componentFamily: Record<string, string | string[]> = {
  MuiButton: ['Button', 'ButtonGroup'],
  MuiIconButton: 'Button',
  MuiList: ['Menu', 'List'],
  MuiListItemIcon: ['Menu', 'List'],
  MuiListItemText: 'List',
  MuiMenuItem: 'Menu',
  MuiAccordion: 'Accordion',
  MuiTab: 'Tabs',
  MuiTabs: 'Tabs',
  MuiTabScrollButton: 'Tabs',
  MuiAutocomplete: 'Autocomplete',
  MuiTooltip: 'Tooltip',
  MuiOutlinedInput: 'TextField',
  MuiInputLabel: 'TextField',
  MuiInputAdornment: 'TextField',
  MuiFilledInput: 'TextField',
  MuiInputBase: ['TextField', 'Select'],
  MuiFormLabel: 'TextField',
  MuiFormHelperText: 'TextField',
  MuiInput: 'TextField',
  MuiCheckbox: 'Checkbox',
  MuiRadio: 'Radio',
  MuiFormControlLabel: ['Checkbox', 'Radio', 'Switch'],
  MuiAvatar: 'Avatar',
  MuiLinearProgress: 'Progress',
  MuiCircularProgress: 'Progress',
  MuiSlider: 'Slider',
  MuiDivider: 'Divider',
  MuiFab: 'Fab',
  MuiPaginationItem: 'Pagination',
  MuiSnackbarContent: 'SnackbarContent',
  MuiBottomNavigation: 'BottomNavigation',
  MuiBottomNavigationAction: 'BottomNavigation',
  MuiDialog: 'Dialog',
  MuiDialogTitle: 'Dialog',
  MuiDialogContent: 'Dialog',
  MuiDialogActions: 'Dialog',
  MuiListItem: 'List',
  MuiListItemButton: 'List',
  MuiListItemAvatar: 'List',
  MuiButtonGroup: 'ButtonGroup',
  MuiTableCell: 'Table',
  MuiTableSortLabel: 'Table',
  MuiTablePagination: 'Pagination',
  MuiDataGrid: 'DataGrid',
  MuiStep: 'Stepper',
  MuiStepper: 'Stepper',
  MuiStepConnector: 'Stepper',
  MuiStepContent: 'Stepper',
  MuiStepLabel: 'Stepper',
  MuiStepIcon: 'Stepper',
  MuiToolbar: 'Toolbar',
  MuiBadge: 'Badge',
  MuiToggleButton: 'ToggleButton',
  MuiBreadcrumbs: 'Breadcrumbs',
  MuiCardActions: 'Card',
  MuiCardContent: 'Card',
  MuiCardHeader: 'Card',
  MuiSelect: 'Select',
  MuiSvgIcon: ['SvgIcon', 'ToggleButton'],
  MuiSwitch: 'Switch',
  MuiAlert: 'Alert',
  MuiChip: 'Chip',
  MuiAccordionDetails: 'Accordion',
  MuiAccordionSummary: 'Accordion',
  MuiRichTreeView: 'TreeView',
  MuiSimpleTreeView: 'TreeView',
  MuiTreeItem: 'TreeView',
  MuiDateCalendar: 'DatePicker',
  MuiDayCalendar: 'DatePicker',
  MuiDayCalendarSkeleton: 'DatePicker',
  MuiPickerDay: 'DatePicker',
  MuiDateRangePickerDay: 'DatePicker',
  MuiPickersInputBase: 'DatePicker',
  MuiPickersOutlinedInput: 'DatePicker',
  MuiPickersFilledInput: 'DatePicker',
  MuiPickersCalendarHeader: 'DatePicker',
  MuiYearCalendar: 'DatePicker',
  MuiMonthCalendar: 'DatePicker',
  MuiDigitalClock: 'DatePicker',
  MuiMultiSectionDigitalClockSection: 'DatePicker',
  MuiPickersToolbar: 'DatePicker',
  MuiDateRangeCalendar: 'DatePicker',
};

/**
 * Per-family component order + scope in the sidebar. Keys are family
 * (COMPONENT_DEFS) keys; values are component short-names (no `Mui` prefix) in
 * display order. When a family has an entry, ONLY those components show, in that
 * order (listed names with no knobs are dropped). Families without an entry fall
 * back to base-first (name === family key) then alphabetical.
 */
export const familyComponentOrder: Record<string, string[]> = {
  Button: ['Button', 'IconButton'],
  Card: ['Card', 'CardHeader', 'CardContent', 'CardActions'],
  Checkbox: ['Checkbox', 'FormControlLabel'],
  Radio: ['Radio', 'FormControlLabel'],
  Switch: ['Switch', 'FormControlLabel'],
  ButtonGroup: ['ButtonGroup', 'Button'],
  ToggleButton: ['ToggleButton', 'SvgIcon'],
  Stepper: ['Stepper', 'Step', 'StepLabel', 'StepIcon', 'StepConnector', 'StepContent'],
  List: ['List', 'ListItemButton', 'ListItem', 'ListItemIcon', 'ListItemAvatar', 'ListItemText'],
  Table: ['TableCell', 'TableSortLabel'],
  Pagination: ['PaginationItem', 'TablePagination'],
  Select: ['InputBase', 'Select'],
  TextField: [
    'FormHelperText',
    'InputBase',
    'InputAdornment',
    'OutlinedInput',
    'FilledInput',
    'Input',
  ],
};

/** Ordered (and, when configured, scoped) component list for a family's sidebar group. */
export function orderFamilyComponents(family: string, components: string[]): string[] {
  const order = familyComponentOrder[family];
  if (order) {
    return order.filter((c) => components.includes(c));
  }
  return [...components].sort((a, b) => {
    if (a === family) {
      return -1;
    }
    if (b === family) {
      return 1;
    }
    return a.localeCompare(b);
  });
}

/**
 * Per-component sidebar slot order. Keys are component short-names (no `Mui`
 * prefix); values are slot names in display order. Listed slots lead in that
 * order; unlisted slots follow the base convention (`root` first, then
 * alphabetical). Unlike `familyComponentOrder`, this never scopes — unlisted
 * slots still show.
 */
export const componentSlotOrder: Record<string, string[]> = {
  DataGrid: ['defaultProps', 'columnHeader', 'columnHeaderTitleContainer', 'cell'],
  TreeItem: ['root', 'content'],
  DayCalendar: ['root', 'weekDayLabel', 'weekNumber', 'weekNumberLabel', 'slideTransition'],
};

/**
 * Per-id denylist: rows kept in the (mechanical) emit table but not surfaced as
 * sidebar knobs — the row never applies independently (dropped from
 * `densityGroups` before the collect path). DERIVED: mark the row
 * `hidden: true` in `densityKnobs.ts` (generated rows) or on the row itself in
 * `densityExtraRows` above (extra rows); never edit this set directly.
 */
export const hiddenFieldIds = new Set<string>([
  ...Object.entries(densityKnobs)
    .filter(([, v]) => typeof v === 'object' && v.hidden)
    .map(([id]) => id),
  ...densityExtraRows.filter((r) => r.hidden).map((r) => r.id),
]);

/**
 * Per-family denylist: same semantics as `hiddenFieldIds`, but scoped to one
 * family — for fields on a shared component (mapped to several families via
 * `componentFamily`) that should surface in some families and not others. Checked
 * during the per-family fan-out in `densityGroups`, after the global denylist.
 * DERIVED from `hiddenIn` on `densityKnobs` meta / extra rows.
 */
export const hiddenFieldIdsByFamily: Record<string, Set<string>> = (() => {
  const out: Record<string, Set<string>> = {};
  const add = (id: string, families: string[] | undefined) => {
    for (const family of families ?? []) {
      (out[family] ??= new Set()).add(id);
    }
  };
  for (const [id, v] of Object.entries(densityKnobs)) {
    if (typeof v === 'object') {
      add(id, v.hiddenIn);
    }
  }
  for (const row of densityExtraRows) {
    add(row.id, row.hiddenIn);
  }
  return out;
})();

export interface DensityGroup {
  /** matches a COMPONENT_DEFS key in the playground (canvas demo) */
  key: string;
  /** generated-table row ids in table order */
  fields: string[];
}

/**
 * Selector/display order — follows weave-families.yml (Weave usage rank). Keys
 * not listed there (playground-only demo families) fall to the end, alphabetical.
 * Exception: minor families (Progress — single knob) are pinned to the bottom,
 * after the usage-ranked block.
 */
// weave-families.yml usage rank for the core families; three deliberate breaks:
// the families Weave doesn't use (Toolbar…BottomNavigation) follow the ranked core,
// Progress stays pinned after them (minor single-knob), and the MUI X families sit
// at the very bottom as their own group (matching the yml's `MUI X` group).
const WEAVE_FAMILY_ORDER = [
  'Typography',
  'Button',
  'Menu',
  'Tooltip',
  'TextField',
  'Tabs',
  'Divider',
  'Select',
  'Skeleton',
  'Link',
  'Paper',
  'Accordion',
  'Checkbox',
  'Alert',
  'Icons',
  'SvgIcon',
  'Modal',
  'Utils',
  'Chip',
  'Card',
  'Avatar',
  'Radio',
  'Switch',
  'ToggleButton',
  'Badge',
  'Autocomplete',
  'Breadcrumbs',
  'Stepper',
  'ButtonGroup',
  'Transitions',
  'Slider',
  'Table',
  'Popover',
  // Not Weave-ranked (absent from weave-families.yml) — surfaced order.
  'Toolbar',
  'Dialog',
  'Fab',
  'Pagination',
  'List',
  'SnackbarContent',
  'BottomNavigation',
  // Pinned after the core (out of usage-rank position) — minor single-knob families.
  'Progress',
  // MUI X families — bottom group.
  'DataGrid',
  'DatePicker',
  'TreeView',
];
const familyRank = (key: string) => {
  const i = WEAVE_FAMILY_ORDER.indexOf(key);
  return i === -1 ? Infinity : i;
};

/**
 * WIP allowlist: when non-empty, ONLY these families show in the playground — every
 * other family is hidden (selector, sidebar, and canvas). Use while building to hide
 * unfinished families and reveal them one by one by adding to the set. Empty = show
 * all (the finished state). Family = COMPONENT_DEFS key; hidden families keep their
 * rows + `COMPONENT_DEFS` demo in the code, just unsurfaced.
 */
export const shownFamilies = new Set<string>([
  'Button',
  'Menu',
  'Tooltip',
  'TextField',
  'Tabs',
  'Accordion',
  'Checkbox',
  'Radio',
  'SvgIcon',
  'Select',
  'Chip',
  'Alert',
  'Card',
  'Avatar',
  'ToggleButton',
  'Badge',
  'Switch',
  'Autocomplete',
  'Breadcrumbs',
  'Stepper',
  'ButtonGroup',
  'Progress',
  'Table',
  'Slider',
  'Divider',
  'DataGrid',
  'Toolbar',
  'Dialog',
  'Fab',
  'Pagination',
  'List',
  'SnackbarContent',
  'BottomNavigation',
  'TreeView',
  'DatePicker',
]);

/**
 * One group per family, holding every emitted leaf of its components — derived
 * from the table, so new leaves appear after `pnpm density:codegen`. Labels and
 * hidden/hiddenIn meta come from `densityKnobs` (codegen-managed keys,
 * hand-edited values).
 */
export const densityGroups: DensityGroup[] = (() => {
  const byFamily = new Map<string, string[]>();
  for (const row of allRows) {
    if (hiddenFieldIds.has(row.id)) {
      continue; // editorial denylist (see hiddenFieldIds)
    }
    const family = componentFamily[row.target.component];
    if (!family) {
      continue; // component not surfaced (no canvas demo)
    }
    for (const fam of Array.isArray(family) ? family : [family]) {
      if (hiddenFieldIdsByFamily[fam]?.has(row.id)) {
        continue; // editorial per-family denylist (see hiddenFieldIdsByFamily)
      }
      if (!byFamily.has(fam)) {
        byFamily.set(fam, []);
      }
      byFamily.get(fam)!.push(row.id);
    }
  }
  return [...byFamily]
    .filter(([key]) => shownFamilies.size === 0 || shownFamilies.has(key))
    .map(([key, fields]) => ({ key, fields }))
    .sort((a, b) => {
      const ra = familyRank(a.key);
      const rb = familyRank(b.key);
      return ra !== rb ? ra - rb : a.key.localeCompare(b.key);
    });
})();

const rowById = new Map<string, DensityEmitRow>(allRows.map((r) => [r.id, r]));

export const densityRow = (id: string): DensityEmitRow | undefined => rowById.get(id);

/** Presets a knob is marked DONE for (reviewed/confirmed) — from densityKnobs meta. */
export const knobDonePresets = (id: string): readonly string[] => {
  const v = densityKnobs[id];
  return typeof v === 'object' && Array.isArray((v as { done?: string[] }).done)
    ? (v as { done: string[] }).done
    : [];
};

/** Display label for a field id — codegen knob entries first, then override-only rows. */
export const fieldLabel = (id: string): string => {
  const v = densityKnobs[id];
  return (typeof v === 'object' ? v.label : v) ?? rowById.get(id)?.label ?? id;
};

/**
 * Strip the "Component · [slot · ]" prefix a codegen label carries — the sidebar
 * now shows component + slot as tree headings, so the knob keeps only its tail.
 */
export function stripComponentSlot(label: string, component: string, slot: string): string {
  const comp = component.replace(/^Mui/, '');
  let out = label;
  if (out.startsWith(`${comp} · `)) {
    out = out.slice(comp.length + 3);
  }
  if (slot !== 'root' && out.startsWith(`${slot} · `)) {
    out = out.slice(slot.length + 3);
  }
  return out;
}

/** Knob-only label (component + slot live in the sidebar tree, not here). */
export const knobLabel = (id: string): string => {
  const row = rowById.get(id);
  const full = fieldLabel(id);
  return row ? stripComponentSlot(full, row.target.component, row.target.slot) : full;
};

/** Every id the registry surfaces, for the freshness/existence test. */
export const registeredFieldIds = densityGroups.flatMap((g) => g.fields);

/**
 * Virtual knob: one sidebar input that writes the SAME value to several member
 * field ids (which are hidden individually). Lets one control drive multiple CSS
 * targets without any change to `buildOverrides` — the members flow through the
 * normal edit loop. Members may be generated rows (Tab icon gap) or extra rows
 * (Accordion edge radius).
 */
export interface DensityVirtualKnob {
  id: string;
  label: string;
  /** family group key (matches a `densityGroups` key). */
  group: string;
  /** field ids this input writes to; all get the same value. */
  members: string[];
  /**
   * Display slot the sidebar nests the knob under (and highlights via its
   * `Component|slot` key). Defaults to the first member's slot — set it when the
   * members span slots and neither name fits (e.g. startIcon+endIcon → `icon`);
   * a synthetic name has no `Mui<Component>-<slot>` class, so it needs a
   * `SLOT_HIGHLIGHT_SELECTORS` entry in the playground.
   */
  slot?: string;
}

/**
 * Linked writes: committing the KEY row's knob ALSO writes a derived value to
 * the linked rows (hidden plumbing). `wrap` receives the RESOLVED CSS value
 * (density keys already expanded); the result lands as an ordinary mapping
 * entry, so canvas and export pick it up through the normal edit path. Clearing
 * the key row clears the linked rows.
 */
export interface DensityLinkedWrite {
  id: string;
  wrap: (resolvedValue: string) => string;
}

const negate = (v: string) => `calc(-1 * ${v})`;
const half = (v: string) => `calc(${v} / 2)`;

export const densityLinkedWrites: Record<string, DensityLinkedWrite[]> = {
  // MenuItem min-height -> the sm-up re-assert. Master resets non-dense
  // min-height to `auto` at sm-up (media rules hoist after the class rule), so
  // the knob's value must land inside that media too or desktop ignores it.
  // Dense has no master media reset — no link needed.
  'MuiMenuItem|root|dense=false||minHeight': [
    { id: 'MuiMenuItem|root|dense=false|@media (min-width:600px)|minHeight', wrap: (v) => v },
  ],
  // Stepper flow gap -> alternativeLabel connector right edge clears the gap.
  'MuiStepper|root|base||columnGap': [
    {
      id: 'MuiStepConnector|root|alternativeLabel=true,orientation=horizontal||right',
      wrap: (v) => `calc(50% + 20px + ${v})`,
    },
  ],
  // PickerDay size (the "PickerDay · size" virtual knob's key member) -> the
  // transformed day-size consumers: skeleton day (!important beats inline props),
  // 6-week + loading container heights (calc). Plain-value members ride the
  // virtual knob directly.
  'MuiPickerDay|root|base||--PickerDay-size': [
    { id: 'MuiDayCalendarSkeleton|daySkeleton|base||width', wrap: (v) => `${v} !important` },
    { id: 'MuiDayCalendarSkeleton|daySkeleton|base||height', wrap: (v) => `${v} !important` },
    { id: 'MuiDayCalendar|slideTransition|base||minHeight', wrap: (v) => `calc((${v} + 4px) * 6)` },
    {
      id: 'MuiDayCalendar|loadingContainer|base||minHeight',
      wrap: (v) => `calc((${v} + 4px) * 6)`,
    },
    // [Pro] Range calendar slideTransition minHeight (scoped under MuiDateRangeCalendar
    // root to beat Pro's hardcoded InnerDayCalendarForRange) mirrors the single one.
    {
      id: 'MuiDateRangeCalendar|root|base|& .MuiDayCalendar-slideTransition|minHeight',
      wrap: (v) => `calc((${v} + 4px) * 6)`,
    },
  ],
  // DateCalendar root width -> the 6-week grid floor width (they're the same box).
  'MuiDateCalendar|root|base||width': [
    { id: 'MuiDayCalendar|slideTransition|base||minWidth', wrap: (v) => v },
    // [Pro] Range calendar slideTransition minWidth mirrors the single calendar width.
    {
      id: 'MuiDateRangeCalendar|root|base|& .MuiDayCalendar-slideTransition|minWidth',
      wrap: (v) => v,
    },
  ],
  // Node touch target -> connector + StepContent offsets (touchTarget/2 = icon
  // center). minWidth drives every horizontal offset: connector margins, and the
  // StepContent border margin + its equal padding (margin+padding = touchTarget,
  // so content text aligns with the label). minHeight drives the horizontal-alt
  // connector `top`. All follow the touch box when it resizes.
  'MuiStepLabel|iconContainer|base||minWidth': [
    {
      id: 'MuiStepConnector|root|alternativeLabel=false,orientation=vertical||marginLeft',
      wrap: half,
    },
    {
      id: 'MuiStepConnector|root|alternativeLabel=true,orientation=vertical||marginRight',
      wrap: half,
    },
    { id: 'MuiStepContent|root|alternativeLabel=false||marginLeft', wrap: half },
    { id: 'MuiStepContent|root|alternativeLabel=false||paddingLeft', wrap: half },
    { id: 'MuiStepContent|root|alternativeLabel=true||marginRight', wrap: half },
    { id: 'MuiStepContent|root|alternativeLabel=true||paddingRight', wrap: half },
  ],
  'MuiStepLabel|iconContainer|base||minHeight': [
    { id: 'MuiStepConnector|root|alternativeLabel=true,orientation=horizontal||top', wrap: half },
  ],
  // Input inline padding -> the root-side re-emissions of master's 14/12px map
  // (adorned root pads, --_trailingPad, multiline root inline). One knob moves
  // the whole chain; the input-slot 0 re-asserts are constant (hidden knobs).
  'MuiOutlinedInput|input|base||paddingInline': [
    { id: 'MuiOutlinedInput|root|multiline=true||paddingInline', wrap: (v) => v },
    { id: 'MuiOutlinedInput|root|fn:4q8gcu||paddingLeft', wrap: (v) => v },
    { id: 'MuiOutlinedInput|root|fn:ho424h||--_trailingPad', wrap: (v) => v },
    // label X broadcast — the InputLabel transforms consume it
    { id: 'MuiOutlinedInput|root|base|.MuiInputLabel-root:has(~ &)|--_inlinePad', wrap: (v) => v },
    // the input-slot 0 re-asserts must ride along or the user layer (appended
    // last) clobbers master's multiline/adorned resets with the new inline pad
    { id: 'MuiOutlinedInput|input|multiline=true||paddingInline', wrap: () => '0px' },
    { id: 'MuiOutlinedInput|input|fn:4q8gcu||paddingLeft', wrap: () => '0px' },
    { id: 'MuiOutlinedInput|input|fn:ho424h||paddingRight', wrap: () => '0px' },
  ],
  // Picker outlined inline pad -> the InputLabel X broadcast (mirrors OutlinedInput).
  'MuiPickersOutlinedInput|root|base||paddingInline': [
    {
      id: 'MuiPickersOutlinedInput|root|base|.MuiInputLabel-root:has(~ &)|--_inlinePad',
      wrap: (v) => v,
    },
  ],
  // Picker filled inline pad (on the sectionsContainer) -> the InputLabel X broadcast.
  'MuiPickersFilledInput|sectionsContainer|base||paddingInline': [
    {
      id: 'MuiPickersFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_inlinePad',
      wrap: (v) => v,
    },
  ],
  'MuiFilledInput|input|base||paddingInline': [
    { id: 'MuiFilledInput|root|multiline=true||paddingInline', wrap: (v) => v },
    { id: 'MuiFilledInput|root|fn:4q8gcu||paddingLeft', wrap: (v) => v },
    { id: 'MuiFilledInput|root|fn:ho424h||--_trailingPad', wrap: (v) => v },
    // label X broadcast — the InputLabel transforms consume it
    { id: 'MuiFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_inlinePad', wrap: (v) => v },
    // the input-slot 0 re-asserts must ride along or the user layer (appended
    // last) clobbers master's multiline/adorned resets with the new inline pad
    { id: 'MuiFilledInput|input|multiline=true||paddingInline', wrap: () => '0px' },
    { id: 'MuiFilledInput|input|fn:4q8gcu||paddingLeft', wrap: () => '0px' },
    { id: 'MuiFilledInput|input|fn:ho424h||paddingRight', wrap: () => '0px' },
  ],
  // Switch gutter -> FormControlLabel pull (marginLeft/right = -gutter).
  'MuiSwitch|root|size=medium||--_pad': [
    {
      id: 'MuiSwitch|root|size=medium|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft',
      wrap: negate,
    },
    {
      id: 'MuiSwitch|root|size=medium|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight',
      wrap: negate,
    },
  ],
  'MuiSwitch|root|size=small||--_pad': [
    {
      id: 'MuiSwitch|root|size=small|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft',
      wrap: negate,
    },
    {
      id: 'MuiSwitch|root|size=small|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight',
      wrap: negate,
    },
  ],
  // Thumb size (--_thumbHeight) also writes the thumb width (square by default);
  // the width var is a separate hidden knob, so an explicit width edit (applied
  // after) overrides just the width for a non-square thumb.
  'MuiSwitch|root|size=medium||--_thumbHeight': [
    { id: 'MuiSwitch|root|size=medium||--_thumbWidth', wrap: (v) => v },
  ],
  'MuiSwitch|root|size=small||--_thumbHeight': [
    { id: 'MuiSwitch|root|size=small||--_thumbWidth', wrap: (v) => v },
  ],
};

export const densityVirtualKnobs: DensityVirtualKnob[] = [
  {
    id: 'virtual:MuiAvatar:size',
    label: 'Avatar · size',
    group: 'Avatar',
    members: ['MuiAvatar|root|base||width', 'MuiAvatar|root|base||height'],
  },
  // 1:1 box per size — one knob per size drives width+height (Avatar pattern).
  {
    id: 'virtual:MuiIconButton:sizeSmall',
    label: 'IconButton · size [size=small]',
    group: 'Button',
    members: ['MuiIconButton|root|size=small||width', 'MuiIconButton|root|size=small||height'],
  },
  {
    id: 'virtual:MuiIconButton:size',
    label: 'IconButton · size [size=medium]',
    group: 'Button',
    members: ['MuiIconButton|root|size=medium||width', 'MuiIconButton|root|size=medium||height'],
  },
  {
    id: 'virtual:MuiIconButton:sizeLarge',
    label: 'IconButton · size [size=large]',
    group: 'Button',
    members: ['MuiIconButton|root|size=large||width', 'MuiIconButton|root|size=large||height'],
  },
  // Both icon slots share master's `& > *:nth-of-type(1)` fontSize seam — one
  // glyph size, one knob, surfaced under a synthetic `icon` slot.
  {
    id: 'virtual:MuiButton:iconFontSize',
    label: 'Button · icon · fontSize',
    group: 'Button',
    slot: 'icon',
    members: [
      'MuiButton|startIcon|base|& > *:nth-of-type(1)|fontSize',
      'MuiButton|endIcon|base|& > *:nth-of-type(1)|fontSize',
    ],
  },
  // Chip icon margins ride the root as `& .MuiChip-icon` (to beat master's 0,2,0
  // rule) but display under the icon slot via these single-member remaps.
  {
    id: 'virtual:MuiChip:iconMarginLeftMedium',
    label: 'Chip · icon · marginLeft [size=medium]',
    group: 'Chip',
    slot: 'icon',
    members: ['MuiChip|root|size=medium|& .MuiChip-icon|marginLeft'],
  },
  {
    id: 'virtual:MuiChip:iconMarginRightMedium',
    label: 'Chip · icon · marginRight [size=medium]',
    group: 'Chip',
    slot: 'icon',
    members: ['MuiChip|root|size=medium|& .MuiChip-icon|marginRight'],
  },
  {
    id: 'virtual:MuiChip:iconMarginLeftSmall',
    label: 'Chip · icon · marginLeft [size=small]',
    group: 'Chip',
    slot: 'icon',
    members: ['MuiChip|root|size=small|& .MuiChip-icon|marginLeft'],
  },
  {
    id: 'virtual:MuiChip:iconMarginRightSmall',
    label: 'Chip · icon · marginRight [size=small]',
    group: 'Chip',
    slot: 'icon',
    members: ['MuiChip|root|size=small|& .MuiChip-icon|marginRight'],
  },
  {
    id: 'virtual:MuiStepper:gap',
    label: 'Stepper · column gap',
    group: 'Stepper',
    members: ['MuiStepper|root|base||columnGap', 'MuiStep|root|base||columnGap'],
  },
  // Slider — symmetric orientation/axis pairs collapse to one knob each.
  {
    id: 'virtual:MuiSlider:trackThickness',
    label: 'Slider · track thickness [size=medium]',
    group: 'Slider',
    members: [
      'MuiSlider|root|orientation=horizontal||height',
      'MuiSlider|root|orientation=vertical||width',
    ],
  },
  {
    id: 'virtual:MuiSlider:trackThicknessSmall',
    label: 'Slider · track thickness [size=small]',
    group: 'Slider',
    members: [
      'MuiSlider|root|orientation=horizontal,size=small||height',
      'MuiSlider|root|orientation=vertical,size=small||width',
    ],
  },
  {
    id: 'virtual:MuiSlider:touchPadding',
    label: 'Slider · touch padding',
    group: 'Slider',
    members: [
      'MuiSlider|root|orientation=horizontal||paddingBlock',
      'MuiSlider|root|orientation=vertical||paddingInline',
    ],
  },
  {
    id: 'virtual:MuiSlider:thumbSize',
    label: 'Slider · thumb · size [size=medium]',
    group: 'Slider',
    members: ['MuiSlider|thumb|base||width', 'MuiSlider|thumb|base||height'],
  },
  {
    id: 'virtual:MuiSlider:thumbSizeSmall',
    label: 'Slider · thumb · size [size=small]',
    group: 'Slider',
    members: ['MuiSlider|thumb|size=small||width', 'MuiSlider|thumb|size=small||height'],
  },
  {
    id: 'virtual:MuiBadge:standardSize',
    label: 'Badge · badge · size [variant=standard]',
    group: 'Badge',
    members: [
      'MuiBadge|badge|variant=standard||minWidth',
      'MuiBadge|badge|variant=standard||height',
    ],
  },
  {
    id: 'virtual:MuiBadge:dotSize',
    label: 'Badge · badge · size [variant=dot]',
    group: 'Badge',
    members: ['MuiBadge|badge|variant=dot||minWidth', 'MuiBadge|badge|variant=dot||height'],
  },
  // Step node touch box — capture's 32x32 touch-target wrapper, both axes.
  {
    id: 'virtual:MuiStepLabel:nodeTouchTarget',
    label: 'StepLabel · iconContainer · node touch target',
    group: 'Stepper',
    members: [
      'MuiStepLabel|iconContainer|base||minWidth',
      'MuiStepLabel|iconContainer|base||minHeight',
    ],
  },
  // Day-cell size — one knob drives PickerDay + DateRangePickerDay --PickerDay-size
  // and the weekday/week-number box widths (members); the skeleton (!important) and
  // 6-week/loading heights (calc) follow via linked writes off --PickerDay-size.
  {
    id: 'virtual:MuiPickerDay:size',
    label: 'PickerDay · size',
    group: 'DatePicker',
    members: [
      'MuiPickerDay|root|base||--PickerDay-size',
      'MuiDateRangePickerDay|root|base||--PickerDay-size',
      'MuiDayCalendar|weekDayLabel|base||width',
      'MuiDayCalendar|weekNumberLabel|base||width',
      'MuiDayCalendar|weekNumber|base||width',
      'MuiDayCalendar|weekNumber|base||height',
    ],
  },
  // Select caret machinery — one value writes both master hooks (--_caret and
  // the adorned --_endAdornment gutter).
  {
    id: 'virtual:MuiSelect:caretSize',
    label: 'Select · select · caret size',
    group: 'Select',
    members: [
      'MuiSelect|select|base|.MuiInputBase-root:has(> &)|--_caret',
      'MuiSelect|select|base|.MuiInputBase-root:has(> & ~ .MuiInputAdornment-root)|--_endAdornment',
    ],
  },
  // Tab base min-height is PAIRED with the Tabs container min-height (48==48
  // in the preset) — an independent Tab edit would be masked by the container,
  // so one knob writes both.
  {
    id: 'virtual:MuiTab:minHeight',
    label: 'Tab · min height',
    group: 'Tabs',
    members: ['MuiTab|root|base||minHeight', 'MuiTabs|root|base||minHeight'],
  },
  // {
  //   id: 'virtual:MuiAccordion:edgeRadius',
  //   label: 'Accordion · edge radius',
  //   group: 'Accordion',
  //   members: [
  //     'MuiAccordion|root|base|&:first-of-type|borderTopLeftRadius',
  //     'MuiAccordion|root|base|&:first-of-type|borderTopRightRadius',
  //     'MuiAccordion|root|base|&:last-of-type|borderBottomLeftRadius',
  //     'MuiAccordion|root|base|&:last-of-type|borderBottomRightRadius',
  //   ],
  // },
  // The four per-placement offset margins (non-touch) collapse to one knob — arrow
  // doesn't change them (see Tooltip.js base styles), so one value drives all sides.
  {
    id: 'virtual:MuiTooltip:offset',
    label: 'Tooltip · tooltip · margin offset',
    group: 'Tooltip',
    members: [
      'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="left"] &|marginInlineEnd',
      'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="right"] &|marginInlineStart',
      'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="top"] &|marginBottom',
      'MuiTooltip|tooltip|base|.MuiTooltip-popper[data-popper-placement*="bottom"] &|marginTop',
    ],
  },
];
