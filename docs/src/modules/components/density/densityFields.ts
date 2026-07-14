import { densityEmitTable, type DensityEmitRow } from './emitTable.generated';
import { densityKnobs } from './densityKnobs';
import { densityExtraRows } from './densityExtraFields';

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
  MuiFab: 'Fab',
  MuiPaginationItem: 'Pagination',
  MuiSnackbarContent: 'SnackbarContent',
  MuiBottomNavigation: 'BottomNavigation',
  MuiBottomNavigationAction: 'BottomNavigation',
  MuiDialogTitle: 'Dialog',
  MuiDialogContent: 'Dialog',
  MuiDialogActions: 'Dialog',
  MuiListItemButton: 'ListItemButton',
  MuiButtonGroup: 'ButtonGroup',
  MuiTableCell: 'TableCell',
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
};

/**
 * Per-family component order + scope in the sidebar. Keys are family
 * (COMPONENT_DEFS) keys; values are component short-names (no `Mui` prefix) in
 * display order. When a family has an entry, ONLY those components show, in that
 * order (listed names with no knobs are dropped). Families without an entry fall
 * back to base-first (name === family key) then alphabetical.
 */
export const familyComponentOrder: Record<string, string[]> = {
  Card: ['Card', 'CardHeader', 'CardContent', 'CardActions'],
  Checkbox: ['Checkbox', 'FormControlLabel'],
  Radio: ['Radio', 'FormControlLabel'],
  Switch: ['Switch', 'FormControlLabel'],
  ButtonGroup: ['ButtonGroup', 'Button'],
  ToggleButton: ['ToggleButton', 'SvgIcon'],
  Stepper: ['Stepper', 'Step', 'StepLabel', 'StepConnector', 'StepContent', 'SvgIcon'],
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
 * Per-id denylist: rows kept in the (mechanical) emit table but not surfaced as
 * sidebar knobs — the row never applies independently (dropped from
 * `densityGroups` before the collect path). DERIVED: mark the row
 * `hidden: true` in `densityKnobs.ts` (generated rows) or on the row itself in
 * `densityExtraFields.ts` (extra rows); never edit this set directly.
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
  'DataGrid',
  'Avatar',
  'Radio',
  'Switch',
  'ToggleButton',
  'Badge',
  'TreeView',
  'Autocomplete',
  'Breadcrumbs',
  'Stepper',
  'DatePicker',
  'ButtonGroup',
  'Transitions',
  'Slider',
  'Table',
  'Popover',
  // Pinned last (out of usage-rank position) — minor single-knob families.
  'Progress',
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
