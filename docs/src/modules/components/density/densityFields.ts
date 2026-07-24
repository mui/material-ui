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

const radiusRow = (component: string, slot: string, label: string): DensityEmitRow => ({
  id: `${component}|${slot}|base||borderRadius`,
  label: `${label} · borderRadius`,
  isDensity: false,
  densityKey: null,
  target: { component, slot, props: null, nested: '', cssProp: 'borderRadius' },
  values: {},
});

// Per-size radius (Button splits by size like its padding/font-size do).
const radiusRowSized = (
  component: string,
  slot: string,
  label: string,
  size: 'small' | 'medium' | 'large',
): DensityEmitRow => ({
  id: `${component}|${slot}|size=${size}||borderRadius`,
  label: `${label} · borderRadius [size=${size}]`,
  isDensity: false,
  densityKey: null,
  target: { component, slot, props: { size }, nested: '', cssProp: 'borderRadius' },
  values: {},
});

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
  radiusRowSized('MuiButton', 'root', 'Button', 'small'),
  radiusRowSized('MuiButton', 'root', 'Button', 'medium'),
  radiusRowSized('MuiButton', 'root', 'Button', 'large'),
  radiusRow('MuiTooltip', 'tooltip', 'Tooltip'),
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
  {
    id: 'MuiListItemIcon|root|base||minWidth',
    label: 'ListItemIcon · minWidth',
    isDensity: false,
    densityKey: null,
    target: {
      component: 'MuiListItemIcon',
      slot: 'root',
      props: null,
      nested: '',
      cssProp: 'minWidth',
    },
    values: {},
  },
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
  MuiList: 'Menu',
  MuiListItemIcon: 'Menu',
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
  MuiInput: 'TextField',
  MuiCheckbox: 'Checkbox',
  MuiRadio: 'Radio',
  MuiFormControlLabel: ['Checkbox', 'Radio', 'Switch'],
  MuiAvatar: 'Avatar',
  MuiLinearProgress: 'Progress',
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
  MuiListItemButton: 'ListItemButton',
  MuiButtonGroup: 'ButtonGroup',
  MuiTableCell: 'Table',
  MuiTableSortLabel: 'Table',
  MuiTablePagination: 'Table',
  MuiDataGrid: 'DataGrid',
  MuiStep: 'Stepper',
  MuiStepper: 'Stepper',
  MuiStepConnector: 'Stepper',
  MuiStepContent: 'Stepper',
  MuiStepLabel: 'Stepper',
  MuiToolbar: 'Toolbar',
  MuiBadge: 'Badge',
  MuiToggleButton: 'ToggleButton',
  MuiBreadcrumbs: 'Breadcrumbs',
  MuiCardActions: 'Card',
  MuiCardContent: 'Card',
  MuiCardHeader: 'Card',
  MuiSelect: 'Select',
  MuiSvgIcon: ['SvgIcon', 'ToggleButton', 'Stepper'],
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
  MuiPickerDay: 'DatePicker',
  MuiPickersCalendarHeader: 'DatePicker',
  MuiYearCalendar: 'DatePicker',
  MuiMonthCalendar: 'DatePicker',
  MuiDigitalClock: 'DatePicker',
  MuiMultiSectionDigitalClockSection: 'DatePicker',
  MuiPickersToolbar: 'DatePicker',
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
  Stepper: ['Stepper', 'Step', 'StepLabel', 'StepConnector', 'StepContent', 'SvgIcon'],
  Table: ['TableCell', 'TableSortLabel', 'TablePagination'],
  Select: ['InputBase', 'Select'],
  TextField: ['InputBase', 'InputAdornment', 'OutlinedInput', 'FilledInput', 'Input'],
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
  'ListItemButton',
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
  'ListItemButton',
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

export const densityLinkedWrites: Record<string, DensityLinkedWrite[]> = {
  // Button block padding -> outlined re-emission at -1px (border keeps all
  // variants at equal height; master's own compensation). One knob per size
  // moves every variant, outlined stays 1px behind.
  ...Object.fromEntries(
    (['small', 'medium', 'large'] as const).map((size) => [
      `MuiButton|root|size=${size}||paddingBlock`,
      [
        {
          id: `MuiButton|root|size=${size},variant=outlined||paddingBlock`,
          wrap: (v: string) => `calc(${v} - 1px)`,
        },
      ],
    ]),
  ),
  // Stepper flow gap -> alternativeLabel connector right edge clears the gap.
  'MuiStepper|root|base||columnGap': [
    {
      id: 'MuiStepConnector|root|alternativeLabel=true,orientation=horizontal||right',
      wrap: (v) => `calc(50% + 20px + ${v})`,
    },
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
};

export const densityVirtualKnobs: DensityVirtualKnob[] = [
  {
    id: 'virtual:MuiAvatar:size',
    label: 'Avatar · size',
    group: 'Avatar',
    members: ['MuiAvatar|root|base||width', 'MuiAvatar|root|base||height'],
  },
  {
    id: 'virtual:MuiStepper:gap',
    label: 'Stepper · column gap',
    group: 'Stepper',
    members: ['MuiStepper|root|base||columnGap', 'MuiStep|root|base||columnGap'],
  },
  // Icon→label gap: paddingRight in row layouts, paddingLeft when vertical
  // alternativeLabel flips the icon to the label's right — one knob, one gap.
  {
    id: 'virtual:MuiStepLabel:labelSpacing',
    label: 'StepLabel · iconContainer · row label spacing',
    group: 'Stepper',
    members: [
      'MuiStepLabel|iconContainer|base||paddingRight',
      'MuiStepLabel|iconContainer|alternativeLabel=true,orientation=vertical||paddingLeft',
    ],
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
  {
    id: 'virtual:MuiTab:iconGapBlock',
    label: 'Tab · icon gap (block)',
    group: 'Tabs',
    members: [
      'MuiTab|root|fn:8b76di|& > .MuiTab-icon|marginBottom', // icon-top layout
      'MuiTab|root|fn:ekzzmq|& > .MuiTab-icon|marginTop', // icon-bottom layout
    ],
  },
  {
    id: 'virtual:MuiTab:iconGapInline',
    label: 'Tab · icon gap (inline)',
    group: 'Tabs',
    members: [
      'MuiTab|root|fn:s0l8zx|& > .MuiTab-icon|marginRight', // icon-start layout
      'MuiTab|root|fn:8au602|& > .MuiTab-icon|marginLeft', // icon-end layout
    ],
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
