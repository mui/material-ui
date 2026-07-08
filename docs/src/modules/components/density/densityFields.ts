import { densityEmitTable, type DensityEmitRow } from './emitTable.generated';
import { densityLabels } from './densityLabels';
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
  MuiButton: 'Button',
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
  MuiInputAdornment: 'TextField',
  MuiFilledInput: 'TextField',
  MuiInputBase: 'TextField',
  MuiInput: 'TextField',
  MuiCheckbox: 'Checkbox',
  MuiRadio: 'Radio',
  MuiFormControlLabel: ['Checkbox', 'Radio'],
  MuiAvatar: 'Avatar',
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
  MuiStepLabel: 'Stepper',
  MuiToolbar: 'Toolbar',
  MuiBadge: 'Badge',
  MuiToggleButton: 'ToggleButton',
  MuiBreadcrumbs: 'Breadcrumbs',
  MuiCardActions: 'Card',
  MuiCardContent: 'Card',
  MuiCardHeader: 'Card',
  MuiSelect: 'Select',
  MuiSvgIcon: 'SvgIcon',
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
  Checkbox: ['Checkbox', 'FormControlLabel'],
  Radio: ['Radio', 'FormControlLabel'],
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
 * sidebar knobs. Editorial, same layer as `componentFamily` — for internal `--_*`
 * plumbing that derives off another knob and isn't independently tunable.
 */
export const hiddenFieldIds = new Set<string>([
  'MuiOutlinedInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY',
  'MuiOutlinedInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_restY',
  'MuiOutlinedInput|input|base||paddingBlock',
  'MuiOutlinedInput|input|size=small||paddingBlock',
  'MuiOutlinedInput|input|multiline=true||paddingBlock',
  'MuiOutlinedInput|root|multiline=true||paddingBlock',
  'MuiOutlinedInput|root|multiline=true,size=small||paddingBlock',
  'MuiFilledInput|input|base||paddingTop',
  'MuiFilledInput|input|base||paddingBottom',
  'MuiFilledInput|input|hiddenLabel=true||paddingTop',
  'MuiFilledInput|input|hiddenLabel=true||paddingBottom',
  'MuiFilledInput|input|hiddenLabel=true,size=small||paddingTop',
  'MuiFilledInput|input|hiddenLabel=true,size=small||paddingBottom',
  'MuiFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY',
  'MuiFilledInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_restY',
  'MuiFilledInput|root|multiline=true||paddingTop',
  'MuiFilledInput|root|multiline=true||paddingBottom',
  'MuiFilledInput|root|multiline=true,size=small||paddingTop',
  'MuiFilledInput|root|multiline=true,size=small||paddingBottom',
  'MuiFilledInput|input|multiline=true||paddingBlock',
  'MuiFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_shrinkY',
  'MuiFilledInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_shrinkY',
  'MuiFilledInput|root|hiddenLabel=true,multiline=true||paddingTop',
  'MuiFilledInput|root|hiddenLabel=true,multiline=true||paddingBottom',
  'MuiFilledInput|root|hiddenLabel=true,multiline=true,size=small||paddingTop',
  'MuiFilledInput|root|hiddenLabel=true,multiline=true,size=small||paddingBottom',
  'MuiInput|input|multiline=true||paddingBlock',
  'MuiInput|input|base||paddingTop',
  'MuiInput|input|base||paddingBottom',
  'MuiInput|input|size=small||paddingTop',
  'MuiInput|input|size=small||paddingBottom',
  'MuiInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY',
  'MuiInput|root|base|label + &, .MuiInputLabel-root + &|marginTop',
  'MuiInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_restY',
  'MuiInput|root|multiline=true||paddingTop',
  'MuiInput|root|multiline=true||paddingBottom',
  'MuiInput|root|multiline=true,size=small||paddingTop',
  'MuiInput|root|multiline=true,size=small||paddingBottom',
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root|paddingBlock',
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root .MuiAutocomplete-input|paddingBlock',
  'MuiAutocomplete|root|base|& .MuiFormControl-root:has(> .MuiOutlinedInput-root)|--_outlinedInputPadBlock',
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root.MuiInputBase-sizeSmall|paddingBlock',
  'MuiAutocomplete|root|base|& .MuiOutlinedInput-root.MuiInputBase-sizeSmall .MuiAutocomplete-input|paddingBlock',
  // Tooltip arrow geometry — derived from the popper-slot --_arrowSize var
  // (calc leaves emitted by the presets against master selectors), not
  // independently tunable. The var row is the knob.
  'MuiTooltip|popper|base|&[data-popper-placement*="bottom"] .MuiTooltip-arrow|marginTop',
  'MuiTooltip|popper|base|&[data-popper-placement*="top"] .MuiTooltip-arrow|marginBottom',
  'MuiTooltip|popper|base|&[data-popper-placement*="right"] .MuiTooltip-arrow|height',
  'MuiTooltip|popper|base|&[data-popper-placement*="right"] .MuiTooltip-arrow|width',
  'MuiTooltip|popper|base|&[data-popper-placement*="right"] .MuiTooltip-arrow|marginInlineStart',
  'MuiTooltip|popper|base|&[data-popper-placement*="left"] .MuiTooltip-arrow|height',
  'MuiTooltip|popper|base|&[data-popper-placement*="left"] .MuiTooltip-arrow|width',
  'MuiTooltip|popper|base|&[data-popper-placement*="left"] .MuiTooltip-arrow|marginInlineEnd',
  'MuiTooltip|popper|base|& .MuiTooltip-arrow|width',
  'MuiTooltip|popper|base|& .MuiTooltip-arrow|height',
  // Checkbox/Radio sibling-label margin compensation — derived from the padding
  // knob (calc(-2px - padding)), not independently tunable. The padding field's
  // builder re-emits them (see selectionControlPadding in buildDensityOverrides).
  'MuiCheckbox|root|size=medium|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft',
  'MuiCheckbox|root|size=medium|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight',
  'MuiCheckbox|root|size=small|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft',
  'MuiCheckbox|root|size=small|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight',
  'MuiRadio|root|size=medium|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft',
  'MuiRadio|root|size=medium|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight',
  'MuiRadio|root|size=small|.MuiFormControlLabel-labelPlacementEnd:has(> &)|marginLeft',
  'MuiRadio|root|size=small|.MuiFormControlLabel-labelPlacementStart:has(> &)|marginRight',
]);

export interface DensityGroup {
  /** matches a COMPONENT_DEFS key in the playground (canvas demo) */
  key: string;
  /** generated-table row ids in table order */
  fields: string[];
}

/**
 * Selector/display order — follows weave-families.yml (Weave usage rank). Keys
 * not listed there (playground-only demo families) fall to the end, alphabetical.
 */
const WEAVE_FAMILY_ORDER = [
  'Typography',
  'Button',
  'Menu',
  'Tooltip',
  'TextField',
  'Progress',
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
]);

/**
 * One group per family, holding every emitted leaf of its components — derived
 * from the table, so new leaves appear after `pnpm density:codegen`. Labels come
 * from `densityLabels` (codegen-managed keys, hand-edited values).
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

/** Display label for a field id — codegen labels first, then override-only rows. */
export const fieldLabel = (id: string): string => densityLabels[id] ?? rowById.get(id)?.label ?? id;

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
