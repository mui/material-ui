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
 * themselves come from the generated table.
 */
export const componentFamily: Record<string, string> = {
  MuiButton: 'Button',
  MuiList: 'Menu',
  MuiListItemIcon: 'Menu',
  MuiMenuItem: 'Menu',
  MuiAccordion: 'Accordion',
  MuiTab: 'Tabs',
  MuiTabs: 'Tabs',
  MuiAutocomplete: 'Autocomplete',
  MuiTooltip: 'Tooltip',
  MuiOutlinedInput: 'TextField',
  MuiInputAdornment: 'TextField',
  MuiFilledInput: 'TextField',
  MuiInputBase: 'TextField',
  MuiInput: 'TextField',
  MuiCheckbox: 'Checkbox',
  MuiRadio: 'Radio',
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
  MuiAlert: 'Alert',
  MuiChip: 'Chip',
  MuiAccordionDetails: 'Accordion',
  MuiAccordionSummary: 'Accordion',
};

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
  'MuiOutlinedInput|input|fn:1ghwre||paddingBlock',
  'MuiOutlinedInput|root|fn:1ghwre||paddingBlock',
  'MuiOutlinedInput|root|fn:124vl6||paddingBlock',
  'MuiFilledInput|input|base||paddingTop',
  'MuiFilledInput|input|base||paddingBottom',
  'MuiFilledInput|input|fn:18uwxi||paddingTop',
  'MuiFilledInput|input|fn:18uwxi||paddingBottom',
  'MuiFilledInput|input|fn:1anfzr||paddingTop',
  'MuiFilledInput|input|fn:1anfzr||paddingBottom',
  'MuiFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_restY',
  'MuiFilledInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_restY',
  'MuiFilledInput|root|fn:1ghwre||paddingTop',
  'MuiFilledInput|root|fn:1ghwre||paddingBottom',
  'MuiFilledInput|root|fn:124vl6||paddingTop',
  'MuiFilledInput|root|fn:124vl6||paddingBottom',
  'MuiFilledInput|input|fn:1ghwre||paddingBlock',
  'MuiFilledInput|root|base|.MuiInputLabel-root:has(~ &)|--_shrinkY',
  'MuiFilledInput|root|size=small|.MuiInputLabel-root:has(~ &)|--_shrinkY',
  'MuiFilledInput|root|fn:1dxjh5||paddingTop',
  'MuiFilledInput|root|fn:1dxjh5||paddingBottom',
  'MuiFilledInput|root|fn:156ydn||paddingTop',
  'MuiFilledInput|root|fn:156ydn||paddingBottom',
  'MuiInput|input|fn:1ghwre||paddingBlock',
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
    if (!byFamily.has(family)) {
      byFamily.set(family, []);
    }
    byFamily.get(family)!.push(row.id);
  }
  return [...byFamily]
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
